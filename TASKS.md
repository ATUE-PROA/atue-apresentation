# TASKS — atue-apresentation

Checklist executável da demonstração estática da ATUE para o Demoday.

## T01 — Auditoria do projeto

- [x] Inspecionar estrutura de diretórios e componentes existentes.
- [x] Verificar dependências e scripts disponíveis.
- [x] Identificar funcionalidades já implementadas e pendências.
- [x] Definir a estrutura final de componentes e mocks.

## T02 — Dados simulados

- [x] Criar os mocks das três empresas.
- [x] Definir scores, indicadores e níveis de risco.
- [x] Criar achados técnicos e respectivas explicações de negócio.
- [x] Criar os logs de análise.
- [x] Garantir que cada empresa apresente resultados distintos.

## T03 — Interface

- [x] Implementar a seleção de empresas.
- [x] Desenvolver a tela de carregamento.
- [x] Implementar terminal com logs animados.
- [x] Desenvolver o dashboard de resultados.
- [x] Implementar o gráfico de risco.
- [x] Implementar a seção de recomendações.

## T04 — Download

- [x] Verificar a existência do PDF em `public/`.
- [x] Implementar o download direto.
- [x] Garantir que o arquivo seja acessível pelo caminho definido.

## T05 — Qualidade

- [x] Verificar navegação entre as telas.
- [x] Validar o comportamento das três empresas.
- [x] Corrigir problemas de responsividade.
- [ ] Verificar acessibilidade e estados de interação.
- [x] Identificar e corrigir erros de execução.
- [x] Verificar os scripts de lint, testes e tipagem disponíveis.

## Critérios de conclusão

- [x] As três empresas podem ser selecionadas.
- [x] Cada seleção executa uma análise simulada independente.
- [x] O dashboard apresenta os dados correspondentes à empresa escolhida.
- [x] O gráfico e os indicadores exibem os valores dos mocks.
- [x] O download do PDF funciona pelo caminho definido.
- [x] A aplicação funciona sem backend ou requisições externas.
- [x] As tarefas concluídas foram validadas com `npm run lint` e `npx tsc -b`.

## Validação executada

- `npm run lint` — passou.
- `npx tsc -b` — passou.
- Fluxo completo em Chromium headless: seleção → análise → resultados, sem erros de console.
- Sem rolagem horizontal em 375 px (mobile) e 1280 px (desktop).
- PDF servido em `/atue-compliance-report.pdf` com `Content-Type: application/pdf`.
- Nenhuma chamada `fetch`/`XMLHttpRequest` no código.

## Pendências

- Teste com leitor de tela e revisão manual de foco em todos os controles.
- Deploy na Vercel (depende de acesso ao projeto de hospedagem).
