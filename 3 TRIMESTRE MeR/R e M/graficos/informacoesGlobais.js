const url = 'https://raw.githubusercontent.com/guilhermeonrails/api/main/dados-globais.json';

async function vizualizarInformacoesGlobais() {
    try {
        const res = await fetch(url);

        // Verifica se a resposta foi bem-sucedida
        if (!res.ok) {
            throw new Error(`Erro ao buscar dados: ${res.statusText}`);
        }

        const dados = await res.json();
        const pessoasConectadas = (dados.total_pessoas_conectadas / 1e9).toFixed(2);
        const pessoasNoMundo = (dados.total_pessoas_mundo / 1e9).toFixed(2);
        const horas = Math.floor(dados.tempo_medio);
        const minutos = Math.round((dados.tempo_medio - horas) * 60);
        const porcentagemConectada = ((pessoasConectadas / pessoasNoMundo) * 100).toFixed(2);

        // Criação do parágrafo com as informações formatadas
        const paragrafo = document.createElement('p');
        paragrafo.classList.add('graficos-container__texto');
        paragrafo.innerHTML = `
            Você sabia que o mundo tem <span>${pessoasNoMundo} bilhões</span> de pessoas e que aproximadamente 
            <span>${pessoasConectadas} bilhões</span> estão conectadas em alguma rede social e passam em média 
            <span>${horas} horas</span> e <span>${minutos} minutos</span> conectadas.<br>
            Isso significa que aproximadamente <span>${porcentagemConectada}%</span> das pessoas estão conectadas em alguma rede social.
        `;

        // Verifica se o container existe antes de adicionar o parágrafo
        const container = document.getElementById('graficos-container');
        if (container) {
            container.appendChild(paragrafo);
        } else {
            console.error('Elemento #graficos-container não encontrado.');
        }
    } catch (error) {
        console.error('Erro ao visualizar informações globais:', error);
    }
}

// Executa a função para visualizar as informações globais
vizualizarInformacoesGlobais();
