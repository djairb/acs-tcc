const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

const db = mysql.createPool({

    host:"localhost",
    user:"root",
    password:"Karolinne102",
    database:"bancotcc",
});

app.use(cors());
app.use(express.json());

app.post("/register", (req, res)=>{

    const {nome} = req.body;
    const {preco} = req.body;
    const {categoria} = req.body;

    let SQL = 'insert into games (nome, preco, categoria) values (?,?,?)';

    db.query(SQL, [nome, preco, categoria],(err, result)=>{
        console.log(err);
    });

    

});

app.get("/getCards", (req, res) =>{

    let SQL= "SELECT * FROM games";

    db.query(SQL, (err, result)=>{
        if (err) console.log(err);
        else res.send(result)
    });


});

// crtrl + ;

app.get("/", (req, res) => {
    res.send("olá, Djair")
});

app.put("/edit", (req, res) =>{

    const {id} = req.body;
    const {nome} = req.body;
    const {preco} = req.body;
    const {categoria} = req.body;
 
    let SQL = "UPDATE games SET nome = ?, preco = ?, categoria = ? WHERE id = ?";

    db.query(SQL, [nome, preco, categoria, id], (err, result) =>{

        if(err) console.log(err);
        else console.log(result);


    })



})

app.delete("/delete/:id", (req, res) => {

    const {id} = req.params;

    let SQL  = "delete from games where id = ?";
    db.query(SQL, [id], (err, result) =>{

        if(err) console.log(err);
        else res.send(result);


    });



});

// app.get("/getUser", (req, res) =>{

//     let usuario = req.query.usuario ?? '';
//     let senha = req.query.senha ?? '';

//     let SQL= "SELECT * FROM usuarios WHERE usuario = ? and senha = ?";

//     db.query(SQL, [usuario, senha], (err, result) =>{

//         if (err) console.log(err);
//         else res.send(result);
//         //envia o numero da lista da chamada
//     })

// });



// app.get("/getUser", (req, res) => {

//     let usuario = req.query.usuario ?? '';
//     let senha = req.query.senha ?? '';

// //     Ao chamar db.query(SQL, [usuario, senha], ...), o array [usuario, senha] contém os valores que serão substituídos nos placeholders ? na consulta SQL.
// // O banco de dados tratará esses valores como dados, não como parte do comando SQL, o que elimina a possibilidade de um ataque de injeção SQL. Isso ocorre porque os parâmetros são tratados como dados literalmente e não como parte da estrutura do SQL.
    

//     // Consulta SQL parametrizada
//     let SQL = "SELECT * FROM usuarios WHERE usuario = ? and senha = ?";
    
//     // Executando a consulta com parâmetros seguros
//     db.query(SQL, [usuario, senha], (err, result) => {
        
//         if (err) {
//             console.log(err);
//             res.status(500).send("Erro ao consultar banco de dados");
//         } else {
            
//             res.send(result);
//         }
//     });
// });

app.post("/getUserLogin", (req, res) => {    

    let { usuario, senha, tipoUsuario } = req.body;

    let SQL;
    if(tipoUsuario==="coordenador"){
        SQL = "SELECT * FROM Coordenadores WHERE usuario = ? and senha = ?";
    }else{

        SQL = "SELECT * FROM Educadores WHERE usuario = ? and senha = ?";

    }
 
    // Executando a consulta com parâmetros seguros
    db.query(SQL, [usuario, senha], (err, result) => {
        
        if (err) {
            console.log(err);
            res.status(500).send("Erro ao consultar banco de dados");
        } else {
            
            res.send(result);
            
        }
    });
});


app.post("/inserirTurma", (req, res) => {    

    let { nome_turma, projeto, turno, id_educador } = req.body;


    let SQL = 'insert into Turmas (nome_turma, turno, projeto, id_educador) values (?,?,?,?)';
 
    // Executando a consulta com parâmetros seguros
    db.query(SQL, [nome_turma, turno, projeto, id_educador], (err, result) => {
        
        if (err) {
            console.log(err);
            res.status(500).send("Erro ao consultar banco de dados");
        } else {
            
            res.send(result);
            
        }
    });
});


app.get("/getTurmas", (req, res) =>{

    let SQL= "SELECT * FROM turmas";

    db.query(SQL, (err, result)=>{

        if (err) {
            console.log(err);
            res.status(500).send("Erro ao consultar banco de dados");
        } else {
            
            res.send(result);
            
        }
    });

});









// Supondo que você tenha um pool de conexões ou objeto de conexão definido como 'db'



// app.get("/", (req, res)=>{

//     let SQL = 'insert into games (nome, preco, categoria) values ("God of War", "120", "Romantico")';

//     db.query(SQL, (err, result)=>{
//         console.log(err)
//     })



// })

app.listen(3001, ()=>{
    console.log("rodando servidor");
});

