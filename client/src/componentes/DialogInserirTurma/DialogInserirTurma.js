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
        reset();
        props.setOpenDialog(false);
        
        
    };

    

    const onSubmit = async (data) => {
        
        console.log(data);

        // try {
        //   const response = await Axios.post("http://localhost:3001/getUserLogin", {
        //     usuario: data.usuario,
        //     senha: data.senha,
        //     tipoUsuario: data.tipoUsuario
        //   });
          
        //   if ((response.data.length)>0) {
        //     toggleUser(response.data[0]);
        //     setLoginError(false);
        //     console.log(user);
        //     {data.tipoUsuario==="educador" ? navigate('/home-educador') : alert("Tela Coord ainda não existe")}
            
           
            
        //     // data ta sendo lido depois que response retorna positivo. então data existe no banco.
        //     // navigate('/pagina-crud', { state: response.data.usuario }); // Exemplo de passagem de dados para a próxima página
        //   } else {
        //     // Login falhou, exibir mensagem de erro
        //     setLoginError(true); // Ativa o estado de erro
        //   }
        // } catch (error) {
        //   console.error('Erro ao tentar fazer login:', error);
        //   alert("Ocorreu um erro ao tentar fazer login. Por favor, tente novamente mais tarde.");
        // }
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