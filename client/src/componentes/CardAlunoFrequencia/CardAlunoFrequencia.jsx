import React, { useState } from "react";
import '../../style/style.css';
import { useNavigate } from 'react-router-dom';

export default function CardAlunoFrequencia({ id, nome_aluno, idade, telefone, presente, justificativa, onPresenteChange, onJustificativaChange }) {

    const [localPresente, setLocalPresente] = useState(presente);
    const [localJustificativa, setLocalJustificativa] = useState(justificativa);

    const handlePresenteChange = (e) => {
        const newPresente = e.target.value;
        setLocalPresente(newPresente);
        if (onPresenteChange) {
            onPresenteChange(id, newPresente);
        }
    };

    const handleJustificativaChange = (e) => {
        const newJustificativa = e.target.value;
        setLocalJustificativa(newJustificativa);
        if (onJustificativaChange) {
            onJustificativaChange(id, newJustificativa);
        }
    };

    return (
        <div className="containerCardAlunoFrequencia">
            <h1>{nome_aluno}</h1>

            <div className="profissaoDiv">
                <div className="opdiv">

                    <input
                        type="radio"
                        name={`presenca-${id}`}
                        id={`presente`}
                        value="presente"
                        checked={localPresente === 'presente'}
                        onChange={handlePresenteChange}
                    />

                    <label htmlFor={`presente`}>Presente</label>



                </div>

                <div className="opdiv">

                    <input
                        type="radio"
                        name={`presenca-${id}`}
                        id="ausente"
                        value="ausente"
                        checked={localPresente === 'ausente'}
                        onChange={handlePresenteChange}
                    />

                    <label htmlFor={`ausente`}>Ausente</label>



                </div>

                <div className="opdiv">

                    <input
                        type="radio"
                        name={`presenca-${id}`}
                        id="justificada"
                        value="justificada"
                        checked={localPresente === 'justificada'}
                        onChange={handlePresenteChange}
                    />

                    <label htmlFor={`justificada`}>Justificada</label>



                </div>

            </div>
            <div>
                <label>
                    Justificativa:
                    <textarea
                        value={localJustificativa}
                        onChange={handleJustificativaChange}
                        rows="4"  // Ajuste o número de linhas conforme necessário
                        cols="50" // Ajuste a largura conforme necessário
                    />
                </label>
            </div>
        </div>
    );
}
