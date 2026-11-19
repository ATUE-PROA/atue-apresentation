export const DIAGNOSTICS_CONTENT = {
  page: {
    title: 'Painel',
    demoBadge: 'Demonstração',
    ctaUpdate: 'Atualizar análise',
  },
  summary: {
    title: 'Resumo executivo',
    aiLabel: 'Gerado com IA',
    localLabel: 'Resumo local',
  },
  index: {
    title: 'Índice de conformidade',
    scaleNote: 'de 100',
    updatedLabel: 'Última análise em',
    disclaimer:
      'Indicador de apoio. Não é certificação, laudo nem garantia de conformidade com a LGPD.',
    dimensionsLabel: 'O que é avaliado',
    dimensions: [
      'Transparência: política de privacidade acessível e finalidades de tratamento.',
      'Cookies e rastreamento: escolha do visitante antes de cookies não essenciais.',
      'Retenção de dados: prazos e critérios de eliminação informados.',
    ],
  },
  pending: {
    title: 'Pendências',
    description: 'Ordenadas por severidade.',
    severityTitle: 'Pendências por severidade',
    columns: {
      severity: 'Severidade',
      item: 'Pendência',
      recommendation: 'O que fazer',
    },
    empty: 'Nenhuma pendência no diagnóstico atual.',
    viewAll: 'Ver central',
  },
  nextStep: {
    title: 'Próximo passo',
    action: 'Organizar evidência',
    viewAll: 'Ver todas as pendências',
    emptyTitle: 'Nada urgente agora',
    emptyDescription:
      'Nenhuma pendência registrada. Mantenha as evidências atualizadas para sustentar esse resultado.',
  },
  request: {
    label: 'Nova análise',
    placeholder: 'https://cliente.com.br',
    updateSubmitLabel: 'Atualizar',
    submittingLabel: 'Analisando…',
    helpText: 'Análise simulada. Nenhum site é acessado e o resultado anterior é substituído.',
    successTitle: 'Análise atualizada',
    successDescription: 'O resultado no topo da página foi atualizado para a URL informada.',
  },
  footerNote: 'O resultado não garante conformidade com a LGPD.',
} as const
