# Projeto Didático: Servidor de Clubes do Cartola FC

Este projeto foi criado com o objetivo de demonstrar, de forma simples e prática, como um servidor Node.js pode interagir com uma API externa, salvar dados localmente e, ao mesmo tempo, servir uma aplicação web (frontend) que consome esses dados. Além disso, ele inclui uma demonstração didática sobre o **CORS (Cross-Origin Resource Sharing)**, um conceito fundamental de segurança web.

### Funcionalidades do Projeto

* **Backend em Node.js:** Um servidor simples que hospeda arquivos estáticos e um endpoint de API local.
* **Requisição de API Externa:** O servidor se conecta à API do Cartola FC (`https://api.cartola.globo.com/clubes`) para obter a lista de clubes.
* **Armazenamento Local:** Os dados recebidos da API são salvos em um arquivo local (`clubes.json`), evitando requisições repetidas à API externa.
* **Endpoint Local:** O servidor disponibiliza um endpoint (`/api/clubes`) que serve os dados do arquivo local.
* **Frontend com HTML, CSS e JavaScript Puro:** Uma interface simples para listar os clubes, que faz a requisição para o nosso endpoint local.
* **Demonstração de CORS:** O servidor permite que você ative e desative o cabeçalho de CORS para simular o bloqueio de segurança em tempo real.

---

### Estrutura do Projeto
```bash
listar_clubes-cartola-fc/
├── public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── index.html
├── server_local_clubes.js
└── clubes.json (será criado após a primeira execução)
```
---

### Como Rodar o Projeto

#### Pré-requisitos
Certifique-se de ter o **Node.js** instalado em seu computador.

1.  **Clone ou baixe** este repositório.
2.  Abra o terminal na pasta raiz do projeto.
3.  Execute o seguinte comando para iniciar o servidor:

```bash
node server_local_clubes.js
```

Após a primeira execução, o servidor se conectará à API do Cartola e criará o arquivo `clubes.json` na pasta raiz.

Abra seu navegador e acesse: `http://localhost:3000`.

Você verá a página carregada, mas a lista de clubes estará vazia e um erro de CORS aparecerá no console do navegador.
---

### Demonstração de CORS

Este projeto foi configurado para que o CORS seja a sua primeira barreira. Para mostrar aos alunos como um servidor permite o acesso entre domínios diferentes, siga as instruções abaixo.

1.  Abra o arquivo `server_local_clubes.js`.
2.  Encontre a seguinte linha, que está comentada:

```javascript
// res.setHeader('Access-Control-Allow-Origin', '*');
```
3. Descomente a linha:

```javascript
res.setHeader('Access-Control-Allow-Origin', '*');
```

4. Reinicie o servidor no terminal (use `Ctrl + C` e depois `node server_local_clubes.js` novamente).

5. Recarregue a página no seu navegador (`http://localhost:3000`).

Agora, a lista de clubes deverá ser exibida corretamente, pois o servidor está enviando a permissão para que o frontend acesse seus dados.

Essa demonstração simples ajuda a entender por que o CORS é uma medida de segurança importante e como podemos controlá-la no backend.
