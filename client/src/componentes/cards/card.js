import React from "react";
import './card.css';
import FormDialog from "../dialog/dialogForm";

export default function Card(props) {

    const [open, setOpen] = React.useState(false);

    const handleClickCard = () => {

        //abre o dialog, seta os valores automaticamente
        setOpen(true)
    }


    return (

        <>
            <FormDialog
                open={open}
                setOpen={setOpen}
                nome={props.nome}
                preco={props.preco}
                categoria={props.categoria}
                listCard={props.listCard}
                setListCard={props.setListCard}
                id={props.id}
            />

            <div className="containerCard" onClick={() =>

                handleClickCard()


            }>

                <h1>{props.nome}</h1>
                <h3>{props.id}</h3>

                <div className="containerDetalhes">

                    <p>{props.categoria}</p>

                    <p>•</p>

                    <p>{props.preco}</p>

                </div>

            </div>

        </>


    )




}