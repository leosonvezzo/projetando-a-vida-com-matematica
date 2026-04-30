// Datas atualizadas dos objetivos:
// 1. Enem/Vestibular - 1º de novembro de 2026
// 2. Terminar a escola - 31 de dezembro de 2026 (final do ano letivo)
// 3. Faculdade de Engenharia Civil na UFPR - 1 de março de 2027
// 4. Competir no Fisiculturismo - 1 de novembro de 2027

function getDataEnem() {
    return new Date(2026, 10, 1, 0, 0, 0); // 1 de novembro de 2026
}

function getDataFinalEscola() {
    return new Date(2026, 11, 31, 23, 59, 59); // 31 de dezembro de 2026
}

function getDataFaculdade() {
    return new Date(2027, 2, 1, 0, 0, 0); // 1 de março de 2027
}

function getDataFisiculturismo() {
    return new Date(2027, 10, 1, 0, 0, 0); // 1 de novembro de 2027
}

const datas = [getDataEnem, getDataFinalEscola, getDataFaculdade, getDataFisiculturismo];

function calcularTempoRestante(dataAlvo) {
    const agora = new Date();
    const diff = dataAlvo - agora;
    
    if (diff <= 0) {
        return { dias: 0, horas: 0, minutos: 0, segundos: 0, concluido: true };
    }
    
    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff % (86400000)) / (3600000));
    const minutos = Math.floor((diff % 3600000) / 60000);
    const segundos = Math.floor((diff % 60000) / 1000);
    
    return { dias, horas, minutos, segundos, concluido: false };
}

function atualizarCronometro(index) {
    const dataAlvo = datas[index]();
    const tempo = calcularTempoRestante(dataAlvo);
    
    const diasElement = document.getElementById(`dias${index}`);
    const horasElement = document.getElementById(`horas${index}`);
    const minutosElement = document.getElementById(`min${index}`);
    const segundosElement = document.getElementById(`seg${index}`);
    
    if (diasElement && horasElement && minutosElement && segundosElement) {
        diasElement.textContent = tempo.dias;
        horasElement.textContent = String(tempo.horas).padStart(2, '0');
        minutosElement.textContent = String(tempo.minutos).padStart(2, '0');
        segundosElement.textContent = String(tempo.segundos).padStart(2, '0');
        
        // Se o objetivo foi concluído, exibir mensagem
        if (tempo.concluido) {
            const abaConteudo = document.querySelectorAll('.aba-conteudo')[index];
            if (abaConteudo && !abaConteudo.querySelector('.mensagem-concluido')) {
                const mensagem = document.createElement('div');
                mensagem.className = 'mensagem-concluido';
                mensagem.style.cssText = 'background: linear-gradient(135deg, #ff0000, #ff6b00); color: white; padding: 10px; border-radius: 10px; margin-top: 20px; font-weight: bold; text-align: center; box-shadow: 0 0 20px rgba(255,0,0,0.5);';
                mensagem.textContent = '🎉 OBJETIVO CONCLUÍDO! 🎉';
                abaConteudo.appendChild(mensagem);
            }
        }
    }
}

// Função para alternar entre as abas
const botoes = document.querySelectorAll('.botao');
const abasConteudo = document.querySelectorAll('.aba-conteudo');

botoes.forEach((botao, index) => {
    botao.addEventListener('click', () => {
        // Remover classe ativo de todos os botões
        botoes.forEach(btn => {
            btn.classList.remove('ativo');
        });
        
        // Adicionar classe ativo ao botão clicado
        botao.classList.add('ativo');
        
        // Esconder todas as abas
        abasConteudo.forEach(aba => {
            aba.classList.remove('ativo');
        });
        
        // Mostrar a aba correspondente
        abasConteudo[index].classList.add('ativo');
    });
});

// Iniciar todos os cronômetros
function iniciarTodosCronometros() {
    for (let i = 0; i < datas.length; i++) {
        atualizarCronometro(i);
        setInterval(() => atualizarCronometro(i), 1000);
    }
}

// Iniciar quando a página carregar
iniciarTodosCronometros();