/* =========================================================
   CONTEÚDO EDITÁVEL — altere textos aqui sem mexer no layout
   ========================================================= */
window.CONTENT = {
  areas: [
    { id: "receber", nome: "Contas a receber", titulo: "Preparar-se antes para o risco de calote",
      texto: "Nem todo cliente vai pagar. Se o histórico indica que parte das vendas a prazo não será recebida, essa perda é estimada e registrada já — antes do calote acontecer.",
      exemplo: "R$ 50.000 a receber, 4% de inadimplência histórica → provisão de R$ 2.000.",
      icon: '<svg viewBox="0 0 48 48"><rect x="6" y="12" width="36" height="24" rx="5"/><path class="draw" d="M6 20h36"/><circle class="pulse" cx="34" cy="29" r="3"/></svg>' },
    { id: "estoque", nome: "Estoques", titulo: "Registrar mercadorias pelo menor valor real",
      texto: "Se a mercadoria custou R$ 100, mas hoje só vende por R$ 80 (já descontadas as despesas de venda), o estoque vale R$ 80 no balanço. Não se registra ganho por alta de preço antes da venda.",
      exemplo: "Custo R$ 20.000 · Valor realizável R$ 15.000 → registra R$ 15.000.",
      icon: '<svg viewBox="0 0 48 48"><path d="M8 18l16-8 16 8v16l-16 8-16-8z"/><path class="draw" d="M8 18l16 8 16-8M24 26v16"/></svg>' },
    { id: "impairment", nome: "Bens e máquinas", titulo: "Reconhecer a perda de valor dos bens",
      texto: "Uma máquina obsoleta ou um investimento que perdeu valor não pode continuar no balanço pelo preço antigo. Ajusta-se ao valor que realmente pode ser recuperado.",
      exemplo: "Máquina contabilizada por R$ 80.000, recuperável R$ 55.000 → perda de R$ 25.000.",
      icon: '<svg viewBox="0 0 48 48"><path d="M6 38h36"/><path class="draw" d="M10 14l9 9 7-5 12 14"/><path d="M32 32h6v-6"/></svg>' },
    { id: "passivos", nome: "Dívidas e processos", titulo: "Antecipar despesas e dívidas prováveis",
      texto: "Processo judicial com perda provável? A obrigação entra no passivo agora, pela melhor estimativa — e, na dúvida entre valores razoáveis, a postura prudente pende para o maior.",
      exemplo: "Processo estimado entre R$ 10.000 e R$ 15.000 → provisão de R$ 15.000.",
      icon: '<svg viewBox="0 0 48 48"><path d="M24 6v36M12 14h24"/><path class="draw" d="M12 14l-6 12h12zM36 14l-6 12h12z"/></svg>' },
    { id: "receitas", nome: "Vendas e receitas", titulo: "Só contar com o dinheiro quando for certeza",
      texto: "Contrato assinado não é dinheiro garantido. Receita entra quando há razoável segurança de que será realizada. Ganhos possíveis ficam de fora; perdas prováveis entram.",
      exemplo: "Ação judicial que a empresa pode ganhar → não registra o ganho ainda.",
      icon: '<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="17"/><path class="draw" d="M16 24l6 6 11-12"/></svg>' }
  ],

  atos: [
    { n: "Ato 1", titulo: "A promessa bonita",
      texto: "Segundo reportagens, o banco cresceu em ritmo acelerado oferecendo CDBs com remuneração muito acima da média do mercado — em alguns casos, próximos de 140% do CDI. Para pagar essa conta, a instituição teria concentrado recursos em créditos e ativos de maior risco e difícil avaliação.",
      licao: "Retorno muito acima do mercado costuma significar risco muito acima do mercado. Sem margem de segurança, qualquer tropeço vira rombo." },
    { n: "Ato 2", titulo: "O balanço enfeitado",
      texto: "De acordo com apurações públicas e com a atuação do Banco Central, haveria ativos registrados por valores superiores ao que efetivamente valiam e uma carteira de crédito em deterioração sem o reconhecimento correspondente de perdas.",
      licao: "É exatamente o oposto da prudência: ganhos antecipados, perdas adiadas." },
    { n: "Ato 3", titulo: "A mágica com fundos",
      texto: "Investigações relatadas na imprensa apontam um mecanismo circular: recursos do próprio banco iriam para fundos de investimento, que então comprariam ativos problemáticos do banco. Os ativos ruins saem do balanço — e a deterioração some da vista.",
      licao: "É como pagar a fatura do seu cartão com um empréstimo de uma “empresa de fachada” que é sua. A dívida não sumiu: só mudou de bolso." }
  ],

  noticiasMaster: [
    {
      veiculo: "Imprensa Econômica / BC",
      data: "Casos apurados",
      manchete: "Carteira de crédito com perdas ocultadas e falta de provisões",
      trecho: "Apurações de órgãos reguladores apontaram créditos vencidos e inadimplentes mantidos sem a devida provisão para perdas esperadas, maquiando o balanço patrimonial.",
      infracao: "Falta de prudência: Não reconheceu a perda provável no momento em que ela surgiu."
    },
    {
      veiculo: "Investigações Públicas",
      data: "Casos apurados",
      manchete: "Ativos e títulos registrados por valores acima da realidade de mercado",
      trecho: "Títulos privados e ativos ilíquidos eram mantidos contabilizados por valores nominais inflados, contrariando testes de recuperabilidade (impairment).",
      infracao: "Falta de prudência: Superavaliação do ativo em vez de ajustá-lo ao valor realizável."
    },
    {
      veiculo: "Relatórios de Mercado",
      data: "Casos apurados",
      manchete: "Triangulação e empurrar ativos podres para fundos exclusivos",
      trecho: "Operações estruturadas repassavam ativos problemáticos a fundos de investimento ligados à própria instituição financeira para tirá-los das linhas visíveis do balanço.",
      infracao: "Falta de prudência: Omissão de riscos reais através de engenharia contábil artificial."
    },
    {
      veiculo: "Mercado Financeiro",
      data: "Casos apurados",
      manchete: "Crescimento alavancado em CDBs sem margem de segurança de liquidez",
      trecho: "A captação agressiva a taxas bem acima do CDI financiava operações arriscadas sem colchão prudencial, transferindo o risco sistêmico para garantias de mercado.",
      infracao: "Falta de prudência: Postura temerária sem constituição de reservas conservadoras."
    }
  ],

  situacoesParte1: [
    {
      num: 1,
      titulo: "Situação 1",
      cenario: "Trânsito: Bruno viu a luz amarela do semáforo acender longe, mas acelerou para não correr o risco de pegar o sinal vermelho fechando.",
      pergunta: "A atitude foi prudente ou imprudente?",
      resposta: "Imprudente",
      explicacao: "Aumentar a velocidade ao ver o sinal amarelo em vez de desacelerar amplia o risco de colisão e de furar o sinal vermelho."
    },
    {
      num: 2,
      titulo: "Situação 2",
      cenario: "Trabalho: Camila percebeu uma falha em um relatório do colega que seria enviado ao cliente, avisou o colega em particular antes do envio e ajustou sua própria parte.",
      pergunta: "A atitude foi prudente ou imprudente?",
      resposta: "Prudente",
      explicacao: "Evitou um impacto negativo com o cliente e agiu com profissionalismo ao resolver o problema internamente antes do envio."
    },
    {
      num: 3,
      titulo: "Situação 3",
      cenario: "Cotidiano: Rodrigo tem um voo importante às 18h e, sabendo do trânsito no horário de pico, decidiu sair de casa às 14h com folga exagerada.",
      pergunta: "A atitude foi prudente ou imprudente?",
      resposta: "Prudente",
      explicacao: "Priorizou a segurança de não perder o compromisso assumindo o custo da espera em vez de arriscar imprevistos de trânsito."
    },
    {
      num: 4,
      titulo: "Situação 4",
      cenario: "Trânsito: Mariana percebeu um barulho estalando ao esterçar o volante do carro, mas resolveu adiar a visita à oficina até a revisão programada daqui a 3 meses.",
      pergunta: "A atitude foi prudente ou imprudente?",
      resposta: "Imprudente",
      explicacao: "Ruídos na direção indicam falha mecânica/suspensão que pode comprometer o controle do veículo a qualquer momento."
    },
    {
      num: 5,
      titulo: "Situação 5",
      cenario: "Trabalho: Lucas gravou no seu repositório local a versão final do código do projeto e não fez backup em nuvem por ser um trabalho individual rápido.",
      pergunta: "A atitude foi prudente ou imprudente?",
      resposta: "Imprudente",
      explicacao: "Depender apenas do armazenamento local deixa o trabalho vulnerável a falhas de hardware, perda ou corrupção de dados."
    }
  ],

  situacoesParte2: [
    {
      num: 6,
      titulo: "Situação 6",
      cenario: "Cotidiano: Juliana vai viajar para o exterior e ativou um aviso de viagem no cartão de crédito, além de levar uma quantia reserva em espécie.",
      pergunta: "A atitude foi prudente ou imprudente?",
      resposta: "Prudente",
      explicacao: "Antecipou falhas de pagamento (bloqueios preventivos) e garantiu um plano B para emergências financeiras fora do país."
    },
    {
      num: 7,
      titulo: "Situação 7",
      cenario: "Trânsito: Gabriel faz o mesmo trajeto para o trabalho há anos, mas sempre liga o aplicativo de GPS antes de sair para verificar eventuais acidentes ou bloqueios na via.",
      pergunta: "A atitude foi prudente ou imprudente?",
      resposta: "Prudente",
      explicacao: "Evita surpresas no caminho checando informações em tempo real, mesmo em rotas habituais."
    },
    {
      num: 8,
      titulo: "Situação 8",
      cenario: "Trabalho: Amanda prometeu a entrega de uma demanda crítica para sexta-feira considerando que ninguém da equipe vá faltar ou ter imprevistos.",
      pergunta: "A atitude foi prudente ou imprudente?",
      resposta: "Imprudente",
      explicacao: "Montou o cronograma com base no cenário perfeito (sem margem de erro/contingência para imprevistos de pessoal)."
    },
    {
      num: 9,
      titulo: "Situação 9",
      cenario: "Cotidiano: Diego comprou um eletrodoméstico caro usado na internet sem testar na hora, confiando na palavra do vendedor que mostrou um vídeo do aparelho funcionando.",
      pergunta: "A atitude foi prudente ou imprudente?",
      resposta: "Imprudente",
      explicacao: "Aceitou um risco financeiro alto sem checagem presencial ou garantias formais de funcionamento."
    },
    {
      num: 10,
      titulo: "Situação 10",
      cenario: "Trânsito: Beatriz notou que o pneu do carro está no limite de desgaste (careca), mas como não costuma pegar estrada, decidiu rodar mais alguns meses na cidade.",
      pergunta: "A atitude foi prudente ou imprudente?",
      resposta: "Imprudente",
      explicacao: "Pneu careca perde aderência e eficiência de frenagem mesmo em baixas velocidades na cidade, especialmente em pista molhada."
    }
  ],

  situacoes: [
    { num: 1, titulo: "Situação 1", cenario: "Trânsito: Bruno viu a luz amarela do semáforo acender longe, mas acelerou para não correr o risco de pegar o sinal vermelho fechando.", pergunta: "A atitude foi prudente ou imprudente?", resposta: "Imprudente", explicacao: "Aumentar a velocidade ao ver o sinal amarelo em vez de desacelerar amplia o risco de colisão e de furar o sinal vermelho." },
    { num: 2, titulo: "Situação 2", cenario: "Trabalho: Camila percebeu uma falha em um relatório do colega que seria enviado ao cliente, avisou o colega em particular antes do envio e ajustou sua própria parte.", pergunta: "A atitude foi prudente ou imprudente?", resposta: "Prudente", explicacao: "Evitou um impacto negativo com o cliente e agiu com profissionalismo ao resolver o problema internamente antes do envio." },
    { num: 3, titulo: "Situação 3", cenario: "Cotidiano: Rodrigo tem um voo importante às 18h e, sabendo do trânsito no horário de pico, decidiu sair de casa às 14h com folga exagerada.", pergunta: "A atitude foi prudente ou imprudente?", resposta: "Prudente", explicacao: "Priorizou a segurança de não perder o compromisso assumindo o custo da espera em vez de arriscar imprevistos de trânsito." },
    { num: 4, titulo: "Situação 4", cenario: "Trânsito: Mariana percebeu um barulho estalando ao esterçar o volante do carro, mas resolveu adiar a visita à oficina até a revisão programada daqui a 3 meses.", pergunta: "A atitude foi prudente ou imprudente?", resposta: "Imprudente", explicacao: "Ruídos na direção indicam falha mecânica/suspensão que pode comprometer o controle do veículo a qualquer momento." },
    { num: 5, titulo: "Situação 5", cenario: "Trabalho: Lucas gravou no seu repositório local a versão final do código do projeto e não fez backup em nuvem por ser um trabalho individual rápido.", pergunta: "A atitude foi prudente ou imprudente?", resposta: "Imprudente", explicacao: "Depender apenas do armazenamento local deixa o trabalho vulnerável a falhas de hardware, perda ou corrupção de dados." },
    { num: 6, titulo: "Situação 6", cenario: "Cotidiano: Juliana vai viajar para o exterior e ativou um aviso de viagem no cartão de crédito, além de levar uma quantia reserva em espécie.", pergunta: "A atitude foi prudente ou imprudente?", resposta: "Prudente", explicacao: "Antecipou falhas de pagamento (bloqueios preventivos) e garantiu um plano B para emergências financeiras fora do país." },
    { num: 7, titulo: "Situação 7", cenario: "Trânsito: Gabriel faz o mesmo trajeto para o trabalho há anos, mas sempre liga o aplicativo de GPS antes de sair para verificar eventuais acidentes ou bloqueios na via.", pergunta: "A atitude foi prudente ou imprudente?", resposta: "Prudente", explicacao: "Evita surpresas no caminho checando informações em tempo real, mesmo em rotas habituais." },
    { num: 8, titulo: "Situação 8", cenario: "Trabalho: Amanda prometeu a entrega de uma demanda crítica para sexta-feira considerando que ninguém da equipe vá faltar ou ter imprevistos.", pergunta: "A atitude foi prudente ou imprudente?", resposta: "Imprudente", explicacao: "Montou o cronograma com base no cenário perfeito (sem margem de erro/contingência para imprevistos de pessoal)." },
    { num: 9, titulo: "Situação 9", cenario: "Cotidiano: Diego comprou um eletrodoméstico caro usado na internet sem testar na hora, confiando na palavra do vendedor que mostrou um vídeo do aparelho funcionando.", pergunta: "A atitude foi prudente ou imprudente?", resposta: "Imprudente", explicacao: "Aceitou um risco financeiro alto sem checagem presencial ou garantias formais de funcionamento." },
    { num: 10, titulo: "Situação 10", cenario: "Trânsito: Beatriz notou que o pneu do carro está no limite de desgaste (careca), mas como não costuma pegar estrada, decidiu rodar mais alguns meses na cidade.", pergunta: "A atitude foi prudente ou imprudente?", resposta: "Imprudente", explicacao: "Pneu careca perde aderência e eficiência de frenagem mesmo em baixas velocidades na cidade, especialmente em pista molhada." }
  ],

  fontes: [
    { nome: "Agência Brasil — cobertura sobre a liquidação do Banco Master pelo Banco Central", url: "https://agenciabrasil.ebc.com.br/" },
    { nome: "Banco Central do Brasil — comunicados oficiais e fiscalização prudencial", url: "https://www.bcb.gov.br/" },
    { nome: "CPC 00 (R2) — Estrutura Conceitual; CPC 01 (Impairment), CPC 16 (Estoques) e CPC 25 (Provisões)", url: "https://www.cpc.org.br/" }
  ]
};
