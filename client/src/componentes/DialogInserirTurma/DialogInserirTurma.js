import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Axios from 'axios';

export default function DialogInserirTurma(props) {

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
            <DialogTitle id="form-dialog-title">Editar</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin='dense'
                    id="nome"
                    label="Nome do Jogo"
                    /// o valor default sempre vai ser props.nome - props.nome foi passado pelo card
                    defaultValue={props.nome}
                    onChange={handleChangeValues}
                    type='text'
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin='dense'
                    id="preco"
                    label="Preço do jogo"
                    defaultValue={props.preco}
                    onChange={handleChangeValues}
                    type='text'
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin='dense'
                    id="categoria"
                    label="Categoria do jogo"
                    defaultValue={props.categoria}
                    onChange={handleChangeValues}
                    type='text'
                    fullWidth
                />
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