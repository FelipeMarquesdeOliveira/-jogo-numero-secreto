// DECLARANDO VARIAVEIS 

let listaDeNumerosSorteados = [];
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// CRIANDO FUNÇÃO PARA MUDAR TEXTO NO HTML

function exibirTExtoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1} );
}

// USANDO FUNÇÃO PARA EXIBIR TEXTO NO HTML

function exibirMensagemInicial(){
    exibirTExtoNaTela(`h1`, `Jogo do número Secreto`);
    exibirTExtoNaTela(`p`, `Escolha um número entre 1 a ${numeroMaximo}`);
}

// CHAMANDO A FUNÇÃO EXIBIR MENSAGEM INICIAL 

exibirMensagemInicial();

// CRIANDO FUNÇÃO DE VERIFICAR O CHUTE

function verificarChute(){
    let chute = document.querySelector(`input`).value;
    if(chute == numeroSecreto){
        exibirTExtoNaTela(`h1`, `Acertou!!`);
        let palavraTentativa = tentativas > 1 ? `tentativas` : `tentativa`;
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTExtoNaTela(`p`, mensagemTentativas);
        document.getElementById(`reiniciar`).removeAttribute(`disabled`);
    }
    else{
        if(chute > numeroSecreto){
            exibirTExtoNaTela(`p`, `O número secreto é menor`);
        }else{
            exibirTExtoNaTela(`p`, `O número secreto é maior`);
        }
        tentativas++;
        limparCampo();
    }
}

// CRIANDO FUNÇÃO PARA CRIAR NUMERO ALEATORIO USANDO RETURN

function gerarNumeroAleatorio() {
    numeroMaximo = 3
    let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    if (quantidadeDeElementosNaLista == numeroMaximo){
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else{
        listaDeNumerosSorteados.push(numeroEscolhido);;
        return numeroEscolhido;
    }
}

// CRIANDO FUNÇÃO PARA LIMPAR O CAMPO DO INPUT

function limparCampo(){
    chute = document.querySelector(`input`);
    chute.value = ``;
}

// CRIANDO FUNÇÃO PARA REINICIAR O JOGO AO CLICK

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById(`reiniciar`).setAttribute(`disabled`, true);
}

