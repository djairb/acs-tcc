import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Axios from 'axios';

import '../../style/style.css';

import { useForm } from 'react-hook-form';


export default function DialogInserirTurma(props) {


    const { register, handleSubmit, reset, formState: { errors } } = useForm();    



    const handleClose = () => {
        reset();
        props.setOpenDialog(false);
       
        
        
    };

    

    const onSubmit = async (data) => {  

        try {
            await Axios.post("http://localhost:3001/inserirTurma", {
            nome_turma: data.nome_turma,
            projeto: data.projeto,
            turno: data.turno,
            id_educador: props.id_educador
          });

          props.ativarEffect();
          
          
        } catch (error) {
          console.error('Erro ao tentar fazer login:', error);
          alert("Ocorreu um erro ao tentar fazer login. Por favor, tente novamente mais tarde.");
        }
        handleClose();
      };

    return (


        <Dialog open={props.open} onClose={handleClose} aria-labelledby='form-dialog-title'>
            <DialogTitle id="form-dialog-title">Cadastrar Turma</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='divInputsDialog'>

                        <label>Nome da Turma:</label>

                        <input
                            type='text'
                            placeholder='Nome da turma'
                            className={errors.nome_turma && "input-error"}
                            {...register('nome_turma', { required: true })}      
                        />
                        {errors.nome_turma && <p className="error-message">Nome da turma é obrigatório</p>}

                        <label>Projeto:</label>
                        <select
                            className={errors.projeto && "input-error"}
                            defaultValue="0"
                            {...register("projeto", { validate: (value) => value !== "0" })}
                        >
                            <option value="0">Selecionar Projeto</option>
                            <option value="conectaVidas">Conecta Vidas</option>
                            <option value="passaporteDigital">Passaporte Digital</option>
                            <option value="centroFormacao">Centro de Formação</option>
                            <option value="oportunizarUrbano">Oportunizar Urbano</option>
                            <option value="oportunizarRural">Oportunizar Rural</option>
                            <option value="vamoSimbora">VamoSimbora</option>
                        </select>
                        {errors.projeto && <p className="error-message">Selecione um Projeto</p>}

                        <label>Turno:</label>
                        <select
                            className={errors.turno && "input-error"}
                            defaultValue="0"
                            {...register("turno", { validate: (value) => value !== "0" })}
                        >
                            <option value="0">Selecionar Turno</option>
                            <option value="manha">Manhã</option>
                            <option value="tarde">Tarde</option>
                            <option value="noite">Noite</option>
                        </select>
                        {errors.turno && <p className="error-message">Selecione um Turno</p>}
                    </div>

                    <DialogActions>
                        <div className='divBotoesInputs botoesDialog'>
                            <Button className='botaoInputs' type="submit">Salvar</Button>
                            <Button className='botaoInputs' onClick={handleClose}>Voltar</Button>
                            <Button className='botaoInputs botaoExcluir' type="submit">Excluir</Button>
                        </div>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>

    );
}