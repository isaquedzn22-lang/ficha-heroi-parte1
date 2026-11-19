# Ficha de Herói — Parte 2 (JavaScript)

## Ultron, o Revolucionário
Ficha de personagem em formato de página web: Ultron é um **Revolucionário da Ordem Neon**, que combina tecnologia e magia para recuperar os Núcleos de Éter antes que a Corporação Vanta Black desperte a rede proibida.

## Estrutura
```text
ficha-heroi-parte2/
├── index.html
├── style.css
├── script.js
└── README.md
```
Como executar: abrir `index.html` no navegador (Google Fonts e Font Awesome via CDN exigem internet).

## Funcionalidades de JavaScript
- **Menu hambúrguer** (telas ≤ 620px): classe `.aberto` alternada; ícone muda de ☰ para ✕; fecha com `Esc` e ao clicar em um link.
- **Inventário dinâmico**: array de 6 objetos (nome, tipo, raridade, descrição), cards gerados com `forEach` + `createElement`; **filtros por tipo** com botão ativo destacado.
- **Barra de XP**: botão "Completar missão" soma 15 XP e atualiza a largura da barra; ao atingir 100 XP exibe "Nível up!" (condicional) e sobe o nível.
- **Ver história completa / Ver menos**: alternância com operador ternário e classe `.revelado`.
- **Formulário da guilda**: valida nome, e-mail (formato) e mensagem com `preventDefault()`; erros por campo, mensagem de sucesso/falha na tela (sem `alert()`).
- **Extras**: contador de itens, modo noturno (classe no `<body>`), rolagem suave entre seções e saudação por horário.
- **Pesquisa complementar**: persistência com `localStorage` (XP, nível e modo noturno sobrevivem ao recarregar a página).

## Decisões de UI/UX
**Parte 1 (interface estática)**
- Hierarquia: nome e avatar em destaque, atributos e ações em seguida; contraste claro entre texto e fundo escuro.
- Consistência: cards, barras e bordas seguem o mesmo padrão visual e as mesmas variáveis em `:root`.
- Responsividade: inventário em 3, 2 e 1 colunas conforme a largura.

**Parte 2 (interação)**
- *Visibilidade do estado*: o menu troca ☰/✕ e usa `aria-expanded`; o filtro ativo fica destacado; o modo noturno mostra "ligado/desligado".
- *Feedback imediato*: cada missão mostra mensagem na hora e a barra anima; o envio do formulário exibe sucesso ou falha.
- *Prevenção de erros*: campos obrigatórios marcados com *, validação ao sair do campo e mensagens que dizem como corrigir; nunca falha em silêncio.
- *Controle do usuário*: menu, história e filtros podem ser fechados/desfeitos sem recarregar a página.
- *Consistência*: estados novos reutilizam as cores e transições da Parte 1; alvos de toque ≥ 44px.
