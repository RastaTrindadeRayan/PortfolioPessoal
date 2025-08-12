// ========== ELEMENTOS DO DOM ========== //
const elementos = {
    html: document.documentElement,
    fotoPerfilImg: document.querySelector("#foto-perfil"),
    botaoTema: document.getElementById("botao-tema")
};

// ========== ALTERNÂNCIA DE TEMA ========== //
function alternarTema() {
    elementos.html.classList.toggle("Light");
    
    // Alternar imagem do perfil baseada no tema
    if (elementos.html.classList.contains("Light")) {
        elementos.fotoPerfilImg.setAttribute("src", "./assets/euterno.jpeg");
        elementos.fotoPerfilImg.setAttribute("alt", "Foto de Rayan Trindade com um leve sorriso de camiseta listrada em azul e branco.");
        
        // Salvar preferência do usuário
        localStorage.setItem('tema', 'claro');
    } else {
        elementos.fotoPerfilImg.setAttribute("src", "./assets/avatarblack.png");
        elementos.fotoPerfilImg.setAttribute("alt", "Rayan com uma touca colorida com as cores da bandeira da Etiópia e um óculos escuro.");
        
        // Salvar preferência do usuário
        localStorage.setItem('tema', 'escuro');
    }
}

// ========== CARREGAR PREFERÊNCIA DE TEMA ========== //
function carregarTemaPreferido() {
    const temaPreferido = localStorage.getItem('tema');
    
    if (temaPreferido === 'claro') {
        elementos.html.classList.add("Light");
        elementos.fotoPerfilImg.setAttribute("src", "./assets/euterno.jpeg");
        elementos.fotoPerfilImg.setAttribute("alt", "Foto de Rayan Trindade com um leve sorriso de camiseta listrada em azul e branco.");
    } else if (temaPreferido === 'escuro') {
        elementos.html.classList.remove("Light");
        elementos.fotoPerfilImg.setAttribute("src", "./assets/avatarblack.png");
        elementos.fotoPerfilImg.setAttribute("alt", "Rayan com uma touca colorida com as cores da bandeira da Etiópia e um óculos escuro.");
    }
    // Se não há preferência salva, mantém o tema padrão (Light) definido no HTML
}

// ========== ANIMAÇÃO DE ENTRADA ========== //
function animarEntrada() {
    const container = document.getElementById('container');
    container.style.opacity = '0';
    container.style.transform = 'translateY(20px)';
    
    // Animar entrada após carregamento
    setTimeout(() => {
        container.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    }, 100);
}

// ========== TRATAMENTO DE ERROS ========== //
function tratarErros() {
    // Verificar se elementos essenciais existem
    if (!elementos.botaoTema) {
        console.warn('Botão de tema não encontrado');
        return false;
    }
    
    if (!elementos.fotoPerfilImg) {
        console.warn('Imagem do perfil não encontrada');
        return false;
    }
    
    return true;
}

// ========== INICIALIZAÇÃO ========== //
function inicializar() {
    // Verificar se elementos existem antes de adicionar eventos
    if (!tratarErros()) {
        return;
    }
    
    // Carregar tema preferido do usuário
    carregarTemaPreferido();
    
    // Adicionar event listener para alternância de tema
    elementos.botaoTema.addEventListener("click", alternarTema);
    
    // Adicionar animação de entrada
    animarEntrada();
    
    // Adicionar suporte a teclado para acessibilidade
    elementos.botaoTema.addEventListener("keydown", (evento) => {
        if (evento.key === "Enter" || evento.key === " ") {
            evento.preventDefault();
            alternarTema();
        }
    });
    
    console.log('Site inicializado com sucesso!');
}

// ========== EXECUÇÃO APÓS CARREGAMENTO ========== //
// Aguardar carregamento completo do DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializar);
} else {
    // DOM já carregado
    inicializar();
}

