import type { AnalysisLog, CompanyId, CompanyProfile, Finding } from '../types/company'

const ECOMMERCE_FINDINGS: Finding[] = [
  {
    id: 'ecommerce-https',
    name: 'Site sem HTTPS',
    category: 'Segurança',
    risk: 'alto',
    technicalDescription: 'O domínio responde em HTTP e não redireciona para uma conexão segura.',
    businessImpact:
      'Sem HTTPS, dados de cadastro, senhas e informações de pagamento trafegam sem criptografia e podem ser interceptados.',
    recommendation:
      'Emita um certificado TLS, redirecione todo o tráfego para HTTPS e ative HSTS para impedir o retorno ao protocolo inseguro.',
  },
  {
    id: 'ecommerce-csp',
    name: 'Política de segurança de conteúdo ausente',
    category: 'Segurança',
    risk: 'alto',
    technicalDescription: 'O site não envia o cabeçalho Content-Security-Policy.',
    businessImpact:
      'Sem uma política de conteúdo, scripts injetados por terceiros podem executar no navegador do visitante e capturar dados do formulário.',
    recommendation:
      'Defina uma Content-Security-Policy restritiva, liberando apenas os domínios realmente necessários e revisando a política a cada novo script.',
  },
  {
    id: 'ecommerce-cookies',
    name: 'Banner de cookies sem escolha granular',
    category: 'Cookies e rastreamento',
    risk: 'alto',
    technicalDescription:
      'Cookies de marketing são gravados antes de qualquer manifestação do visitante.',
    businessImpact:
      'A ausência de consentimento prévio impede o titular de recusar rastreamento e reduz a transparência sobre as finalidades.',
    recommendation:
      'Implemente um banner com categorias separadas, bloqueie cookies não essenciais até o aceite e permita alterar a escolha depois.',
  },
  {
    id: 'ecommerce-policy',
    name: 'Política de Privacidade incompleta',
    category: 'Transparência',
    risk: 'medio',
    technicalDescription: 'A política não informa prazos de retenção nem o canal do encarregado.',
    businessImpact:
      'Sem prazos e sem canal de contato, o titular não consegue exercer direitos nem entender por quanto tempo seus dados serão mantidos.',
    recommendation:
      'Inclua prazos por categoria de dado, o contato do DPO e o processo para atender solicitações de titulares.',
  },
]

const CLINIC_FINDINGS: Finding[] = [
  {
    id: 'clinic-sensitive-retention',
    name: 'Retenção de dados de saúde sem critério',
    category: 'Dados sensíveis',
    risk: 'alto',
    technicalDescription: 'Prontuários e agendamentos são mantidos sem prazo definido na política.',
    businessImpact:
      'Dados de saúde exigem justificativa específica e controle rigoroso de acesso e retenção. A ausência de prazo amplia o risco de uso indevido.',
    recommendation:
      'Defina prazos por tipo de registro, restrinja o acesso por função e registre a base legal aplicada a cada tratamento.',
  },
  {
    id: 'clinic-dpo',
    name: 'Encarregado (DPO) não indicado',
    category: 'Governança',
    risk: 'alto',
    technicalDescription: 'O site não informa quem é o encarregado pelo tratamento de dados.',
    businessImpact:
      'Sem um canal claro para o encarregado, titulares não conseguem solicitar acesso, correção ou eliminação de dados de saúde.',
    recommendation:
      'Nomeie o encarregado, publique o canal de contato e defina prazo interno de resposta para solicitações de titulares.',
  },
  {
    id: 'clinic-consent',
    name: 'Formulário de agendamento sem consentimento',
    category: 'Bases legais',
    risk: 'medio',
    technicalDescription: 'O formulário coleta dados pessoais sem informar a finalidade.',
    businessImpact:
      'A coleta sem aviso de finalidade e sem opção de consentimento dificulta a comprovação de que o titular foi informado.',
    recommendation:
      'Explique a finalidade ao lado do formulário, registre a versão do aviso aceita e permita revogar o consentimento.',
  },
  {
    id: 'clinic-vendors',
    name: 'Compartilhamento com fornecedores não declarado',
    category: 'Terceiros',
    risk: 'baixo',
    technicalDescription: 'A política não lista os sistemas usados para prontuário e agendamento.',
    businessImpact:
      'A falta de transparência sobre operadores dificulta a revisão de contratos e de transferências internacionais.',
    recommendation:
      'Liste os fornecedores por finalidade, mantenha contratos de tratamento de dados e indique países de armazenamento.',
  },
]

const AGENCY_FINDINGS: Finding[] = [
  {
    id: 'agency-cookie-details',
    name: 'Categorias de cookies sem detalhamento',
    category: 'Cookies e rastreamento',
    risk: 'medio',
    technicalDescription: 'O banner existe, mas não descreve duração e fornecedores.',
    businessImpact:
      'Sem detalhes por categoria, o visitante não consegue avaliar o impacto dos cookies de análise e publicidade.',
    recommendation:
      'Publique uma tabela com categoria, finalidade, duração e fornecedor, além do caminho para revisar a escolha.',
  },
  {
    id: 'agency-retention',
    name: 'Prazos de retenção genéricos',
    category: 'Retenção de dados',
    risk: 'medio',
    technicalDescription:
      'A política informa apenas que os dados são mantidos pelo tempo necessário.',
    businessImpact:
      'Critérios genéricos não demonstram controle e dificultam a eliminação oportuna de dados de campanhas encerradas.',
    recommendation:
      'Defina prazos objetivos por tipo de dado e documente o critério de eliminação ou anonimização.',
  },
  {
    id: 'agency-vendor-contracts',
    name: 'Contratos de fornecedores sem cláusula de dados',
    category: 'Contratos e terceiros',
    risk: 'baixo',
    technicalDescription:
      'Modelos de contrato não preveem obrigações de segurança e subcontratação.',
    businessImpact:
      'Sem cláusulas de tratamento de dados, a agência mantém risco mesmo quando o fornecedor é quem opera os dados do cliente.',
    recommendation:
      'Inclua anexo de tratamento de dados com instruções, medidas de segurança, subcontratados e devolução ao final do contrato.',
  },
]

const COMMON_LOGS: AnalysisLog[] = [
  { level: 'success', message: 'Resolvendo DNS e verificando disponibilidade...' },
  { level: 'success', message: 'Mapeando cabeçalhos de segurança...' },
  { level: 'info', message: 'Identificando formulários e pontos de coleta...' },
  { level: 'info', message: 'Consultando motor de conformidade (simulado)...' },
  { level: 'success', message: 'Consolidando relatório executivo...' },
]

const ECOMMERCE_LOGS: AnalysisLog[] = [
  COMMON_LOGS[0],
  { level: 'warning', message: 'Conexão HTTP sem redirecionamento para HTTPS.' },
  { level: 'warning', message: 'Content-Security-Policy ausente nos cabeçalhos.' },
  COMMON_LOGS[2],
  { level: 'warning', message: 'Cookies de marketing gravados antes do consentimento.' },
  COMMON_LOGS[3],
  COMMON_LOGS[4],
]

const CLINIC_LOGS: AnalysisLog[] = [
  COMMON_LOGS[0],
  COMMON_LOGS[1],
  { level: 'warning', message: 'Formulário de agendamento coleta dados sensíveis sem aviso de finalidade.' },
  { level: 'warning', message: 'Encarregado (DPO) não indicado publicamente.' },
  { level: 'warning', message: 'Retenção de prontuários sem prazo declarado.' },
  COMMON_LOGS[3],
  COMMON_LOGS[4],
]

const AGENCY_LOGS: AnalysisLog[] = [
  COMMON_LOGS[0],
  COMMON_LOGS[1],
  { level: 'info', message: 'Banner de cookies encontrado, mas sem detalhamento por categoria.' },
  { level: 'warning', message: 'Prazos de retenção genéricos na política.' },
  { level: 'warning', message: 'Contratos de fornecedores sem cláusula de tratamento de dados.' },
  COMMON_LOGS[3],
  COMMON_LOGS[4],
]

export const COMPANIES: readonly CompanyProfile[] = [
  {
    id: 'ecommerce',
    name: 'Loja Verde Naturals',
    segment: 'E-commerce',
    description:
      'Loja de produtos naturais com checkout próprio, rastreadores de marketing e política desatualizada.',
    website: 'https://lojaverdenaturals.com.br',
    score: 24,
    summary:
      'Operação de e-commerce com checkout próprio e rastreadores de marketing. A ausência de HTTPS e de política de conteúdo amplia o risco sobre dados de pagamento.',
    findings: ECOMMERCE_FINDINGS,
    analysisLogs: ECOMMERCE_LOGS,
  },
  {
    id: 'clinica',
    name: 'Clínica Bem Estar',
    segment: 'Clínica médica',
    description:
      'Clínica com agendamento online e prontuário eletrônico, sem encarregado indicado publicamente.',
    website: 'https://clinicabemestar.com.br',
    score: 41,
    summary:
      'Clínica com agendamento online e prontuário eletrônico. Dados de saúde são tratados sem prazo de retenção declarado e sem encarregado público.',
    findings: CLINIC_FINDINGS,
    analysisLogs: CLINIC_LOGS,
  },
  {
    id: 'agencia',
    name: 'Agência Órbita',
    segment: 'Agência B2B',
    description:
      'Agência que trata dados de leads de clientes e mantém contratos de fornecedores sem cláusulas específicas.',
    website: 'https://agenciaorbita.com.br',
    score: 68,
    summary:
      'Agência B2B que trata dados de leads de clientes. A operação tem controles básicos, mas faltam detalhamento de cookies, retenção e cláusulas com fornecedores.',
    findings: AGENCY_FINDINGS,
    analysisLogs: AGENCY_LOGS,
  },
]

export function getCompanyById(id: CompanyId): CompanyProfile | undefined {
  return COMPANIES.find((company) => company.id === id)
}
