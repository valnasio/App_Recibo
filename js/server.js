const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Simulando um "banco de dados" de recibos


// Middleware para analisar corpos de solicitações JSON
app.use(bodyParser.json());

// Rota para receber os dados XML
app.post('/salvar-xml', (req, res) => {
    const xmlData = req.body.xmlData;
    // Aqui você pode fazer o que quiser com o xmlData, como salvar em um arquivo ou banco de dados
    // ...

    // Envie uma resposta simples
    res.send('XML recebido com sucesso!');
});

// Rota para obter dados do recibo com o ID fornecido
app.get('/recibo/:id', (req, res) => {
    const reciboId = req.params.id;

    // Encontre o recibo com o ID correspondente
    const recibo = recibos.find((r) => r.id === reciboId);

    // Verifique se o recibo foi encontrado
    if (recibo) {
        res.json(recibo);
    } else {
        res.status(404).json({ mensagem: 'Recibo não encontrado' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
