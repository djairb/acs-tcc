import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Axios from 'axios';

import '../../style/style.css';

import { useForm } from 'react-hook-form';


export default function DialogInserirAlunoBanco(props) {


    const { register, handleSubmit, reset, formState: { errors } } = useForm();    



    const handleClose = () => {
        reset(); //vai ter q resetar manualmente o campo de foto
        props.setOpenDialog(false);    
        
        
    };

    //esse dialog é responsavel por gerenciar a lista local // estamos no cadastro, pra depois enviar pro back tanto o objeto turma quanto a lista de alunos

    

    const onSubmit = async (data) => {          

        try {
            await Axios.post("http://localhost:3001/inserirAlunoByIdTurma", {
            nome_aluno: data.nome_aluno,
            telefone: data.telefone,
            idade: data.idade,
            id_turma: props.id_turma
          });

          props.setCount(props.count+1);
          // modifica a variavel de dependencia do effect pra que ele redenrize novavmente a lista de alunos
          
          
        } catch (error) {
          console.error('Erro ao tentar fazer login:', error);
          alert("Ocorreu um erro ao tentar fazer login. Por favor, tente novamente mais tarde.");
        }
        handleClose();
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

                        <label>Telefone:</label>

                        <input
                            type='text'
                            placeholder='Telefone'
                            defaultValue=''
                            className={errors.telefone ? "input-error" : ""}
                            {...register('telefone', {
                            required: "Telefone é obrigatório",
                            pattern: {                
                                value: /^[0-9() -]+$/, // Regex para permitir apenas números, parênteses, hífens e espaços
                                message: "Telefone deve conter apenas números, parênteses, hífens e espaços"
                            }
                            })}
                        />
                        {errors.telefone && <p className="error-message">{errors.telefone.message}</p>}
                        

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