import React, { useState } from "react";
import '../../style/style.css';

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
                        id={`presenca-presente-${id}`}
                        value="presente"
                        checked={localPresente === 'presente'}
                        onChange={handlePresenteChange}
                    />
                    <label htmlFor={`presenca-presente-${id}`}>Presente</label>
                </div>

                <div className="opdiv">
                    <input
                        type="radio"
                        name={`presenca-${id}`}
                        id={`presenca-ausente-${id}`}
                        value="ausente"
                        checked={localPresente === 'ausente'}
                        onChange={handlePresenteChange}
                    />
                    <label htmlFor={`presenca-ausente-${id}`}>Ausente</label>
                </div>

                <div className="opdiv">
                    <input
                        type="radio"
                        name={`presenca-${id}`}
                        id={`presenca-justificada-${id}`}
                        value="justificada"
                        checked={localPresente === 'justificada'}
                        onChange={handlePresenteChange}
                    />
                    <label htmlFor={`presenca-justificada-${id}`}>Justificada</label>
                </div>
            </div>

            {localPresente === 'justificada' && (
                <textarea
                    value={localJustificativa}
                    placeholder='Adicionar justificativa'
                    onChange={handleJustificativaChange}
                    rows="4"
                    cols="50"
                />
            )}
        </div>
    );
}
