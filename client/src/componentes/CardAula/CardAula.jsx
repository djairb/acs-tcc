import React from "react";
import '../../style/style.css';
import { useNavigate } from 'react-router-dom';

export default function CardAula(props) {

    const navigate = useNavigate();

    const handleClickCard = () => {

        //IR PRA ABA DE TURMA
        navigate('/tela-editar-aula', { state: props});
        // passa o objeto pra ela pre-carregar. se tiver id o botao 
    }

    const date = new Date(props.data_aula);

  // Formatando a data para um formato legível
    const formattedDate = date.toLocaleDateString();

    return (

        <>
            <div className="containerCardAula">

                <p>Aula Projeto</p>
                <h1>{props.projeto_nome}</h1>

                <p>Data:</p>
                <h1>{formattedDate}</h1>
                <p>Turma:</p>
                <h1>{props.turma_aula}</h1>
                <p>Turno:</p>
                <h1>{props.turno_aula}</h1>

                <button onClick={handleClickCard}>Ver Aula</button>
                
               

            </div>

        </>


    )




}