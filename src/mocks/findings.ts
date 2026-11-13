import type { Finding } from '../types/company'

/** Achados genéricos usados para simular uma nova análise do site. */
export const SIMULATED_FINDINGS: readonly Finding[] = [
  {
    id: 'sim-https',
    name: 'Site sem HTTPS',
    category: 'Segurança',
    risk: 'alto',
    technicalDescription: 'O domínio responde em HTTP e não redireciona para uma conexão segura.',
    businessImpact:
      'Sem HTTPS, dados de cadastro e informações de pagamento trafegam sem criptografia e podem ser interceptados.',
    recommendation:
      'Emita um certificado TLS, redirecione todo o tráfego para HTTPS e ative HSTS.',
  },
  {
    id: 'sim-cookies',
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
    id: 'sim-policy',
    name: 'Política de Privacidade incompleta',
    category: 'Transparência',
    risk: 'medio',
    technicalDescription: 'A política não informa prazos de retenção nem o canal do encarregado.',
    businessImpact:
      'Sem prazos e sem canal de contato, o titular não consegue exercer direitos nem entender por quanto tempo seus dados serão mantidos.',
    recommendation:
      'Inclua prazos por categoria de dado, o contato do DPO e o processo para atender solicitações de titulares.',
  },
  {
    id: 'sim-headers',
    name: 'Cabeçalhos de segurança ausentes',
    category: 'Segurança',
    risk: 'medio',
    technicalDescription: 'O site não envia Content-Security-Policy nem X-Content-Type-Options.',
    businessImpact:
      'Sem esses cabeçalhos, scripts injetados por terceiros podem executar no navegador do visitante e capturar dados do formulário.',
    recommendation:
      'Defina uma Content-Security-Policy restritiva e revise a política a cada novo script incluído.',
  },
  {
    id: 'sim-retention',
    name: 'Prazos de retenção genéricos',
    category: 'Retenção de dados',
    risk: 'medio',
    technicalDescription:
      'A política informa apenas que os dados são mantidos pelo tempo necessário.',
    businessImpact:
      'Critérios genéricos dificultam a eliminação oportuna de dados de campanhas encerradas.',
    recommendation:
      'Defina prazos objetivos por tipo de dado e documente o critério de eliminação ou anonimização.',
  },
  {
    id: 'sim-dpo',
    name: 'Encarregado (DPO) não indicado',
    category: 'Governança',
    risk: 'medio',
    technicalDescription: 'O site não informa quem é o encarregado pelo tratamento de dados.',
    businessImpact:
      'Sem um canal claro para o encarregado, titulares não conseguem solicitar acesso, correção ou eliminação de dados.',
    recommendation:
      'Nomeie o encarregado, publique o canal de contato e defina prazo interno de resposta.',
  },
  {
    id: 'sim-consent',
    name: 'Formulário sem aviso de finalidade',
    category: 'Bases legais',
    risk: 'medio',
    technicalDescription: 'O formulário coleta dados pessoais sem informar a finalidade.',
    businessImpact:
      'A coleta sem aviso de finalidade e sem opção de consentimento dificulta a comprovação de que o titular foi informado.',
    recommendation:
      'Explique a finalidade ao lado do formulário e registre a versão do aviso aceita.',
  },
  {
    id: 'sim-vendors',
    name: 'Compartilhamento com fornecedores não declarado',
    category: 'Terceiros',
    risk: 'baixo',
    technicalDescription: 'A política não lista os sistemas usados para operar o site.',
    businessImpact:
      'A falta de transparência sobre operadores dificulta a revisão de contratos e de transferências internacionais.',
    recommendation:
      'Liste os fornecedores por finalidade e mantenha contratos de tratamento de dados.',
  },
  {
    id: 'sim-contracts',
    name: 'Contratos sem cláusula de dados',
    category: 'Contratos e terceiros',
    risk: 'baixo',
    technicalDescription:
      'Modelos de contrato não preveem obrigações de segurança e subcontratação.',
    businessImpact:
      'Sem cláusulas de tratamento de dados, o risco permanece mesmo quando o fornecedor opera os dados.',
    recommendation:
      'Inclua anexo de tratamento de dados com instruções, medidas de segurança e devolução ao final do contrato.',
  },
  {
    id: 'sim-rights',
    name: 'Canal para titulares não informado',
    category: 'Transparência',
    risk: 'baixo',
    technicalDescription: 'A política não descreve como solicitar acesso, correção ou exclusão.',
    businessImpact:
      'O titular não encontra o caminho para exercer direitos e a empresa perde o registro das solicitações.',
    recommendation:
      'Publique um canal dedicado e registre prazo e resposta de cada solicitação.',
  },
  {
    id: 'sim-transfer',
    name: 'Transferência internacional não informada',
    category: 'Terceiros',
    risk: 'baixo',
    technicalDescription: 'Serviços usados pelo site armazenam dados fora do Brasil.',
    businessImpact:
      'A ausência de informação sobre o país de armazenamento reduz a transparência e dificulta a revisão de contratos.',
    recommendation:
      'Indique os países de armazenamento e as garantias aplicadas a cada transferência.',
  },
]
