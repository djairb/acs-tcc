import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


import '../../style/style.css';

import { useForm } from 'react-hook-form';


export default function DialogEditarAlunoArray(props) {


    const { register, handleSubmit, formState: { errors } } = useForm(); 
  

    const onSubmit = async (data) => {

       
        props.editarAlunos(props.id, data);

        handleClose2();

    };

    const handleClose2 = () => {

        props.setNumero(props.numero + 1);  
          
        
               
        
    };

    const deletarAlunoById = () => {

        props.deletarAluno(props.id);

        handleClose2();



    }

    return (
        
        <Dialog open={props.aberto} onClose={handleClose2} aria-labelledby='form-dialog-title'>
            <DialogTitle id="form-dialog-title">Cadastrar Aluno</DialogTitle>
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