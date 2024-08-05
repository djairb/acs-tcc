import React, { useEffect, useState } from "react";
import '../../style/style.css';
import { useNavigate } from 'react-router-dom';

import DialogEditarAlunoBanco from "../dialogEditarAlunoBanco/DialogEditarAlunoBanco";

export default function CardEditarAluno(props) {

    const [aberto, setAberto] = useState(false);

    const [numero, setNumero] = useState(1);


    useEffect(() => {

        setAberto(false);
        props.setCount(props.count+1)

        //BUG ACONTECENDO NO DIALOG
        
        
  
    }, [numero]);

    

    const handleClickCard = () => {

        //abre o dialog, seta os valores automaticamente
        setAberto(true);

      
    }
    

    

    return (

        <>

            <div className="containerCardAluno" onClick={() =>

                handleClickCard()


            }>

                <DialogEditarAlunoBanco

                    aberto={aberto}
                    setAberto={setAberto}

                    id_aluno={props.id_aluno}
                    nome_aluno={props.nome_aluno}
                    idade={props.idade}
                    telefone={props.telefone}
                    
                    setNumero={setNumero}
                    numero={numero}
                    
                          
                
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