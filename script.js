const skatista = document.querySelector('.skatista');
const bloco = document.querySelector('.bloco');
const contadorElement = document.getElementById('contador');
const jogo = document.querySelector('.jogo');

let contador = 0;
let passouBloco = false;
let trocaDeCores = false;

skatista.style.bottom = '-20px';

// Função para gerar uma cor RGB aleatória
const corAleatoria = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Função para alternar a cor do background
const trocarCorFundo = () => {
    if (contador >= 10 && !trocaDeCores) {
        trocaDeCores = true;
        setInterval(() => {
            jogo.style.backgroundColor = corAleatoria();
        }, 1000); // Muda a cor a cada segundo
    }
}

// Função para fazer com que o skatista pule 
const pulo = () => {
    skatista.classList.add('pulo'); // Adicionar a classe do css que contem a animacao para o skatista pular 

    setTimeout(() => {
        skatista.classList.remove('pulo'); // Remover e reiniciar a classe para fazer ele pular novamente, depois de um rapido tempo 
    }, 500);
}

// Função que irá rodar o jogo e verificar se perdeu ou não 
const loop = setInterval(() => {
    const posicaoBloco = bloco.offsetLeft;
    const posicacoSkatista = +window.getComputedStyle(skatista).bottom.replace('px', '');

    console.log(posicacoSkatista);

    if (posicaoBloco <= 160 && posicaoBloco > 0 && posicacoSkatista < 110) {
        bloco.style.animation = 'none';
        bloco.style.left = `${posicaoBloco}px`;

        skatista.style.animation = 'none';
        skatista.style.bottom = `${posicacoSkatista}px`;

        skatista.src = 'assets/game-over.png';
        skatista.style.width = '100px';
        skatista.style.marginLeft = '40px';

        clearInterval(loop); // Parar o loop quando perder
    } else if (posicaoBloco < 0 && !passouBloco) {
        contador++;
        contadorElement.textContent = contador;
        passouBloco = true;
        trocarCorFundo(); // Chamar a função para trocar a cor do fundo
    } else if (posicaoBloco > 160) {
        passouBloco = false;
    }
}, 16);

document.addEventListener('keydown', pulo);
