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

                <p>Aula Projeto</p>
                <h1>{props.projeto_nome}</h1>
               

            </div>

        </>


    )




}