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

    useForm();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleInserirTurma = () => {

        ///http://localhost:3001/edit
        //https://somosconexaosocial.org/appcrud/edit
        // Axios.put("http://localhost:3001/edit", {

        //     //pega os valores que estao setados em editValues - que sao setados quando o cara altera no onchange

        //     //ele cria dinamicamente o objeto no insert, mas aqui, precisa criar um objeto no state e atualizar ele na medida que o dialog muda, e depois, manda pra o banco
        //     id: editValues.id,
        //     nome: editValues.nome,
        //     preco: editValues.preco,
        //     categoria: editValues.categoria

        // });
        // handleClose();
        // document.location.reload();
        console.log("Jesus")

        


    };



    const handleClose = () => {
        props.setOpenDialog(false);
        
    };

    

    const handleChangeValues = value =>{

        console.log("nada");
        
        
        
        
        // setEditValues(prevValues =>({

        //     ...prevValues,
        //     [value.target.id]: value.target.value,
            

            

            
        // }));

    };

    return (


        <Dialog open={props.open} onClose={handleClose} aria-labelledby='form-dialog-title'>
            <DialogTitle id="form-dialog-title">Cadastrar Turma</DialogTitle>
            <DialogContent>

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
                {errors?.projeto?.type === "validate" && (<p className="error-message">Selecione um Projeto</p>)}

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
                {errors?.turno?.type === "validate" && (<p className="error-message">Selecione um Turno</p>)}

            </div>                

            
                
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color='primary'>
                    Salvar
                </Button>
                <Button onClick={handleClose} color='primary'>
                    Excluir
                </Button>
                <Button onClick={handleClose} color='primary'>
                    Cancelar
                </Button>
            </DialogActions>
        </Dialog>

    );
}