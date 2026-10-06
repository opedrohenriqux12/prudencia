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
      cenario: "Maria emprestou R$ 100 a um amigo que sempre atrasa e já contou com esse dinheiro no orçamento do mês.",
      pergunta: "A atitude foi prudente ou imprudente?",
      resposta: "Imprudente",
      explicacao: "Não há certeza de que o dinheiro vai voltar. Diante do histórico de calote/atraso, não se antecipa o recebimento."
    },
    {
      num: 2,
      titulo: "Situação 2",
      cenario: "Ana recebeu o salário na conta e só então comprou o que queria.",
      pergunta: "A atitude foi prudente ou imprudente?",
      resposta: "Prudente",
      explicacao: "O ganho já é certo e foi efetivamente realizado antes de assumir novos compromissos."
    },
    {
      num: 3,
      titulo: "Situação 3",
      cenario: "Pedro tem uma bicicleta que custou R$ 800, mas hoje vale R$ 500, e continua dizendo que ela vale R$ 800.",
      pergunta: "A atitude foi prudente ou imprudente?",
      resposta: "Imprudente",
      explicacao: "Deveria reconhecer a perda e usar o valor menor (custo versus valor realizável líquido)."
    },
    {
      num: 4,
      titulo: "Situação 4",
      cenario: "Carla soube que a conta de luz vai subir e passou a separar um valor extra todo mês.",
      pergunta: "A atitude foi prudente ou imprudente?",
      resposta: "Prudente",
      explicacao: "Ela se prepara antes para o cenário mais cauteloso, constituindo uma provisão para um aumento provável."
    },
    {
      num: 5,
      titulo: "Situação 5",
      cenario: "Lucas recebeu uma multa que ainda pode ser contestada e decidiu ignorá-la até sair a decisão.",
      pergunta: "A atitude foi prudente ou imprudente?",
      resposta: "Imprudente",
      explicacao: "Deveria reservar o valor, pois há risco razoável de ter que pagar a obrigação."
    }
  ],

  situacoesParte2: [
    {
      num: 6,
      titulo: "Situação 6",
      cenario: "Bia soube que o celular dela caiu de preço e passou a planejar a venda pelo valor atual de mercado.",
      pergunta: "A atitude foi prudente ou imprudente?",
      resposta: "Prudente",
      explicacao: "Ela usa o valor que o bem realmente vale hoje no mercado, sem inflar suas expectativas de ativo."
    },
    {
      num: 7,
      titulo: "Situação 7",
      cenario: "Rafa ganhou um prêmio em uma rifa e gastou o valor antes de recebê-lo.",
      pergunta: "A atitude foi prudente ou imprudente?",
      resposta: "Imprudente",
      explicacao: "Ganho futuro não se antecipa: é preciso esperar o recebimento concreto e certo."
    },
    {
      num: 8,
      titulo: "Situação 8",
      cenario: "Sofia vai receber uma restituição de imposto, mas sem data, e decidiu não contar com ela neste mês.",
      pergunta: "A atitude foi prudente ou imprudente?",
      resposta: "Prudente",
      explicacao: "Ela só conta com o ganho quando houver certeza da data e realização do recurso."
    },
    {
      num: 9,
      titulo: "Situação 9",
      cenario: "Tiago sabe que a geladeira, sem garantia, faz um barulho estranho e decidiu não separar nada para o conserto.",
      pergunta: "A atitude foi prudente ou imprudente?",
      resposta: "Imprudente",
      explicacao: "Deveria reservar uma quantia para o conserto provável de um passivo iminente."
    },
    {
      num: 10,
      titulo: "Situação 10",
      cenario: "Dani combinou que uma amiga paga parte do aluguel, mas fez o orçamento prevendo pagar tudo caso ela atrase.",
      pergunta: "A atitude foi prudente ou imprudente?",
      resposta: "Prudente",
      explicacao: "Ela tem um plano para o caso de o valor não chegar, evitando inadimplência do passivo integral."
    }
  ],

  fontes: [
    { nome: "Agência Brasil — cobertura sobre a liquidação do Banco Master pelo Banco Central", url: "https://agenciabrasil.ebc.com.br/" },
    { nome: "Banco Central do Brasil — comunicados oficiais e fiscalização prudencial", url: "https://www.bcb.gov.br/" },
    { nome: "CPC 00 (R2) — Estrutura Conceitual; CPC 01 (Impairment), CPC 16 (Estoques) e CPC 25 (Provisões)", url: "https://www.cpc.org.br/" }
  ]
};
