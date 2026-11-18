# ATUE — Demonstração mobile

Demonstração estática com duas telas do produto ATUE Web, dados mockados e sem login ou backend.

## Fluxo

1. **Seleção de empresa:** quatro cenários fictícios, sem scores antecipados.
2. **Carregamento:** tela de 1,2s a 8s com logo, empresa, etapa e progresso; enquanto isso o resumo executivo é pedido ao `atue-ai-service`.
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
- Sem backend, banco, autenticação ou requisições externas — exceto o resumo executivo.
- Sem router: `src/App.tsx` controla seleção, carregamento e telas.
- Tema claro.
- O header/footer copiam o produto, mas só Painel e Documentos são funcionais.

## Resumo executivo (IA)

Score, cards de achados e recomendações continuam vindo dos mocks. A única parte gerada por IA é o resumo do topo do painel, marcado como **Resumo gerado com IA** (ou **Resumo local** quando a IA falha).

```text
navegador → POST /api/analyze (mesma origem)
          → api/analyze.ts (Vercel)   [ATUE_AI_URL, ATUE_API_KEY]
          → atue-ai-service           [X-Api-Key]
          → NVIDIA Integrate API      [ATUE_LLM_API_KEY, só no AI service]
```

- `api/analyze.ts` é a única peça server-side: valida o corpo, aplica timeout de 25s e responde `{summary, degraded, ...}`. Em erro devolve `502`/`504` sem detalhe interno.
- `src/services/analysis.ts` monta o payload (`demo-<id>`, site, achados mapeados para códigos do catálogo) e **nunca lança**: rede, timeout, 4xx ou 5xx caem no resumo local com `degraded: true`.
- Nenhuma chave vai para o bundle. Não existe `VITE_*` secreto: variáveis usadas aqui são `ATUE_AI_URL` e `ATUE_API_KEY` (`.env.example`), lidas só no servidor.
- `npm run dev` usa o proxy de `vite.config.ts` (mesmas variáveis, apenas em desenvolvimento); em produção/`vercel dev` vale a função de `api/analyze.ts`. Sem as variáveis, a demo funciona com o resumo local.

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
