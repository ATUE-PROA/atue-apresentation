# TASKS — atue-apresentation

Checklist da demonstração mobile com duas telas do produto.

## T01 — Fundação

- [x] Identidade compartilhada em `DESIGN.md`.
- [x] Tokens claros e fontes locais.
- [x] Logos oficiais em `public/brand/`.
- [x] Header/footer no padrão do produto.

## T02 — Seleção e carregamento

- [x] Tela com a demonstração padrão e as três empresas fictícias.
- [x] Nome e segmento apenas, sem scores.
- [x] Carregamento mockado de 1,6s com progresso.
- [x] Entrada no Painel após o carregamento.

## T03 — Painel

- [x] Cópia do dashboard do web.
- [x] Score, nível, ressalva e dimensões.
- [x] Prioridades e pendências por severidade.
- [x] Accordion de pendências.
- [x] Formulário de atualização simulado.

## T04 — Central de Documentos

- [x] Abas Analisar documento e Central de downloads.
- [x] Anexo local com validação de tipo/tamanho.
- [x] Documentos de exemplo interativos.
- [x] Simulação de análise com loading e feedback.
- [x] Download do modelo PDF.

## T05 — Navegação

- [x] Painel ⇄ Documentos no header.
- [x] “Trocar empresa” no footer.
- [x] Itens não implementados desabilitados.

## T06 — Qualidade

- [x] `npm run lint`.
- [x] `npx tsc -b`.
- [x] Screenshots em 390 e 1280 px.
- [x] Sem `fetch`/XHR.
- [ ] Clique ponta a ponta em dispositivo físico.
- [ ] Leitor de tela.
- [ ] Safe area de iPhone.

## Critérios de conclusão

- [x] Seleção com quatro cenários.
- [x] Carregamento funcional.
- [x] Painel e Central de Documentos.
- [x] Navegação entre as duas telas.
- [x] PDF acessível.
- [x] Sem login, backend ou requisições externas.
- [x] `npm run lint` e `npx tsc -b` passam.

## Validação executada

- `npm run lint` — passou.
- `npx tsc -b` — passou.
- Vite dev server — HTTP 200.
- PDF — HTTP 200, `application/pdf`.
- Screenshots — Firefox headless.
- Nenhum `npm run build` foi executado.

## Pendências

- Clique real ponta a ponta e leitor de tela.
- Safe area de iOS em hardware.
- Tema escuro fora do escopo.
