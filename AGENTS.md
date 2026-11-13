# AGENTS.md — atue-apresentation

## 1. Objetivo

`atue-apresentation` é uma demonstração mobile com **duas telas do produto ATUE**:

1. **Painel / Visão geral** — cópia fiel do dashboard do `atue-web`.
2. **Central de Documentos** — cópia fiel da tela de documentos do `atue-web`.

Além delas existem apenas:

- uma tela de **seleção de empresa**, para escolher o cenário mockado;
- uma tela de **carregamento**, que simula a preparação do dashboard.

Não há login, cadastro, backend, banco, IA real, análise intermediária ou navegação completa do produto.

## 2. Leitura obrigatória

1. Leia este arquivo.
2. Leia `DESIGN.md` antes de qualquer trabalho visual.
3. Compare as duas telas com `atue-web/src/pages/Dashboard.tsx` e `atue-web/src/pages/Documents.tsx`.
4. Inspecione `package.json`, `src/` e `TASKS.md`.

`DESIGN.md` é a identidade compartilhada. Este `AGENTS.md` prevalece em decisões técnicas e funcionais.

## 3. Fluxo

```text
Seleção de empresa
  → Carregamento mockado (1,6s)
    → Painel (Visão geral) ⇄ Central de Documentos
```

- A seleção não mostra scores.
- “Trocar empresa” no header/footer volta à seleção.
- O header alterna entre Painel e Documentos.
- Perfil, Configurações, Planos, Enviar documentos, Contato, Privacidade e Termos não existem nesta demo; aparecem desabilitados.
- O PDF demonstrativo fica na aba “Central de downloads”.

## 4. Mobile-first

- Desenhe primeiro para 320–430px.
- Valide 320, 360, 375, 390, 768, 1024 e 1440px.
- Sem rolagem horizontal.
- Alvos de toque com pelo menos 44px.
- As duas telas copiam a estrutura do web, inclusive cards, header e footer; em mobile, o header reduz labels e oculta itens não essenciais.
- Não criar um terceiro fluxo de produto.

## 5. Stack

- React 19 + TypeScript + Vite 8.
- Tailwind CSS v4, tokens em `src/index.css`.
- SPA sem router; estado em `src/App.tsx`.
- Sem Lucide/Recharts/Radix: ícones SVG inline, score em SVG nativo e accordion local.
- Fontes locais Geist e Fraunces.
- Logo oficial em `public/brand/`.
- Sem test runner.
- Tema claro.

Scripts:

```bash
npm run dev
npm run lint
npx tsc -b
npm run preview
```

Não execute `npm run build` como rotina de validação.

## 6. Estrutura

```text
public/
  brand/atue-logo-light.svg
  brand/atue-logo-dark.svg
  atue-compliance-report.pdf
src/
  App.tsx                         seleção → carregamento → app
  index.css
  content/
    diagnostics.ts                copy do dashboard
    documents.ts                  copy da Central de Documentos
  components/
    selection/                    escolha de empresa
    loading/                       carregamento mockado
    layout/                        shell, header e footer
    dashboard/                     visão geral, score, prioridades, achados e formulário
    documents/                     anexo, exemplos, análise simulada e downloads
    ui/                            badge, botão, card, alerta, tipografia e ícones
  lib/                            score, severidade, data e classes
  mocks/companies.ts              quatro cenários
  types/                          contratos
```

## 7. Mocks

| Empresa | Segmento | Score |
| --- | --- | --- |
| Demonstração ATUE | Ambiente de demonstração | 72 |
| Loja Verde Naturals | E-commerce | 24 |
| Clínica Bem Estar | Clínica médica | 41 |
| Agência Órbita | Agência B2B | 68 |

- Cada empresa tem resumo, site, data de análise e achados próprios.
- O carregamento usa a empresa escolhida.
- O formulário do dashboard atualiza URL e data na simulação.

## 8. Tela 1 — Painel

Deve reproduzir o dashboard do web:

1. Badge “Demonstração”, H1 “Visão geral” e descrição.
2. CTA “Atualizar diagnóstico”.
3. Situação, site analisado e última análise.
4. Card “Índice de conformidade” com score, nível, ressalva e dimensões.
5. Card “Comece por aqui” com as três prioridades.
6. Card “Todas as pendências” com resumo por severidade e accordion.
7. Formulário “Atualizar diagnóstico”.
8. Nota de rodapé.

O formulário simula o envio e atualiza a URL/data exibidas. Não acessa nenhum site.

## 9. Tela 2 — Central de Documentos

Deve reproduzir a tela do web:

- Cabeçalho “Diagnóstico, análise e downloads” + H1 “Central de Documentos”.
- Abas “Analisar documento” e “Central de downloads”.
- Anexo local com validação de tipo/tamanho, sem leitura ou upload do conteúdo.
- Seleção de documento fictício.
- Botão “Simular análise”, com loading e feedback.
- Aviso de simulação local.
- Lista “Documentos de exemplo” interativa.
- Aba de downloads com o modelo único em PDF.
- Link “Precisa enviar vários documentos?” apenas informativo.

Regras:

- Anexar arquivo usa somente nome, tipo e tamanho.
- Nenhum conteúdo é lido, enviado ou processado.
- “Simular análise” é local e determinístico.
- O PDF é único e genérico.

## 10. Carregamento

- Mostrado após a seleção, antes do app.
- Duração de 1,6s.
- Logo, empresa, etapa atual, percentual e barra de progresso.
- Texto deixa claro que são dados simulados.
- Não simular rede real.
- Deve limpar timers ao desmontar.

## 11. Convenções

- Componentes em PascalCase; arquivos em kebab-case.
- Tipos explícitos; nada de `any`.
- Copy centralizada em `src/content/`.
- Dados em `src/mocks/`; lógica em `src/lib/`.
- Ícones SVG inline, `aria-hidden` quando decorativos.
- Siga a seção 20 do `DESIGN.md` fora das telas copiadas; nas telas do produto, preserve a fidelidade ao web.

## 12. Restrições

1. Zero backend, APIs, banco, autenticação ou cadastro.
2. Zero requisições externas.
3. Mocks determinísticos.
4. PDF estático e genérico.
5. Sem gerador de PDF.
6. Sem login, planos, perfil, configurações ou envio completo.
7. Sem novas dependências sem justificativa.
8. Sem router.
9. Sem tema escuro toggle.
10. Acessibilidade: HTML semântico, um `h1` por tela, foco visível, labels, abas acessíveis, `aria-expanded`, `prefers-reduced-motion`.
11. Honestidade: dados fictícios, sem auditoria real.
12. Preservar os quatro cenários, as duas telas, o carregamento e o PDF.

## 13. Validação

```bash
npm run lint
npx tsc -b
```

Manual:

- Escolher cada empresa e ver o carregamento e o dashboard correspondente.
- Alternar Painel ⇄ Documentos.
- Testar “Trocar empresa”.
- Testar accordion, filtros e formulário do dashboard.
- Testar anexo inválido, exemplo, simulação e feedback na Central.
- Testar a aba de downloads e o PDF.
- Testar 320, 360, 375, 390, 768, 1024 e 1440px.
- Testar teclado, foco e reduced motion.
- Console sem erros e sem requisições externas.

## 14. Preservação

- As duas telas e o fluxo seleção → carregamento → app.
- A fidelidade visual ao dashboard e à Central de Documentos do web.
- O header com Painel/Documentos e o footer.
- A seleção sem scores antecipados.
- O PDF como modelo único.
- Os avisos de demonstração.
- A experiência mobile-first.

## 15. Critérios de conclusão

- A seleção abre com a demonstração padrão e os três cenários de empresa.
- O carregamento aparece e conclui.
- O dashboard e a Central abrem com dados mockados.
- A navegação entre as duas telas funciona.
- Accordion, formulário, anexo e simulação funcionam.
- O PDF é acessível como modelo genérico.
- Sem login, backend ou requisições.
- Mobile-first sem overflow.
- `npm run lint` e `npx tsc -b` passam.
