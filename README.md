# Ficha de Herói — Parte 1

## Kael Veyron, o Tecnomante

Este projeto é uma ficha de personagem em formato de página web, criada para representar o status de um herói de RPG em um universo cyberpunk/fantástico.

Kael Veyron é um **Tecnomante da Ordem Neon**, especialista em combinar tecnologia e magia. Sua missão é recuperar os Núcleos de Éter antes que a Corporação Vanta desperte uma rede proibida.

## Estrutura do projeto

```text
ficha-heroi-parte1/
├── index.html
├── style.css
└── README.md
```

O HTML e o CSS estão separados. O projeto foi estruturado para receber JavaScript posteriormente na Parte 2.

## Seções

1. **Sobre o Herói** — avatar, nome, classe, biografia, origem, alinhamento e experiência.
2. **Atributos & Habilidades** — atributos representados por barras de progresso e habilidades especiais.
3. **Inventário & Conquistas** — itens com raridade, item lendário em destaque e conquistas da guilda.
4. **Contato com a Guilda** — links para GitHub, LinkedIn e Discord.

## Tecnologias utilizadas

- HTML5 semântico
- CSS3
- CSS Grid
- Flexbox
- Media Queries
- Variáveis CSS em `:root`
- Google Fonts: Orbitron e Rajdhani
- Font Awesome

## Decisões de UI/UX

- A interface usa superfícies translúcidas com `backdrop-filter` em pontos de navegação e conteúdo, com fallback para navegadores sem suporte.
- A profundidade vem de perspectiva, camadas e sombras neutras. O contraste continua concentrado no texto e nos indicadores de status; fotos e conteúdo não recebem véus luminosos.
- O layout mantém títulos e conteúdo alinhados à esquerda, com hierarquia assimétrica na apresentação do herói.
- Atributos, itens e conquistas aparecem em superfícies independentes. Não há cards aninhados, efeitos de glow ou ícones em emoji.
- Textos de inventário e conquistas foram reduzidos para destacar nome, raridade e estado do item.
- Links e ação principal incluem estados visíveis de foco e interação. A folha de estilos respeita `prefers-reduced-motion`.

## Responsividade

O layout utiliza três faixas principais:

- **Desktop:** inventário com 3 colunas.
- **Tablet:** inventário e blocos principais com 2 colunas.
- **Celular:** conteúdo reorganizado em 1 coluna.

Também foram adaptados tamanhos de fonte, espaçamentos, navegação e avatar para telas pequenas. Em celulares, a composição permanece alinhada à esquerda e os blocos passam a uma coluna.

## Como executar

Basta abrir o arquivo `index.html` em um navegador.

O projeto utiliza Google Fonts e Font Awesome por CDN, portanto esses recursos dependem de conexão com a internet para carregar corretamente.

## Observação

O personagem, universo, textos e identidade visual foram criados especificamente para este projeto.
