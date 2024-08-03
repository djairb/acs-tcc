import React, { useEffect, useState } from "react";
import '../../style/style.css';
import { useNavigate } from 'react-router-dom';
import DialogEditarAlunoArray from "../dialogEditarAlunoArray/DialogEditarAlunoArray";

export default function CardAluno(props) {

    const [aberto, setAberto] = useState(false);

    const [numero, setNumero] = useState(1);


    useEffect(() => {

        setAberto(false);

        //BUG ACONTECENDO NO DIALOG
        
        
  
    }, [numero]);

    const navigate = useNavigate();

    const handleClickCard = () => {

        //abre o dialog, seta os valores automaticamente
        setAberto(true);

      
    }
    

    

    return (

        <>

            <div className="containerCardAluno" onClick={() =>

                handleClickCard()


            }>

                <DialogEditarAlunoArray

                    aberto={aberto}
                    setAberto={setAberto}

                    id={props.id}
                    nome_aluno={props.nome_aluno}
                    idade={props.idade}
                    telefone={props.telefone}
                    editarAlunos={props.editarAlunos}
                    setNumero={setNumero}
                    numero={numero}
                    deletarAluno={props.deletarAluno}
                          
                
                />

                <h1>{props.nome_aluno}</h1>

                <div>

                    <p>Idade: {props.idade}</p>
                    <p>•</p>
                    <p>Telefone: {props.telefone}</p>                    
                    
                </div>

                {console.log(aberto)}                

               

            </div>

        </>


    )




}