# ATUE — Demonstração (atue-apresentation)

Demonstração estática da ATUE para o Demoday. O objetivo é apresentar, sem backend, o fluxo de
análise de conformidade: escolha de uma empresa fictícia, varredura simulada com terminal e
dashboard executivo com score, achados e recomendações.

## Fluxo

1. **Home:** três cards selecionáveis (e-commerce, clínica e agência B2B).
2. **Análise:** terminal escuro com logs progressivos e duração aleatória entre 3 e 7 segundos.
3. **Resultados:** score em rosca, indicadores, achados por nível de risco, impacto de negócio e
   recomendações de adequação.
4. **Download:** CTA que baixa o PDF estático `public/atue-compliance-report.pdf`.

## Stack e restrições

- React 19, TypeScript, Vite e Tailwind CSS v4.
- Sem backend, banco de dados ou requisições externas.
- Todos os dados ficam em `src/mocks/companies.ts`.
- Nenhum site real é acessado e nenhuma IA real é executada.
- Os resultados são fictícios e não representam auditoria ou garantia de conformidade.

## Estrutura

```text
src/
  components/
    analysis/    tela de análise e terminal
    companies/   seleção e cards das empresas
    layout/      shell com cabeçalho e rodapé
    results/     score, indicadores, achados, recomendações e CTA
    ui/          botão, badge e ícones inline
  lib/           utilitários de score, risco e classes
  mocks/         empresas, achados e logs
  types/         contratos tipados
public/
  atue-compliance-report.pdf
```

## Scripts

```bash
npm install
npm run dev      # servidor local
npm run lint     # ESLint
npx tsc -b       # verificação de tipos
npm run build    # build de produção (usado no deploy)
```

## Download do relatório

O CTA aponta para `/atue-compliance-report.pdf`. O arquivo é estático, contém aviso de demonstração
e não é gerado dinamicamente.

## Limitações

- A análise, o score e os achados são simulados e vivem apenas nos mocks.
- Não há persistência: recarregar a página volta à seleção de empresas.
- O fluxo completo foi validado em Chromium headless (375 px e 1280 px), sem erros de console nem
  rolagem horizontal.
- O teste com leitor de tela permanece pendente.
- O deploy na Vercel depende de acesso ao projeto de hospedagem.
