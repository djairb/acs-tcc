import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Axios from 'axios';

export default function FormDialog(props) {

    const [editValues, setEditValues] = useState(

        ///essa é a tela que é carregada quando o dialog é invocado
        ///toda vez que ele abre, esses valores sao setados
        ///os valores de id e de default values vem do props - toda vez q ele é invocado
        
        
        {       

            id: props.id,
            nome: props.nome,
            preco: props.preco,
            categoria: props.categoria

        

    }
    
    );

    const handleEditGame = () => {

        ///http://localhost:3001/edit
        //https://somosconexaosocial.org/appcrud/edit
        Axios.put("http://localhost:3001/edit", {

            //pega os valores que estao setados em editValues - que sao setados quando o cara altera no onchange

            //ele cria dinamicamente o objeto no insert, mas aqui, precisa criar um objeto no state e atualizar ele na medida que o dialog muda, e depois, manda pra o banco
            id: editValues.id,
            nome: editValues.nome,
            preco: editValues.preco,
            categoria: editValues.categoria

        });
        handleClose();
        document.location.reload();

        


    };

    const handleDeleteGame = () =>{
        ///http://localhost:3001/delete/${editValues.id}
        //https://somosconexaosocial.org/appcrud/delete/${editValues.id}
        Axios.delete(`http://localhost:3001/delete/${editValues.id}`);
        handleClose();
        document.location.reload();


    }

    const handleClickOpen = () => {

        props.setOpen(true);
    };

    const handleClose = () => {
        props.setOpen(false);
        
    };

    

    const handleChangeValues = value =>{
        
        
        
        
        setEditValues(prevValues =>({

            ...prevValues,
            [value.target.id]: value.target.value,
            

            

            
        }));

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
                <Button onClick={handleEditGame} color='primary'>
                    Salvar
                </Button>
                <Button onClick={handleDeleteGame} color='primary'>
                    Excluir
                </Button>
                <Button onClick={handleClose} color='primary'>
                    Cancelar
                </Button>
            </DialogActions>
        </Dialog>

    );
}