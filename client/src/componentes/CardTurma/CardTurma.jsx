import React from "react";
import '../../style/style.css';
import { useNavigate } from 'react-router-dom';

export default function CardTurma(props) {

    const navigate = useNavigate();



    const handleClickCard = () => {

        //abre o dialog, seta os valores automaticamente
        navigate('/tela-editar-turma', { state: props});
        // passa o objeto pra ela pre-carregar. se tiver id o botao 
    }

    


    return (

        <>

            <div className="containerCardTurma" onClick={() =>

                handleClickCard()


            }>
                <p>Nome da Turma:</p>
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