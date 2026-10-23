# Nexus — SaaS Landing Page

Landing page responsiva para uma plataforma SaaS fictícia de gestão de projetos, tarefas e indicadores. Projeto demonstrativo de portfólio em HTML, CSS e JavaScript.

## Como visualizar

- **Para abrir direto no navegador:** abra `index-standalone.html`. Esse arquivo tem CSS e JavaScript incorporados e não depende de arquivos locais separados.
- **Para editar/desenvolver:** abra `index.html` junto com `style.css` e `script.js`, mantendo os três arquivos na mesma pasta. Recomenda-se a extensão Live Server no VS Code.

## Funcionalidades

- Layout responsivo para desktop, tablet e celular.
- Navegação sticky com menu móvel.
- Hero com mockup de dashboard em HTML/CSS.
- Seções de recursos, fluxo de trabalho, indicadores, planos, FAQ e chamada final.
- Alternância visual entre preços mensais e anuais.
- Modal demonstrativo com validação local do formulário.
- Animações respeitando `prefers-reduced-motion`.

## Tecnologias

- HTML5 semântico
- CSS3 (Grid, Flexbox, variáveis e media queries)
- JavaScript vanilla

## Nota da demonstração

O Nexus é um conceito fictício para apresentação de interface. Não existe backend conectado: cadastro, preços, métricas e integrações são demonstrativos. Nenhum dado do formulário é enviado ou armazenado, e nenhum pagamento é processado.

## Publicação no GitHub Pages

1. Envie `index.html`, `style.css`, `script.js` e este README para a raiz do repositório.
2. Abra **Settings → Pages**.
3. Selecione a branch principal e a pasta `/(root)`.
4. Salve e aguarde o GitHub Pages publicar a página.

O GitHub Pages usará `index.html`, que carrega `style.css` e `script.js` da mesma pasta. `index-standalone.html` é uma alternativa autônoma para pré-visualização local.
