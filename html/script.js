let servicos = [];
let imprevistos = [];
let metaMensal = null;

// Função para formatar números no padrão brasileiro
function formatarBR(valor) {
  return valor.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function pedirNumeroPositivo(mensagem) {
  while (true) {
    const entrada = prompt(`${mensagem}\n(Use vírgula para centavos e ponto para milhar, ex: 1.234,56)`);
    if (entrada === null) return null; 

    // Substitui o ponto de milhar e transforma vírgula em ponto decimal
    const valor = entrada.trim().replace(/\./g, '').replace(',', '.');

    if (/^\d+(\.\d+)?$/.test(valor)) return parseFloat(valor);

    alert("Por favor, digite apenas números positivos no formato correto!\nEx: 1.234,56");
  }
}


// Carregar dados offline
window.onload = () => {
  const dadosServicos = localStorage.getItem("servicos");
  const dadosImprevistos = localStorage.getItem("imprevistos");
  const metaSalario = localStorage.getItem("metaMensal");
  if(metaSalario) metaMensal = parseFloat(metaSalario);

  if(dadosServicos || dadosImprevistos){
    if(confirm("Deseja carregar os últimos dados salvos?")){
      if(dadosServicos) servicos = JSON.parse(dadosServicos);
      if(dadosImprevistos) imprevistos = JSON.parse(dadosImprevistos);
      atualizarTela();
    } else {
      localStorage.removeItem("servicos");
      localStorage.removeItem("imprevistos");
    }
  }
};

// Definir meta mensal
function definirMeta() {
  const valor = pedirNumeroPositivo("Qual é a sua meta salarial mensal?");
  if(valor !== null){
    metaMensal = valor;
    localStorage.setItem("metaMensal", metaMensal);
    atualizarTela();
  }
}

// Registrar serviço
function registrarServico() {
  const nomeCliente = prompt("Qual é o NOME do cliente?");
  if (!nomeCliente || nomeCliente.trim() === "") return;

  const produto = prompt("Qual é o PRODUTO?");
  if (!produto || produto.trim() === "") return;

  const descricao = `Cliente: ${nomeCliente} - Produto: ${produto}`;

  const servico = {
    descricao,
    faturamento: null,
    custosArray: [],
    custos: 0,
    lucro: null
  };

  servicos.push(servico);
  atualizarTela();
  adicionarCustos(servicos.length - 1);
}

// Adicionar custos
function adicionarCustos(index){
  const servico = servicos[index];
  const limite = 50 - servico.custosArray.length;
  if(limite <= 0){
    alert("Limite de 50 custos atingido!");
    return;
  }

  const desc = prompt(`Descrição do custo ${servico.custosArray.length+1}:`);
  if(!desc || desc.trim() === "") return;

  const valor = pedirNumeroPositivo(`Valor do custo ${servico.custosArray.length+1}:`);
  if(valor === null) return;

  servico.custosArray.push({descricao: desc, valor});
  servico.custos = servico.custosArray.reduce((a,b)=>a+b.valor,0);
  if(servico.faturamento !== null) servico.lucro = servico.faturamento - servico.custos;

  atualizarTela();
}

// Inserir faturamento
function inserirFaturamento(index){
  const fat = pedirNumeroPositivo("Digite o faturamento real:");
  if(fat === null) return;

  const servico = servicos[index];
  servico.faturamento = fat;
  servico.lucro = fat - servico.custos;
  atualizarTela();
}

// Adicionar imprevisto
function adicionarImprevisto(){
  const desc = prompt("Descrição do imprevisto:");
  if(!desc || desc.trim() === "") return;

  const valor = pedirNumeroPositivo("Valor do imprevisto:");
  if(valor === null) return;

  imprevistos.push({descricao: desc, valor});
  atualizarTela();
}

// Exclusões
function excluirServico(index){
  if(confirm("Deseja excluir este serviço?")){
    servicos.splice(index,1);
    atualizarTela();
  }
}

function excluirImprevisto(index){
  if(confirm("Deseja excluir este imprevisto?")){
    imprevistos.splice(index,1);
    atualizarTela();
  }
}

function excluirCusto(servicoIndex, custoIndex) {
  if (confirm("Deseja excluir este custo?")) {
    const s = servicos[servicoIndex];
    s.custosArray.splice(custoIndex, 1);
    s.custos = s.custosArray.reduce((a, b) => a + b.valor, 0);
    if (s.faturamento !== null) s.lucro = s.faturamento - s.custos;
    atualizarTela();
  }
}

function excluirFaturamento(servicoIndex) {
  if (confirm("Deseja excluir o faturamento deste serviço?")) {
    const s = servicos[servicoIndex];
    s.faturamento = null;
    s.lucro = null;
    atualizarTela();
  }
}

// Atualiza tela
function atualizarTela() {
  const lista = document.getElementById("lista-servicos");
  lista.innerHTML = "";
  const fragment = document.createDocumentFragment();

  let totalFat = 0, totalCustos = 0;

  servicos.forEach((s, i) => {
    totalCustos += s.custos;
    if (s.faturamento) totalFat += s.faturamento;

    const card = document.createElement("div");
    card.className = "card";

    const custosDetalhe = s.custosArray.map((c, idx) =>
      `<div class="linha">
        <span>Custo ${idx + 1}: ${c.descricao}</span>
        <span>R$ ${formatarBR(c.valor)}</span>
        <button class="btn-excluir" onclick="excluirCusto(${i}, ${idx})">Excluir</button>
      </div>`).join("");

    const faturamentoHTML = s.faturamento === null
      ? `<button class="btn-fat" onclick="inserirFaturamento(${i})">Adicionar Faturamento</button>`
      : `<div class="linha">
           <span>Faturamento</span>
           <span>R$ ${formatarBR(s.faturamento)}</span>
           <button class="btn-excluir" onclick="excluirFaturamento(${i})">Excluir</button>
         </div>
         <div class="linha">
           <span>Lucro</span>
           <span>R$ ${formatarBR(s.lucro ?? 0)}</span>
         </div>`;

    card.innerHTML = `
      <h4>Serviço ${i + 1} - ${s.descricao}</h4>
      ${custosDetalhe}
      <div class="linha">
        <span>Total Custos</span>
        <span>R$ ${formatarBR(s.custos)}</span>
      </div>
      ${faturamentoHTML}
      ${s.custosArray.length < 50 ? `<button class="btn-fat" onclick="adicionarCustos(${i})">Adicionar mais custos</button>` : ""}
      <button class="btn-excluir" onclick="excluirServico(${i})">Excluir Serviço</button>
    `;
    fragment.appendChild(card);
  });

  if (imprevistos.length) {
    const cardImp = document.createElement("div");
    cardImp.className = "card";
    cardImp.innerHTML = "<h3>Imprevistos do Dia</h3>" + imprevistos.map((imp, idx) =>
      `<div class="linha">
        <span>${idx + 1}: ${imp.descricao} - R$ ${formatarBR(imp.valor)}</span>
        <button class="btn-excluir" onclick="excluirImprevisto(${idx})">Excluir</button>
      </div>`).join("");
    fragment.appendChild(cardImp);
  }

  lista.appendChild(fragment);

  const totalImprevistos = imprevistos.reduce((a, b) => a + b.valor, 0);
  const totalCustosDia = totalCustos + totalImprevistos;
  const totalLucro = totalFat - totalCustosDia;

  document.getElementById("fat-dia").textContent = "R$ " + formatarBR(totalFat);
  document.getElementById("custo-dia").textContent = "R$ " + formatarBR(totalCustosDia);
  document.getElementById("lucro-dia").textContent = "R$ " + formatarBR(totalLucro);

  const maxValor = Math.max(totalFat, totalCustosDia, totalLucro, 1);
  document.getElementById("barra-fat").style.width = `${(totalFat / maxValor) * 100}%`;
  document.getElementById("barra-fat").style.backgroundColor = "#3b6ed5";
  document.getElementById("barra-custos").style.width = `${(totalCustosDia / maxValor) * 100}%`;
  document.getElementById("barra-custos").style.backgroundColor = "#dc3545";
  document.getElementById("barra-lucro").style.width = `${(totalLucro / maxValor) * 100}%`;
  document.getElementById("barra-lucro").style.backgroundColor = "#28a745";

  const alerta = document.getElementById("alerta-gastos");
  if(metaMensal !== null){
    const faltante = metaMensal - totalLucro;
    if(faltante > 0){
      let valorUltimoServico = servicos.length ? (servicos[servicos.length-1].lucro || 0) : 0;
      let servicosNecessarios = valorUltimoServico ? Math.ceil(faltante / valorUltimoServico) : "-";
      alerta.textContent = `💸 Meta: R$ ${formatarBR(metaMensal)}. Faltam R$ ${formatarBR(faltante)} (${servicosNecessarios} serviços iguais ao último).`;
      alerta.style.display = "block";
    } else {
      alerta.textContent = "🎉 Meta alcançada!";
      alerta.style.display = "block";
    }
  } else {
    alerta.style.display = "none";
  }

  localStorage.setItem("servicos", JSON.stringify(servicos));
  localStorage.setItem("imprevistos", JSON.stringify(imprevistos));
}

// Baixar PDF
function baixarPDF() {
  if (typeof window.jspdf === "undefined") {
    alert("Erro: jsPDF não foi carregado!");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Relatório - Finanças do Dia", 10, 15);

  doc.setFontSize(12);
  let y = 30;

  const faturamento = document.getElementById("fat-dia").textContent;
  const custos = document.getElementById("custo-dia").textContent;
  const lucro = document.getElementById("lucro-dia").textContent;

  doc.text(`Faturamento: ${faturamento}`, 10, y); y += 10;
  doc.text(`Custos: ${custos}`, 10, y); y += 10;
  doc.text(`Lucro: ${lucro}`, 10, y); y += 15;

  doc.setFontSize(14);
  doc.text("Serviços", 10, y); y += 10;

  servicos.forEach((s, i) => {
    doc.setFontSize(12);
    doc.text(`${i + 1}. ${s.descricao}`, 10, y); y += 7;
    doc.text(`   Custos: R$ ${formatarBR(s.custos)}`, 10, y); y += 7;

    if (s.faturamento !== null) {
      doc.text(`   Faturamento: R$ ${formatarBR(s.faturamento)}`, 10, y); y += 7;
      doc.text(`   Lucro: R$ ${formatarBR(s.lucro ?? 0)}`, 10, y); y += 7;
    }

    y += 5;
    if (y > 270) { doc.addPage(); y = 20; }
  });

  if (imprevistos.length > 0) {
    doc.setFontSize(14);
    doc.text("Imprevistos", 10, y); y += 10;

    doc.setFontSize(12);
    imprevistos.forEach((imp, idx) => {
      doc.text(`${idx + 1}. ${imp.descricao} - R$ ${formatarBR(imp.valor)}`, 10, y);
      y += 7;
      if (y > 270) { doc.addPage(); y = 20; }
    });
  }

  doc.save("financas.pdf");
}
