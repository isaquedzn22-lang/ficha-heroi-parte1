'use strict';

//comportamento//

const XP_POR_NIVEL = 100;
const XP_MISSAO = 15;
const itens = [
    { nome: 'Núcleo de Éter', tipo: 'artefato', raridade: 'lendario', icone: 'fa-gem', descricao: 'Armazena energia arcana e alimenta tecnologias esquecidas.' },
    { nome: 'Deck Neon', tipo: 'equipamento', raridade: 'raro', icone: 'fa-keyboard', descricao: 'Terminal portátil para invadir redes e analisar sistemas.' },
    { nome: 'Lâmina de Plasma', tipo: 'arma', raridade: 'raro', icone: 'fa-khanda', descricao: 'Lâmina de energia que corta firewalls e armaduras.' },
    { nome: 'Pulso EMP', tipo: 'arma', raridade: 'comum', icone: 'fa-bolt', descricao: 'Granada que desativa drones por alguns segundos.' },
    { nome: 'Poção de Fluxo', tipo: 'pocao', raridade: 'comum', icone: 'fa-flask', descricao: 'Recupera energia mágica em missões prolongadas.' },
    { nome: 'Elixir de Overclock', tipo: 'pocao', raridade: 'raro', icone: 'fa-vial', descricao: 'Eleva velocidade e reflexos por um curto período.' }
];
const ROTULOS_RARIDADE = { lendario: 'LENDÁRIO', raro: 'RARO', comum: 'COMUM' };
const ROTULOS_TIPO = { arma: 'Arma', pocao: 'Poção', equipamento: 'Equipamento', artefato: 'Artefato' };
let estado = { xp: 87, nivel: 30 };
let filtroAtivo = 'todos';

//utilitario//
const $ = (seletor) => document.querySelector(seletor);

function salvar(chave, valor) {
    try { localStorage.setItem(chave, JSON.stringify(valor)); } catch (e) { /* armazenamento indisponível: segue sem persistir */ }
}
function carregar(chave, padrao) {
    try {
        const bruto = localStorage.getItem(chave);
        return bruto === null ? padrao : JSON.parse(bruto);
    } catch (e) { return padrao; }
}

//quando tiver dia aparece bom dia, tiver tarde aparece boa tarde, noite aparece boa noite//
function saudar() {
    const hora = new Date().getHours();
    let periodo;
    if (hora >= 5 && hora < 12) periodo = 'Bom dia';
    else if (hora >= 12 && hora < 18) periodo = 'Boa tarde';
    else periodo = 'Boa noite';
    $('#saudacao').textContent = `${periodo}, viajante. A Ordem Neon aguarda.`;
}

const menu = $('#menu');
const menuToggle = $('#menuToggle');

function alternarMenu(abrir) {
    const aberto = typeof abrir === 'boolean' ? abrir : !menu.classList.contains('aberto');
    menu.classList.toggle('aberto', aberto);
    menuToggle.setAttribute('aria-expanded', String(aberto));
    menuToggle.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    menuToggle.querySelector('i').className = aberto ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
}
menuToggle.addEventListener('click', () => alternarMenu());
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') alternarMenu(false); });

menu.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
        const alvo = document.querySelector(link.getAttribute('href'));
        if (!alvo) return;
        e.preventDefault();
        const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        alvo.scrollIntoView({ behavior: reduzir ? 'auto' : 'smooth', block: 'start' });
        alternarMenu(false);
    });
});

$('#btnHistoria').addEventListener('click', (e) => {
    const aberta = $('#historia').classList.toggle('revelado');
    e.currentTarget.setAttribute('aria-expanded', String(aberta));
    $('#rotuloHistoria').textContent = aberta ? 'Ver menos' : 'Ver história completa';
    e.currentTarget.querySelector('i').className = aberta ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down';
});

// barra de xp//
function atualizarXp() {
    const pct = Math.min(100, (estado.xp / XP_POR_NIVEL) * 100);
    $('#xpBarra').style.width = `${pct}%`;
    $('#xpBarraBox').setAttribute('aria-valuenow', String(Math.round(pct)));
    $('#xpTexto').textContent = `${estado.xp} / ${XP_POR_NIVEL}`;
    $('#xpResumo').textContent = `${estado.xp} / ${XP_POR_NIVEL}`;
    $('#nivel').textContent = `NÍVEL ${estado.nivel}`;
}
function ganharXp() {
    const msg = $('#xpMsg');
    estado.xp += XP_MISSAO;
    if (estado.xp >= XP_POR_NIVEL) {
        estado.xp -= XP_POR_NIVEL;
        estado.nivel += 1;
        msg.textContent = `Nível up! Ultron alcançou o nível ${estado.nivel}.`;
        msg.classList.add('nivel-up');
    } else {
        msg.textContent = `Missão concluída: +${XP_MISSAO} XP.`;
        msg.classList.remove('nivel-up');
    }
    atualizarXp();
    salvar('ficha-estado', estado);
}
$('#btnXp').addEventListener('click', ganharXp);

function criarCard(item) {
    const card = document.createElement('article');
    card.className = `item-card entrando${item.raridade === 'lendario' ? ' destaque' : ''}`;
    card.innerHTML = `
        <span class="raridade ${item.raridade}">${ROTULOS_RARIDADE[item.raridade]} · ${ROTULOS_TIPO[item.tipo].toUpperCase()}</span>
        <div class="item-icone"><i class="fa-solid ${item.icone}"></i></div>
        <h3>${item.nome}</h3>
        <p>${item.descricao}</p>`;
    return card;
}
function renderizarInventario() {
    const lista = $('#listaItens');
    const visiveis = itens.filter((item) => filtroAtivo === 'todos' || item.tipo === filtroAtivo);
    lista.innerHTML = '';
    visiveis.forEach((item) => {
        const card = criarCard(item);
        lista.appendChild(card);
        requestAnimationFrame(() => requestAnimationFrame(() => card.classList.remove('entrando')));
    });
    $('#contador').textContent = `${itens.length} itens conquistados · exibindo ${visiveis.length}`;
}
document.querySelectorAll('.filtro').forEach((botao) => {
    botao.addEventListener('click', () => {
        filtroAtivo = botao.dataset.filtro;
        document.querySelectorAll('.filtro').forEach((b) => {
            const ativo = b === botao;
            b.classList.toggle('ativo', ativo);
            b.setAttribute('aria-pressed', String(ativo));
        });
        renderizarInventario();
    });
});

const btnTema = $('#btnTema');
function aplicarTema(noturno) {
    document.body.classList.toggle('modo-noturno', noturno);
    btnTema.setAttribute('aria-pressed', String(noturno));
    btnTema.querySelector('i').className = noturno ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    btnTema.querySelector('.rotulo-tema').textContent = noturno ? 'Noturno: ligado' : 'Noturno: desligado';
    salvar('ficha-noturno', noturno);
}
btnTema.addEventListener('click', () => aplicarTema(!document.body.classList.contains('modo-noturno')));

// adicionei o formulario//
const form = $('#formGuilda');
const validadores = {
    nome: (v) => (v.trim().length >= 2 ? '' : 'Informe seu nome (mínimo 2 caracteres).'),
    email: (v) => {
        if (!v.trim()) return 'Informe seu e-mail.';
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Formato inválido. Exemplo: nome@dominio.com';
    },
    mensagem: (v) => (v.trim().length >= 10 ? '' : 'Escreva uma mensagem com pelo menos 10 caracteres.')
};
function validarCampo(campo) {
    const erro = validadores[campo.name](campo.value);
    document.getElementById(`erro-${campo.name}`).textContent = erro;
    campo.classList.toggle('invalido', erro !== '');
    campo.setAttribute('aria-invalid', String(erro !== ''));
    return erro === '';
}
const campos = Array.from(form.querySelectorAll('[name]'));
campos.forEach((campo) => {
    campo.addEventListener('blur', () => validarCampo(campo));
    campo.addEventListener('input', () => { if (campo.classList.contains('invalido')) validarCampo(campo); });
});
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const status = $('#formStatus');
    const resultados = campos.map((c) => validarCampo(c)); 
    if (resultados.includes(false)) {
        status.className = 'form-status falha';
        status.textContent = 'Não foi possível enviar: corrija os campos destacados.';
        campos[resultados.indexOf(false)].focus();
        return;
    }
    status.className = 'form-status sucesso';
    status.textContent = `Mensagem enviada! A guilda responderá em breve, ${$('#nome').value.trim()}.`;
    form.reset();
});

estado = carregar('ficha-estado', estado);
saudar();
atualizarXp();
renderizarInventario();
aplicarTema(carregar('ficha-noturno', false));
