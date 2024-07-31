import React from "react";
import '../../style/style.css';
import { useNavigate } from 'react-router-dom';

export default function CardAluno(props) {

    const navigate = useNavigate();

    const handleClickCard = () => {

        //abre o dialog, seta os valores automaticamente
        navigate('/tela-detalhe-turma', { state: { turma: props } });

      
    }   


    return (

        <>

            <div className="containerCardTurma" onClick={() =>

                handleClickCard()


            }>

                <h1>{props.nome_aluno}</h1>                

               

            </div>

        </>


    )




}