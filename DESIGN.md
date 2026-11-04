# DESIGN.md — Guia de Design do ATUE Demo

## 1. Objetivo

Este documento define a identidade visual e os padrões de interface do `atue-apresentation`.

É a referência obrigatória para criação e alteração de telas, componentes e estilos. Complementa o `AGENTS.md` e deve respeitar suas restrições arquiteturais.

**Princípio central:** a ATUE é uma plataforma B2B de conformidade. A interface deve transmitir confiança, maturidade, organização e precisão técnica.

A demonstração deve parecer um produto SaaS real, não um protótipo genérico.

Prioridades:

1. Hierarquia visual.
2. Legibilidade.
3. Consistência entre telas.
4. Clareza dos dados.
5. Fluidez das interações.
6. Responsividade.

Evite elementos decorativos sem função.

## 2. Identidade visual

### 2.1 Direção estética

Adotar uma estética SaaS B2B moderna, com influência de dashboards de segurança, compliance e observabilidade.

Características:

- Interface minimalista e profissional.
- Layout organizado e orientado a dados.
- Contraste bem definido.
- Bordas discretas.
- Espaçamento consistente.
- Elementos gráficos objetivos.
- Animações sutis e funcionais.

A interface não deve parecer um template administrativo genérico.

### 2.2 Paleta de cores

Utilizar azul como cor de identidade da ATUE, com superfícies neutras e cores semânticas para indicadores.

| Papel              | Cor       |
| ------------------ | --------- |
| Marca principal    | `#2563EB` |
| Marca secundária   | `#3B82F6` |
| Fundo escuro       | `#09090B` |
| Superfície escura  | `#18181B` |
| Superfície elevada | `#27272A` |
| Texto principal    | `#FAFAFA` |
| Texto secundário   | `#A1A1AA` |
| Bordas             | `#3F3F46` |
| Sucesso            | `#22C55E` |
| Atenção            | `#EAB308` |
| Crítico            | `#EF4444` |
| Informação         | `#3B82F6` |

A paleta pode ser adaptada aos tokens já existentes no projeto, evitando duplicação de variáveis.

### 2.3 Regras de cores

- Azul representa identidade e ações primárias.
- Verde representa condições satisfatórias.
- Amarelo representa atenção.
- Vermelho representa riscos críticos.
- Cinza representa informações neutras.

Estados nunca devem depender exclusivamente de cores. Sempre utilizar rótulos textuais e, quando pertinente, ícones.

Não utilizar cores aleatórias ou gradientes excessivos.

## 3. Superfícies e componentes

### 3.1 Fundos

Utilizar uma hierarquia clara entre página, cards e elementos elevados.

Referências Tailwind:

| Elemento           | Classes           |
| ------------------ | ----------------- |
| Página             | `bg-zinc-950`     |
| Card               | `bg-zinc-900`     |
| Superfície elevada | `bg-zinc-800`     |
| Borda              | `border-zinc-800` |
| Texto principal    | `text-zinc-100`   |
| Texto secundário   | `text-zinc-400`   |
| Texto auxiliar     | `text-zinc-500`   |

Priorizar consistência. Não misturar superfícies com tons muito próximos sem necessidade.

### 3.2 Cards

Padrão:

`rounded-xl border border-zinc-800 bg-zinc-900 p-6`

Regras:

- Bordas discretas.
- Espaçamento interno consistente.
- Hierarquia clara entre título, descrição e conteúdo.
- Hover sutil em elementos selecionáveis.
- Não utilizar sombras pesadas.
- Evitar cards dentro de cards sem necessidade.

### 3.3 Botões

Ações primárias:

`bg-blue-600 text-white hover:bg-blue-500`

Ações secundárias:

`border border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800`

Regras:

- Altura mínima confortável.
- Estados de hover, focus, active e disabled.
- Transições curtas.
- Ícones Lucide quando agregarem significado.
- Botões de ícone devem possuir nome acessível.
- Toda ação deve ter comportamento funcional.

### 3.4 Bordas e raios

| Elemento              | Raio           |
| --------------------- | -------------- |
| Inputs e botões       | `rounded-lg`   |
| Cards                 | `rounded-xl`   |
| Containers principais | `rounded-2xl`  |
| Badges                | `rounded-full` |

Não utilizar raios excessivamente arredondados em toda a interface.

## 4. Tipografia

Preferir a família tipográfica já configurada no projeto. Caso Geist Variable esteja disponível, utilizá-la como fonte principal.

Padrões:

- Títulos: `font-semibold tracking-tight`.
- Texto principal: `text-sm` ou `text-base`.
- Descrições: `text-sm text-zinc-400`.
- Labels: `text-xs font-medium`.
- Dados numéricos: `font-semibold tabular-nums`.
- Informações técnicas: `font-mono`.

### Escala tipográfica

| Uso              | Classes                              |
| ---------------- | ------------------------------------ |
| Título principal | `text-3xl sm:text-4xl`               |
| Título de seção  | `text-xl sm:text-2xl`                |
| Título de card   | `text-base font-semibold`            |
| Score principal  | `text-4xl sm:text-5xl font-semibold` |
| Corpo            | `text-sm`                            |
| Texto auxiliar   | `text-xs`                            |

Evitar excesso de tamanhos e pesos diferentes na mesma seção.

## 5. Layout e espaçamento

Utilizar a escala padrão de espaçamento do Tailwind, baseada em múltiplos de 4px.

Container principal:

`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8`

Referências:

- Cards: `p-5` ou `p-6`.
- Seções: `space-y-6` ou `space-y-8`.
- Grids: `gap-4` ou `gap-6`.
- Grupos de informações: `gap-2` ou `gap-3`.

### Responsividade

Adotar abordagem mobile-first.

Breakpoints:

- `sm`: 640px.
- `md`: 768px.
- `lg`: 1024px.
- `xl`: 1280px.

Validar:

- 320px.
- 375px.
- 768px.
- 1024px.
- 1440px.

Não permitir rolagem horizontal indesejada.

## 6. Telas da demonstração

### 6.1 Home — Seleção de empresas

Objetivo: apresentar as empresas disponíveis para análise.

Estrutura:

- Identidade visual da ATUE.
- Título e descrição objetivos.
- Três cards de empresas.
- Identificação do segmento de cada empresa.
- Indicador visual de seleção.
- CTA ou interação clara para iniciar a análise.

Os cards devem transmitir que cada empresa representa um cenário diferente de conformidade.

Não solicitar URL, cadastro ou informações adicionais.

### 6.2 Análise — Terminal de execução

Objetivo: transmitir a sensação de um processo técnico acontecendo em tempo real.

O terminal é um dos elementos visuais mais importantes da demonstração.

Características:

- Fundo escuro.
- Tipografia monoespaçada.
- Logs alinhados à esquerda.
- Indicadores de execução.
- Cores semânticas para alertas e sucesso.
- Scroll controlado.
- Animação progressiva dos registros.
- Indicador de progresso geral.

Referências visuais:

| Elemento     | Estilo                         |
| ------------ | ------------------------------ |
| Fundo        | `bg-black`                     |
| Texto padrão | `text-zinc-300`                |
| Sucesso      | `text-green-400`               |
| Alerta       | `text-yellow-400`              |
| Erro crítico | `text-red-400`                 |
| Informação   | `text-blue-400`                |
| Fonte        | `font-mono text-xs sm:text-sm` |

Exemplo:

```text
[14:32:01] [+] Resolvendo DNS...
[14:32:02] [+] Mapeando cabeçalhos de segurança...
[14:32:03] [!] Cookies de terceiros detectados.
[14:32:04] [+] Identificando formulários...
[14:32:05] [+] Consolidando relatório executivo...
```

Regras:

- Não exibir todos os logs simultaneamente.
- Sincronizar progresso e registros.
- Evitar animações excessivamente rápidas.
- Não simular erros críticos sem correspondência nos dados.
- A execução deve permanecer inteiramente local.

O terminal deve parecer uma ferramenta de observabilidade, não uma janela de hacker cinematográfica.

### 6.3 Dashboard — Resultados

Objetivo: apresentar os resultados de maneira executiva e tecnicamente compreensível.

Hierarquia recomendada:

1. Identificação da empresa analisada.
2. Resumo geral da avaliação.
3. Score de conformidade.
4. Indicadores quantitativos.
5. Achados técnicos.
6. Recomendações.
7. CTA para download.

### 6.4 Score de conformidade

O score deve ser um dos elementos de maior destaque visual.

Utilizar gráfico em rosca, com valor central e classificação textual.

Faixas:

| Score        | Cor       | Classificação |
| ------------ | --------- | ------------- |
| Menor que 25 | `#EF4444` | Crítico       |
| 25 a 49      | `#F97316` | Atenção       |
| 50 a 74      | `#EAB308` | Atenção       |
| 75 a 100     | `#22C55E` | Conforme      |

Os limites são inclusivos na faixa superior.

O score deve ser calculado ou recuperado dos mocks. Não gerar valores aleatórios durante a apresentação.

### 6.5 Indicadores

Apresentar indicadores objetivos, como:

- Total de achados.
- Riscos críticos.
- Pontos de atenção.
- Itens em conformidade.

Cada indicador deve possuir:

- Valor numérico.
- Descrição curta.
- Ícone contextual.
- Cor semântica quando aplicável.

Não utilizar gráficos quando um indicador simples comunicar melhor a informação.

### 6.6 Achados técnicos

Os achados devem ser organizados por nível de risco.

Cada item deve apresentar:

- Nome do achado.
- Classificação de risco.
- Descrição técnica.
- Impacto para o negócio.
- Recomendação de adequação.

A linguagem deve permitir que pessoas não técnicas compreendam o impacto.

Evitar blocos extensos de texto e excesso de informações simultâneas.

### 6.7 Recomendações

Apresentar recomendações diretamente relacionadas aos achados.

Utilizar listas organizadas e hierarquia visual clara.

Não apresentar recomendações genéricas ou desconectadas dos resultados simulados.

### 6.8 CTA — Download

A CTA deve possuir destaque visual suficiente para orientar o usuário à próxima ação.

Características:

- Cor de marca.
- Texto objetivo.
- Ícone de download quando pertinente.
- Feedback visual de interação.

O botão deve iniciar diretamente o download do PDF estático definido no `AGENTS.md`.

Não apresentar formulários, modais ou geradores de documentos.

## 7. Animações e interações

Animações devem melhorar a percepção de resposta e continuidade da aplicação.

Permitido:

- Transições de hover.
- Fade-in de elementos.
- Animação de progresso.
- Entrada progressiva de logs.
- Transição entre estados.
- Animação de preenchimento do gráfico.

Regras:

- Preferir duração entre 150ms e 400ms para microinterações.
- Evitar movimentos desnecessários.
- Não bloquear a interação durante animações decorativas.
- Respeitar `prefers-reduced-motion`.
- Evitar efeitos de parallax e animações exageradas.

A animação do terminal pode acompanhar o tempo de execução definido no `AGENTS.md`.

## 8. Ícones e gráficos

### Ícones

Utilizar Lucide React caso já esteja instalado.

Tamanhos:

- `size-4`: ações e elementos compactos.
- `size-5`: listas e indicadores.
- `size-6`: destaques.

Não utilizar emojis como substitutos de ícones na interface principal.

### Gráficos

Priorizar a biblioteca de gráficos já presente no projeto.

Regras:

- Dados tipados.
- Escalas honestas.
- Valores coerentes com os mocks.
- Responsividade.
- Tooltips objetivos.
- Resumo textual complementar.

O gráfico de rosca deve possuir:

- Score central.
- Arco proporcional.
- Cor correspondente à classificação.
- Legenda ou rótulo textual.

Não adicionar bibliotecas de gráficos sem necessidade justificada.

## 9. Acessibilidade

Obrigatório:

- HTML semântico.
- Um único `h1` por tela.
- Hierarquia coerente de títulos.
- Contraste adequado.
- Foco visível.
- Navegação por teclado.
- Labels acessíveis.
- Botões com nomes descritivos.
- Estados identificados por texto e não apenas por cor.
- Elementos decorativos com `aria-hidden="true"`.

Para o terminal:

- Não utilizar anúncios excessivos de leitores de tela.
- Considerar `aria-live="polite"` em atualizações relevantes.
- Não anunciar cada log individualmente em alta frequência.

## 10. Conteúdo e linguagem

Idioma: português brasileiro.

Tom:

- Profissional.
- Direto.
- Técnico quando necessário.
- Executivo nas explicações de negócio.

Evitar:

- Jargões desnecessários.
- Textos excessivamente longos.
- Promessas de conformidade garantida.
- Afirmações de auditoria real.
- Resultados apresentados como dados reais.

A aplicação deve deixar claro que se trata de uma demonstração.

Não utilizar textos genéricos de template SaaS.

## 11. Organização e implementação

Respeitar a estrutura existente do projeto.

Diretrizes:

- Componentes reutilizáveis para padrões recorrentes.
- Separação entre apresentação e dados.
- Mocks centralizados em `src/mocks/`.
- Tipos explícitos para dados.
- Evitar duplicação de estilos.
- Evitar componentes excessivamente grandes.
- Não introduzir dependências sem justificativa.

Não presumir que componentes, bibliotecas ou arquivos do ATUE completo existem nesta demonstração.

Antes de utilizar qualquer componente compartilhado, verificar sua existência no repositório.

## 12. Do / Don't

### Do

- Manter consistência visual entre as três empresas.
- Priorizar legibilidade e hierarquia.
- Utilizar cores semânticas.
- Reutilizar componentes.
- Utilizar dados tipados.
- Construir uma experiência de análise fluida.
- Manter o terminal visualmente convincente.
- Validar responsividade.
- Respeitar acessibilidade.
- Atualizar este documento quando padrões visuais forem modificados.

### Don't

- Não criar interfaces genéricas de dashboard.
- Não utilizar gradientes em excesso.
- Não exagerar nas sombras.
- Não utilizar animações gratuitas.
- Não misturar estilos visuais diferentes.
- Não utilizar cores sem função semântica.
- Não criar funcionalidades fora do escopo.
- Não adicionar dependências apenas por conveniência.
- Não apresentar resultados simulados como análises reais.
- Não criar telas de autenticação ou cadastro.
- Não implementar integrações externas.

## 13. Checklist de validação visual

- [ ] Identidade visual consistente com a ATUE.
- [ ] Paleta de cores aplicada corretamente.
- [ ] Tipografia consistente.
- [ ] Hierarquia visual clara.
- [ ] Cards e componentes seguem os padrões definidos.
- [ ] Home apresenta corretamente as três empresas.
- [ ] Terminal possui logs progressivos e legíveis.
- [ ] Dashboard apresenta os dados da empresa selecionada.
- [ ] Score e indicadores possuem cores e classificações coerentes.
- [ ] Achados possuem hierarquia de risco.
- [ ] CTA de download está visualmente destacada.
- [ ] Layout funciona em dispositivos móveis.
- [ ] Não existe rolagem horizontal indesejada.
- [ ] Foco e navegação por teclado funcionam.
- [ ] Animações respeitam preferência por movimento reduzido.
- [ ] Não existem elementos decorativos sem propósito.

## 14. Governança

1. Este documento deve ser consultado antes de qualquer alteração visual.
2. Novos padrões devem ser documentados aqui.
3. Componentes existentes devem ser reutilizados quando apropriado.
4. Alterações de identidade visual devem manter consistência em todas as telas.
5. O `AGENTS.md` prevalece em decisões arquiteturais e funcionais.
6. O `DESIGN.md` prevalece em decisões visuais e de interação.
7. Em caso de conflito, não implementar silenciosamente: ajustar a documentação antes.

**Objetivo final:** entregar uma demonstração visualmente madura, consistente e convincente, capaz de apresentar a proposta de valor da ATUE sem adicionar complexidade desnecessária ao projeto.
