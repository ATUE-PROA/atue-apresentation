export const DOCUMENTS_CONTENT = {
  page: {
    eyebrow: 'Diagnóstico, análise e downloads',
    title: 'Central de Documentos',
    description:
      'Anexe um documento do seu computador ou use um exemplo, solicite a análise e baixe relatórios e modelos em PDF, DOCX ou TXT.',
  },
  tabs: {
    analyze: 'Analisar documento',
    downloads: 'Central de downloads',
  },
  analyze: {
    title: 'Anexar e analisar documento',
    description:
      'Anexe um arquivo, confira os dados exibidos e peça a análise. O ATUE não envia o arquivo para nenhum servidor.',
    emptyFileTitle: 'Nenhum arquivo anexado',
    emptyFileDescription:
      'Use o botão de anexo ou escolha um documento de exemplo abaixo para habilitar a análise.',
    attach: 'Anexar documento',
    fileHint: 'PDF, DOC, DOCX ou TXT, até 10 MB. Apenas o arquivo para análise.',
    exampleTitle: 'Ou use um documento de exemplo',
    exampleDescription:
      'Escolha um documento de exemplo para percorrer o fluxo sem anexar um arquivo do dispositivo.',
    exampleLabel: 'Documento de exemplo',
    exampleEmpty: 'Nenhum documento selecionado',
    exampleHint: 'Lista ilustrativa. O seletor de arquivos do sistema não é aberto por este campo.',
    analyze: 'Analisar documento',
    analyzeDisabledHint: 'Escolha um documento de exemplo ou anexe um arquivo para habilitar a análise.',
    analyzing: 'Analisando documento...',
    analysisSuccessTitle: 'Análise concluída',
    analysisSuccessDescription:
      'O resultado foi gerado localmente e não foi enviado a nenhum serviço externo.',
    infoTitle: 'Análise local',
    infoDescription:
      'Nenhum conteúdo é enviado a serviços externos. A análise é determinística e não substitui uma auditoria.',
    fileStays:
      'O arquivo permanece no seu dispositivo. Apenas nome, tipo e tamanho são usados na análise.',
    fullSend: 'Precisa enviar vários documentos? Use o envio completo',
    fullSendNote:
      'O envio completo faz parte do produto ATUE. Aqui, use a análise de um documento por vez.',
  },
  examples: {
    title: 'Documentos de exemplo',
    description:
      'Também é possível usar um documento de exemplo desta lista. Nenhum arquivo do seu dispositivo é acessado nesse caso.',
    hint: 'Selecione um exemplo para habilitar a análise sem anexar nenhum arquivo.',
  },
  downloads: {
    title: 'Central de downloads',
    description: 'Materiais disponíveis para download.',
    reportTitle: 'Relatório de conformidade',
    reportDescription:
      'Modelo único em PDF, com resumo executivo, achados avaliados e recomendações. Não é personalizado por empresa.',
    reportMeta: 'PDF · 1 página · modelo único',
    download: 'Baixar modelo em PDF',
    note: 'O arquivo é estático e genérico. Não contém dados da empresa selecionada nem representa uma auditoria.',
  },
} as const

export interface ExampleDocument {
  id: string
  title: string
  type: string
  size: string
  updatedAt: string
}

export const EXAMPLE_DOCUMENTS: readonly ExampleDocument[] = [
  {
    id: 'privacy-policy',
    title: 'Política de Privacidade 2026',
    type: 'Política interna',
    size: '184 KB',
    updatedAt: 'Atualizado em 21/10/2026',
  },
  {
    id: 'consent-marketing',
    title: 'Termo de Consentimento — Marketing',
    type: 'Termo',
    size: '96 KB',
    updatedAt: 'Atualizado em 12/10/2026',
  },
  {
    id: 'incident-log',
    title: 'Registro de Incidentes — 3º trimestre',
    type: 'Registro operacional',
    size: '212 KB',
    updatedAt: 'Atualizado em 05/10/2026',
  },
  {
    id: 'crm-contract',
    title: 'Contrato — Fornecedor de CRM',
    type: 'Contrato',
    size: '348 KB',
    updatedAt: 'Atualizado em 29/09/2026',
  },
]
