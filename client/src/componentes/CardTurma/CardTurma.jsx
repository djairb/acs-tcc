import React from "react";
import '../../style/style.css';
import FormDialog from "../dialog/dialogForm";

export default function CardTurma(props) {

    const [open, setOpen] = React.useState(false);

    const handleClickCard = () => {

        //abre o dialog, seta os valores automaticamente
        setOpen(true)
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