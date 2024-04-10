// DECLARANDO VARIAVEIS 

// Array para armazenar os números já sorteados
let listaDeNumerosSorteados = [];
// Variável para armazenar o número secreto gerado aleatoriamente
let numeroSecreto = gerarNumeroAleatorio();
// Variável para contar o número de tentativas do jogador
let tentativas = 1;

// CRIANDO FUNÇÃO PARA MUDAR TEXTO NO HTML

function exibirTExtoNaTela(tag, texto){
    // Seleciona o elemento HTML com a tag especificada
    let campo = document.querySelector(tag);
    // Define o texto do elemento selecionado
    campo.innerHTML = texto;
    // Usa a biblioteca responsiveVoice para falar o texto em português brasileiro
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1} );
}

// USANDO FUNÇÃO PARA EXIBIR TEXTO NO HTML

function exibirMensagemInicial(){
    // Exibe o título do jogo
    exibirTExtoNaTela(`h1`, `Jogo do número Secreto`);
    // Exibe instruções para o jogador
    exibirTExtoNaTela(`p`, `Escolha um número entre 1 a ${numeroMaximo}`);
}

// CHAMANDO A FUNÇÃO EXIBIR MENSAGEM INICIAL 

exibirMensagemInicial();

// CRIANDO FUNÇÃO DE VERIFICAR O CHUTE

function verificarChute(){
    // Obtém o valor inserido pelo jogador
    let chute = document.querySelector(`input`).value;
    // Verifica se o chute do jogador é igual ao número secreto
    if(chute == numeroSecreto){
        // Se acertou, exibe mensagem de acerto e o número de tentativas
        exibirTExtoNaTela(`h1`, `Acertou!!`);
        let palavraTentativa = tentativas > 1 ? `tentativas` : `tentativa`;
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTExtoNaTela(`p`, mensagemTentativas);
        // Habilita o botão de reiniciar o jogo
        document.getElementById(`reiniciar`).removeAttribute(`disabled`);
    }
    else{
        // Se errou, indica se o número secreto é maior ou menor e incrementa o número de tentativas
        if(chute > numeroSecreto){
            exibirTExtoNaTela(`p`, `O número secreto é menor`);
        }else{
            exibirTExtoNaTela(`p`, `O número secreto é maior`);
        }
        tentativas++;
        // Limpa o campo de entrada para o próximo chute
        limparCampo();
    }
}

// CRIANDO FUNÇÃO PARA GERAR NÚMERO ALEATÓRIO

function gerarNumeroAleatorio() {
    // Define o valor máximo para o número aleatório
    numeroMaximo = 100
    // Gera um número aleatório entre 1 e o número máximo
    let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1);
    // Verifica se o número já foi sorteado antes
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    if (quantidadeDeElementosNaLista == numeroMaximo){
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        // Se o número já foi sorteado, chama a função recursivamente para gerar outro número
        return gerarNumeroAleatorio();
    }else{
        // Se o número ainda não foi sorteado, adiciona à lista de números sorteados e retorna
        listaDeNumerosSorteados.push(numeroEscolhido);;
        return numeroEscolhido;
    }
}

// CRIANDO FUNÇÃO PARA LIMPAR O CAMPO DO INPUT

function limparCampo(){
    // Limpa o campo de entrada
    chute = document.querySelector(`input`);
    chute.value = ``;
}

// CRIANDO FUNÇÃO PARA REINICIAR O JOGO AO CLICAR NO BOTÃO

function reiniciarJogo(){
    // Gera um novo número secreto
    numeroSecreto = gerarNumeroAleatorio();
    // Limpa o campo de entrada
    limparCampo();
    // Reinicia o contador de tentativas
    tentativas = 1;
    // Exibe a mensagem inicial do jogo
    exibirMensagemInicial();
    // Desabilita o botão de reiniciar
    document.getElementById(`reiniciar`).setAttribute(`disabled`, true);
}
