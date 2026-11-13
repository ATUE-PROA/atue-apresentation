# ATUE — Demonstração mobile

Demonstração estática com duas telas do produto ATUE Web, dados mockados e sem login ou backend.

## Fluxo

1. **Seleção de empresa:** quatro cenários fictícios, sem scores antecipados.
2. **Carregamento:** tela simulada de 1,6s com logo, empresa, etapa e progresso.
3. **Painel:** cópia do dashboard do `atue-web`, com score, prioridades, pendências e formulário.
4. **Central de Documentos:** cópia da tela de documentos, com anexo local, exemplos, análise simulada e downloads.

O header alterna entre Painel e Documentos. Perfil, Configurações, Planos e demais áreas aparecem desabilitados porque não fazem parte desta demonstração.

## Mocks

- Demonstração ATUE — ambiente de demonstração — score 72 (padrão).
- Loja Verde Naturals — E-commerce — score 24.
- Clínica Bem Estar — Clínica médica — score 41.
- Agência Órbita — Agência B2B — score 68.

## Stack e restrições

- React 19, TypeScript, Vite e Tailwind CSS v4.
- Fontes locais Geist e Fraunces; ícones SVG inline e score em SVG.
- Sem backend, banco, autenticação ou requisições externas.
- Sem router: `src/App.tsx` controla seleção, carregamento e telas.
- Tema claro.
- O header/footer copiam o produto, mas só Painel e Documentos são funcionais.

## Estrutura

```text
src/
  App.tsx
  index.css
  content/        copy do dashboard e da Central de Documentos
  components/
    selection/    escolha de empresa
    loading/      carregamento mockado
    layout/       shell, header e footer
    dashboard/    painel, score, prioridades, pendências e formulário
    documents/    anexo, exemplos, análise e downloads
    ui/           badge, botão, card, alerta e ícones
  lib/            score, severidade, data e classes
  mocks/          empresas e achados
  types/          contratos
public/
  brand/          logos ATUE
  atue-compliance-report.pdf
```

## Scripts

```bash
npm install
npm run dev
npm run lint
npx tsc -b
npm run build
```

## Relatório

O PDF fica na aba **Central de downloads**. É um modelo único e genérico, sem dados da empresa, score ou data.

## Limitações

- Dados fictícios; não representam auditoria ou garantia de conformidade.
- O formulário e a análise de documentos são simulações locais.
- Anexos usam apenas nome, tipo e tamanho; nenhum conteúdo é lido ou enviado.
- Sem persistência: recarregar volta à seleção.
- Tema escuro fora do escopo.
