import express from 'express';

const host = '0.0.0.0';
const porta = 3000;

const app = express();

let listaClientes = [];

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('<h1>Bem-vindo ao Sistema de Cadastro de Clientes</h1><a href="/cliente">Cadastrar cliente</a>');
});

app.get('/cliente', (req, res) => {
    res.sendFile(new URL('./index.html', import.meta.url).pathname);
});


app.post('/cliente', (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const telefone = req.body.telefone;

    listaClientes.push({ nome, email, telefone });

    res.redirect('/listaClientes');
});

app.get('/listaClientes', (req, res) => {

    let tabela = `
    <html>
    <head>
        <title>Lista de Clientes</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body>
    <div class="container mt-5">
    <h2>Clientes cadastrados</h2>
    <table class="table table-striped">
    <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>Email</th>
        <th>Telefone</th>
    </tr>
    `;

    for (let i = 0; i < listaClientes.length; i++) {
        tabela += `
        <tr>
            <td>${i + 1}</td>
            <td>${listaClientes[i].nome}</td>
            <td>${listaClientes[i].email}</td>
            <td>${listaClientes[i].telefone}</td>
        </tr>`;
    }

    tabela += `
    </table>
    <a href="/cliente" class="btn btn-primary">Cadastrar mais</a>
    </div>
    </body>
    </html>`;

    res.send(tabela);
});

app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
});