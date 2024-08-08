import React from "react";
import '../../style/style.css';
import { useNavigate } from 'react-router-dom';

export default function CardAula(props) {

    const navigate = useNavigate();

    const handleClickCard = () => {

        //IR PRA ABA DE TURMA
        navigate('/tela-editar-turma', { state: props});
        // passa o objeto pra ela pre-carregar. se tiver id o botao 
    }


   

    return (

        <>

            <div className="containerCardAula">

                <p>Nome da Turma:</p>
                <h1>{props.nome_turma}</h1>
               

            </div>

        </>


    )




}