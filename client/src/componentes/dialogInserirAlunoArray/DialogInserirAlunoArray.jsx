import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Axios from 'axios';

import '../../style/style.css';

import { useForm } from 'react-hook-form';


export default function DialogInserirAlunoArray(props) {


    const { register, handleSubmit, reset, formState: { errors } } = useForm();    



    const handleClose = () => {
        reset(); //vai ter q resetar manualmente o campo de foto
        props.setOpenDialog(false);    
        
        
    };

    //esse dialog é responsavel por gerenciar a lista local // estamos no cadastro, pra depois enviar pro back tanto o objeto turma quanto a lista de alunos

    

    const onSubmit = async (data) => {

        data.id = props.localIndex; //modificando o objeto data pra inserir campo id

        props.setLocalIndex(data.id+1);
        //setando o index de turma

        props.adicionarAluno(data);

        handleClose();

        

        // try {
        //     await Axios.post("http://localhost:3001/inserirTurma", {
        //     nome_turma: data.nome_turma,
        //     projeto: data.projeto,
        //     turno: data.turno,
        //     id_educador: props.id_educador
        //   });

        //   props.ativarEffect();
          
          
        // } catch (error) {
        //   console.error('Erro ao tentar fazer login:', error);
        //   alert("Ocorreu um erro ao tentar fazer login. Por favor, tente novamente mais tarde.");
        // }
        // handleClose();
    };

    return (
        
        <Dialog open={props.open} onClose={handleClose} aria-labelledby='form-dialog-title'>
            <DialogTitle id="form-dialog-title">Cadastrar Aluno</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='divInputsDialog'>
                        <label>Nome do Aluno:</label>
                        <input
                            type='text'
                            placeholder='Nome do Aluno'
                            className={errors.nome_aluno && "input-error"}
                            {...register('nome_aluno', { required: true })}      
                        />
                        {errors.nome_aluno && <p className="error-message">Nome do aluno é obrigatório</p>}

                        <label>Contato:</label>

                        <input
                            type='text'
                            placeholder='Contato'
                            defaultValue=''
                            className={errors.contato ? "input-error" : ""}
                            {...register('contato', {
                            required: "Contato é obrigatório",
                            pattern: {                
                                value: /^[0-9() -]+$/, // Regex para permitir apenas números, parênteses, hífens e espaços
                                message: "Contato deve conter apenas números, parênteses, hífens e espaços"
                            }
                            })}
                        />
                        {errors.contato && <p className="error-message">{errors.contato.message}</p>}
                        

                        <label>Idade do Aluno:</label>
                        <input
                            type='text'
                            placeholder='Idade'
                            className={errors.idade ? "input-error" : ""}
                            {...register('idade', {
                            required: "Idade do Aluno é obrigatória",
                            pattern: {                
                                value: /^[0-9]+$/, // Regex para permitir apenas números, parênteses, hífens e espaços
                                message: "Idade deve conter apenas números"
                            }
                            })}
                        />
                        {errors.idade && <p className="error-message">{errors.idade.message}</p>}
                    </div>

                    <DialogActions>
                        <div className='divBotoesInputs botoesDialog'>
                            <Button className='botaoInputs' type="submit">Salvar</Button>
                            <Button className='botaoInputs' onClick={handleClose}>Voltar</Button>
                            {/* <Button className='botaoInputs botaoExcluir' type="submit">Cancelar</Button> */}
                        </div>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>

    );
}