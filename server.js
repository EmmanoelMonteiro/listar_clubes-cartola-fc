const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Define o caminho do arquivo solicitado.
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

    console.log(filePath);

    // Determina o tipo de conteúdo com base na extensão do arquivo.
    let contentType = 'text/html';
    const ext = path.extname(filePath);
    if (ext === '.css') {
        contentType = 'text/css';
    } else if (ext === '.js') {
        contentType = 'text/javascript';
    }

    // Lê e serve o arquivo.
    fs.readFile(filePath, (err, content) => {
        if (err) {
            // Se o arquivo não for encontrado, envia um erro 404.
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Arquivo nao encontrado.');
        } else {
            // Se o arquivo for encontrado, envia-o com o tipo de conteúdo correto.
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));