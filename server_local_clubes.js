const http = require('http');
const fs = require('fs');
const path = require('path');
const https = require('https');

// Função para buscar e salvar os clubes da API externa
const fetchAndSaveClubes = async () => {

    try{

        const response = await fetch('https://api.cartola.globo.com/clubes');

        if (!response.ok) {
            throw new Error('Erro ao buscar os dados da API');
        }

        const clubes = await response.json();

        console.log("Clubes =========== "+ clubes);

        fs.writeFile('clubes.json', JSON.stringify(clubes, null, 2), (err) => {
            if (err) {
                console.error('Erro ao escrever no arquivo clubes.json:', err);
                return;
            }
            console.log('Dados dos clubes salvos com sucesso em clubes.json!');
        });

    } catch (error) {
        console.error('Falha na requisição:', error);
        loadingMessage.textContent = 'Não foi possível carregar os clubes. Tente novamente mais tarde.';
        loadingMessage.style.color = 'red';
    }
}

// Executa a função uma vez ao iniciar o servidor
fetchAndSaveClubes();

// Cria o servidor HTTP
const server = http.createServer((req, res) => {
    // ---- Endpoint para servir os clubes (aqui vamos simular o CORS) ----
    if (req.url === '/api/clubes') {
        fs.readFile('clubes.json', 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Arquivo de clubes não encontrado ou com erro.' }));
                return;
            }
            
            // AQUI O PONTO CHAVE DO CORS
            // DESCOMENTE a linha abaixo para permitir o acesso (desbloquear)
            // res.setHeader('Access-Control-Allow-Origin', '*');
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
        });
        return;
    }

    // ---- Servir arquivos estáticos (HTML, CSS, JS) ----
    const filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
    const ext = path.extname(filePath);
    let contentType = 'text/html';
    
    if (ext === '.css') {
        contentType = 'text/css';
    } else if (ext === '.js') {
        contentType = 'text/javascript';
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Arquivo nao encontrado.');
            } else {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Erro interno do servidor.');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));