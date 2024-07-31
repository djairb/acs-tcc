import React from "react";
import '../../style/style.css';
import { useNavigate } from 'react-router-dom';

export default function CardTurma(props) {

    const navigate = useNavigate();



    const handleClickCard = () => {

        //abre o dialog, seta os valores automaticamente
        navigate('/tela-detalhe-turma', { state: { turma: props } });
        
        // passa o objeto pra ela pre-carregar. se tiver id o botao salvar dela vai chamar atualizar. se não, vai cadastrar a turma jogando os dados e a lista de alunos pro banco (não aceita no front cadastro sem turma -- não existe turma sem aluno)
    }

    


    return (

        <>

            <div className="containerCardTurma" onClick={() =>

                handleClickCard()


            }>

                <h1>{props.nome_turma}</h1>

                <div>
                    
                    <h3>Projeto: {props.projeto}</h3>

                    <h3>•</h3>

                    <h3>Turno: {props.turno}</h3>




                </div>
                

               

            </div>

        </>


    )




}