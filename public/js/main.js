document.addEventListener('DOMContentLoaded', () => {
    const clubesContainer = document.querySelector('.clubes-container');
    const loadingMessage = document.getElementById('loading-message');

    const fetchClubes = async () => {
        try {
            //const response = await fetch('https://api.cartola.globo.com/clubes');
            const response = await fetch('http://localhost:3000/api/clubes');
            
            if (!response.ok) {
                throw new Error('Erro ao buscar os dados da API');
            }

            const clubes = await response.json();

            console.log(clubes);
            
            loadingMessage.remove();

            // O retorno da API é um objeto com chaves numéricas.
            // Precisamos iterar sobre os valores desse objeto.
            for (const key in clubes) {
                if (clubes.hasOwnProperty(key)) {
                    const clube = clubes[key];
                    const clubeCard = document.createElement('div');
                    clubeCard.classList.add('clube-card');

                    clubeCard.innerHTML = `
                        <img src="${clube.escudos['60x60']}" alt="Escudo do ${clube.nome}">
                        <h3>${clube.nome_fantasia}</h3>
                    `;
                    
                    clubesContainer.appendChild(clubeCard);
                }
            }

        } catch (error) {
            console.error('Falha na requisição:', error);
            loadingMessage.textContent = 'Não foi possível carregar os clubes. Tente novamente mais tarde.';
            loadingMessage.style.color = 'red';
        }
    };

    fetchClubes();
});