import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


import '../../style/style.css';

import { useForm } from 'react-hook-form';

import Axios from 'axios';


export default function DialogEditarAlunoBanco(props) {


    const { register, handleSubmit, reset, formState: { errors } } = useForm();  
  

    const onSubmit = async (data) => {

                
        try {
            await Axios.put("http://localhost:3001/editarAlunoById", {
            nome_aluno: data.nome_aluno,
            idade: data.idade,
            telefone: data.telefone,
            id_aluno: props.id_aluno
            
            });
            
            handleClose2();
            
            
        } catch (error) {
            console.error('Erro ao tentar fazer login:', error);
            alert("Ocorreu um erro ao tentar inserir as turmas. Por favor, tente novamente mais tarde.");
            handleClose2();
        }
        
    };

    const handleClose2 = () => {
        
        props.setNumero(props.numero + 1);
        
          
        
               
        
    };

    const deletarAlunoById = () => {

        Axios.delete(`http://localhost:3001/deleteAlunoById/${props.id_aluno}`);
        handleClose2();

        



    }

    return (
        
        <Dialog open={props.aberto} onClose={handleClose2} aria-labelledby='form-dialog-title'>
            <DialogTitle id="form-dialog-title">Editar Aluno</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='divInputsDialog'>
                        <label>Nome do Aluno:</label>
                        <input
                            type='text'
                            placeholder='Nome do Aluno'
                            defaultValue={props.nome_aluno}
                            className={errors.nome_aluno && "input-error"}
                            {...register('nome_aluno', { required: true })}      
                        />
                        {errors.nome_aluno && <p className="error-message">Nome do aluno é obrigatório</p>}

                        <label>Telefone:</label>

                        <input
                            type='text'
                            placeholder='Telefone'
                            defaultValue={props.telefone}
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
                            defaultValue={props.idade}
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
                            <Button className='botaoInputs botaoExcluir' onClick={deletarAlunoById}>Deletar</Button>
                            {/* <Button className='botaoInputs botaoExcluir' type="submit">Cancelar</Button> */}
                        </div>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>

    );
}