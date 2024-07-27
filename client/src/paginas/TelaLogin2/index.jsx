import React from 'react';
import { useForm } from 'react-hook-form';
import './style.css'; // Arquivo de estilo CSS para estilização

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Aqui você pode enviar os dados para o backend ou fazer outra operação
  };

  return (
    <main className='mainLogin'>

        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <h2>Login</h2>

            <div className="radio-group">
                <label>
                    <input type="radio" {...register('tipoUsuario', { required: true })} value="professor" />
                    Coordenador
                </label>
                <label>
                    <input type="radio" {...register('tipoUsuario', { required: true })} value="aluno" />
                    Educador
                </label>
                {errors.tipoUsuario && <p className="error-message">Selecione uma opção (Professor/Aluno).</p>}
            </div>

            <div className="form-control">
                <label>Usuário:</label>
                <input
                type="text"
                {...register('usuario', {
                    required: true,
                    pattern: /^[a-zA-Z0-9]+$/,
                })}
                />
                {errors.usuario && errors.usuario.type === 'required' && (
                <p className="error-message">Usuário é obrigatório.</p>
                )}
                {errors.usuario && errors.usuario.type === 'pattern' && (
                <p className="error-message">Usuário deve conter apenas letras e números.</p>
                )}
            </div>

            <div className="form-control">
                <label>Senha:</label>
                <input
                type="password"
                {...register('senha', { required: true })}
                />
                {errors.senha && <p className="error-message">Senha é obrigatória.</p>}
            </div>

            <button type="submit">Logar</button>
        </form>



    </main>
    
  );
};

export default LoginForm;