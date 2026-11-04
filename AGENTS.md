# AGENTS.md — atue-demo

## 1. Objetivo

Desenvolver uma demonstração estática da ATUE para o Demoday. O foco é apresentar uma experiência visual convincente, simulando o fluxo de análise de conformidade e geração de documentos.

**O projeto não possui backend, banco de dados ou processamento real de IA.** Toda a experiência deve funcionar localmente com dados simulados.

## 2. Stack

- React 19
- Tailwind CSS v4
- Vite
- SPA estática
- Deploy: Vercel

Utilize TypeScript caso já esteja configurado no projeto. Preserve as dependências e convenções existentes.

## 3. Regras obrigatórias

1. **Zero backend:** não implemente servidores, APIs ou bancos de dados.
2. **Zero requisições externas:** não conecte com `atue-core-api`, `atue-crawler-service` ou `atue-ai-service`.
3. **Mocks centralizados:** scores, empresas, achados, logs e respostas simuladas devem ficar em `src/mocks/`.
4. **Sem dados inventados em tempo real:** resultados devem ser previamente definidos nos mocks.
5. **PDF estático:** o download deve utilizar `/atue-compliance-report.pdf`, armazenado em `public/`.
6. **Sem funcionalidades desnecessárias:** não implemente autenticação, cadastro, formulários adicionais ou funcionalidades fora do escopo da demonstração.
7. **Experiência responsiva:** todas as telas devem funcionar em desktop e dispositivos móveis.
8. **Código organizado:** evite componentes excessivamente grandes, duplicação e lógica de negócio dentro da apresentação.

## 4. Fluxo da aplicação

### 4.1. Home — Seleção de empresa

Apresentar três cards selecionáveis:

- **Empresa A:** E-commerce.
- **Empresa B:** Clínica.
- **Empresa C:** Agência de marketing.

Cada empresa deve possuir dados, resultados e identidade visual próprios.

Não solicitar URL ou qualquer informação do usuário.

### 4.2. Análise — Loading simulado

Ao selecionar uma empresa:

- Exibir uma tela de análise por um período aleatório entre 3 e 7 segundos.
- Apresentar um terminal escuro com logs técnicos animados.
- Atualizar o progresso visual conforme os logs são exibidos.
- Evitar que os logs apareçam todos de uma vez.

Exemplos de logs:

- `[+] Resolvendo DNS...`
- `[+] Mapeando cabeçalhos de segurança...`
- `[!] Cookies de terceiros detectados.`
- `[+] Identificando formulários...`
- `[+] Consultando motor de conformidade...`
- `[+] Consolidando relatório executivo...`

Toda a execução é simulada. Não realizar varreduras ou requisições reais.

### 4.3. Dashboard — Resultados

Após a análise, apresentar:

- Score de risco em gráfico de rosca.
- Indicadores resumidos da empresa.
- Lista de achados técnicos.
- Classificação por nível de risco.
- Explicações dos achados em linguagem de negócios.
- Recomendações de adequação.

Os resultados devem variar conforme a empresa selecionada e ser carregados exclusivamente dos mocks.

### 4.4. Conversão — Download

Adicionar uma CTA destacada ao final dos resultados.

Exemplos:

- Gerar minutas de adequação.
- Baixar relatório de conformidade.
- Baixar política de privacidade.

O botão deve iniciar diretamente o download de `public/atue-compliance-report.pdf`.

Não abrir outra tela, gerar documentos dinamicamente ou solicitar informações adicionais.

## 5. Tasks — Execução obrigatória

Antes de implementar, analise o repositório e transforme as atividades abaixo em um checklist executável no arquivo `TASKS.md`.

O checklist deve refletir o estado real do projeto. Adicione tarefas identificadas durante a análise e não marque atividades como concluídas sem validação.

### T01 — Auditoria do projeto

- [ ] Inspecionar estrutura de diretórios e componentes existentes.
- [ ] Verificar dependências e scripts disponíveis.
- [ ] Identificar funcionalidades já implementadas e pendências.
- [ ] Definir a estrutura final de componentes e mocks.

### T02 — Dados simulados

- [ ] Criar os mocks das três empresas.
- [ ] Definir scores, indicadores e níveis de risco.
- [ ] Criar achados técnicos e respectivas explicações de negócio.
- [ ] Criar os logs de análise.
- [ ] Garantir que cada empresa apresente resultados distintos.

### T03 — Interface

- [ ] Implementar a seleção de empresas.
- [ ] Desenvolver a tela de carregamento.
- [ ] Implementar terminal com logs animados.
- [ ] Desenvolver o dashboard de resultados.
- [ ] Implementar o gráfico de risco.
- [ ] Implementar a seção de recomendações.

### T04 — Download

- [ ] Verificar a existência do PDF em `public/`.
- [ ] Implementar o download direto.
- [ ] Garantir que o arquivo seja acessível pelo caminho definido.

### T05 — Qualidade

- [ ] Verificar navegação entre as telas.
- [ ] Validar o comportamento das três empresas.
- [ ] Corrigir problemas de responsividade.
- [ ] Verificar acessibilidade e estados de interação.
- [ ] Identificar e corrigir erros de execução.
- [ ] Verificar os scripts de lint, testes e tipagem disponíveis.

## 6. Processo de trabalho do agente

1. Leia este arquivo antes de qualquer alteração.
2. Analise o código existente antes de criar ou modificar arquivos.
3. Crie ou atualize `TASKS.md` com tarefas, prioridades e critérios de conclusão.
4. Implemente as tarefas; não se limite a apresentar um plano.
5. Atualize o checklist conforme cada tarefa for concluída e validada.
6. Preserve funcionalidades existentes que estejam dentro do escopo.
7. Não instale dependências sem necessidade justificada.
8. Não execute `npm build` ou `npm run build`. Consulte os scripts disponíveis e utilize as verificações apropriadas.
9. Ao finalizar, informe o que foi implementado, quais arquivos foram alterados, quais verificações foram executadas e o que permaneceu pendente.

## 7. Critérios de conclusão

O trabalho só será considerado concluído quando:

- As três empresas puderem ser selecionadas.
- Cada seleção executar uma análise simulada independente.
- O dashboard apresentar os dados correspondentes à empresa escolhida.
- O gráfico e os indicadores exibirem os valores dos mocks.
- O download do PDF funcionar.
- A aplicação funcionar sem backend ou requisições externas.
- As tarefas concluídas estiverem validadas no `TASKS.md`.

**Prioridade máxima:** fidelidade visual, fluidez da demonstração e estabilidade. Não adicionar complexidade técnica que não contribua diretamente para esses objetivos.
