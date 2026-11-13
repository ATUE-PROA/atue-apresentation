import type { CompanyId, CompanyProfile, Finding } from '../types/company'

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

const DEMO_FINDINGS: Finding[] = [
  {
    id: 'demo-privacy-policy',
    name: 'Política de Privacidade',
    category: 'Transparência',
    risk: 'alto',
    technicalDescription: 'Documento não encontrado no site institucional.',
    businessImpact:
      'Sem uma política acessível, o titular não consegue entender quais dados são coletados, com qual finalidade e por quanto tempo são mantidos.',
    recommendation:
      'Publique uma Política de Privacidade em local visível e inclua finalidades, bases legais, compartilhamentos, retenção e canal do DPO.',
  },
  {
    id: 'demo-cookie-banner',
    name: 'Banner de cookies',
    category: 'Cookies e rastreamento',
    risk: 'medio',
    technicalDescription: 'O site não apresenta escolha de cookies antes do carregamento.',
    businessImpact:
      'Cookies de análise e marketing podem ser gravados sem que o visitante tenha uma opção clara de aceitar ou recusar.',
    recommendation:
      'Implemente um banner com opções granulares, registre a escolha e impeça o carregamento de cookies não essenciais antes do consentimento.',
  },
  {
    id: 'demo-retention',
    name: 'Prazo de retenção',
    category: 'Retenção de dados',
    risk: 'baixo',
    technicalDescription: 'A política atual não informa prazos de retenção.',
    businessImpact:
      'A ausência de prazos dificulta a eliminação oportuna e a comprovação de que os dados não são mantidos além do necessário.',
    recommendation:
      'Defina prazos por categoria de dado e documente o critério usado para eliminar ou anonimizar registros ao final do período.',
  },
]

export const COMPANIES: readonly CompanyProfile[] = [
  {
    id: 'demo',
    name: 'Empresa Modelo',
    segment: 'Serviços digitais',
    description: 'Cenário inicial com três pendências avaliadas e score 72.',
    website: 'https://empresa-modelo.com.br',
    lastAnalysisAt: '2026-10-28T14:20:00.000Z',
    score: 72,
    summary:
      'Cenário inicial com três pendências avaliadas. O resultado organiza os achados por severidade e propõe um plano de adequação priorizado.',
    findings: DEMO_FINDINGS,
  },
  {
    id: 'ecommerce',
    name: 'Loja Verde Naturals',
    segment: 'E-commerce',
    description:
      'Loja de produtos naturais com checkout próprio, rastreadores de marketing e política desatualizada.',
    website: 'https://lojaverdenaturals.com.br',
    lastAnalysisAt: '2026-11-09T14:32:00.000Z',
    score: 24,
    summary:
      'Operação de e-commerce com checkout próprio e rastreadores de marketing. A ausência de HTTPS e de política de conteúdo amplia o risco sobre dados de pagamento.',
    findings: ECOMMERCE_FINDINGS,
  },
  {
    id: 'clinica',
    name: 'Clínica Bem Estar',
    segment: 'Clínica médica',
    description:
      'Clínica com agendamento online e prontuário eletrônico, sem encarregado indicado publicamente.',
    website: 'https://clinicabemestar.com.br',
    lastAnalysisAt: '2026-11-10T10:15:00.000Z',
    score: 41,
    summary:
      'Clínica com agendamento online e prontuário eletrônico. Dados de saúde são tratados sem prazo de retenção declarado e sem encarregado público.',
    findings: CLINIC_FINDINGS,
  },
  {
    id: 'agencia',
    name: 'Agência Órbita',
    segment: 'Agência B2B',
    description:
      'Agência que trata dados de leads de clientes e mantém contratos de fornecedores sem cláusulas específicas.',
    website: 'https://agenciaorbita.com.br',
    lastAnalysisAt: '2026-11-11T09:20:00.000Z',
    score: 68,
    summary:
      'Agência B2B que trata dados de leads de clientes. A operação tem controles básicos, mas faltam detalhamento de cookies, retenção e cláusulas com fornecedores.',
    findings: AGENCY_FINDINGS,
  },
]

export function getCompanyById(id: CompanyId): CompanyProfile | undefined {
  return COMPANIES.find((company) => company.id === id)
}
