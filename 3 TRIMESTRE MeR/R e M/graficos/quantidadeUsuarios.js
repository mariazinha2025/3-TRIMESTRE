import { getCSS, tickConfig } from "./common.js";

async function quantidadeUsuariosPorRede() {
    const url = 'https://raw.githubusercontent.com/guilhermeonrails/api/main/numero-usuarios.json';

    try {
        const res = await fetch(url);

        // Verifica se a resposta foi bem-sucedida
        if (!res.ok) {
            throw new Error(`Erro ao buscar dados: ${res.statusText}`);
        }

        const dados = await res.json();
        const nomeDasRedes = Object.keys(dados);
        const quantidadeDeUsuarios = Object.values(dados);

        const data = [
            {
                x: nomeDasRedes,
                y: quantidadeDeUsuarios,
                type: 'bar',
                marker: {
                    color: getCSS('--primary-color')
                }
            }
        ];

        const layout = {
            plot_bgcolor: getCSS('--bg-color'),
            paper_bgcolor: getCSS('--bg-color'),
            title: {
                text: 'Redes sociais com mais usuários',
                x: 0,
                font: {
                    color: getCSS('--primary-color'),
                    size: 30,
                    family: getCSS('--font')
                }
            },
            xaxis: {
                tickfont: tickConfig,
                title: {
                    text: 'Nome das redes',
                    font: {
                        color: getCSS('--secondary-color')
                    }
                }
            },
            yaxis: {
                tickfont: tickConfig,
                title: {
                    text: 'Bilhões de usuários ativos',
                    font: {
                        color: getCSS('--secondary-color')
                    }
                }
            }
        };

        // Verifica se o container de gráficos existe
        const container = document.getElementById('graficos-container');
        if (!container) {
            console.error('Elemento #graficos-container não encontrado.');
            return;
        }

        // Cria o elemento do gráfico e adiciona ao container
        const grafico = document.createElement('div');
        grafico.className = 'grafico';
        container.appendChild(grafico);

        // Renderiza o gráfico usando Plotly
        Plotly.newPlot(grafico, data, layout);

    } catch (error) {
        console.error('Erro ao carregar os dados de usuários por rede:', error);
    }
}

// Executa a função para exibir a quantidade de usuários por rede
quantidadeUsuariosPorRede();
