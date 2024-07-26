let alunos = [];

export const adicionarAluno = (aluno) =>{

    alunos.push(aluno);


}

export const getalunos = () =>{
    return alunos;
}

export const removerAlunoPorNome = (nome) => {
    // Encontra o índice do aluno com o nome fornecido
    const index = alunos.findIndex(a => a.nome === nome);
    
    // Verifica se o aluno foi encontrado
    if (index !== -1) {
        // Remove o aluno da lista
        alunos.splice(index, 1);
    } else {
        console.log(`Aluno com o nome "${nome}" não encontrado.`);
    }
};

export const removerAlunoPorId = (id) => {
    // Encontra o índice do aluno com o ID fornecido
    const index = alunos.findIndex(a => a.id === id);
    
    // Verifica se o aluno foi encontrado
    if (index !== -1) {
        // Remove o aluno da lista
        alunos.splice(index, 1);
    } else {
        console.log(`Aluno com o ID "${id}" não encontrado.`);
    }
};