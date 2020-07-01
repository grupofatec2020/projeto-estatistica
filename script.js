function getRandomColor() {
  var letters = "0123456789ABCDEF".split("");
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  //  console.log(color);
  return color;
}

function tratamentoDeDados() {
  //recebendo dados do input
  let dadosVar = document.getElementById("dados_variavel").value;
  //dividindo os dados
  // let array_variavel = variavel;
  let array_dados_variavel = dadosVar.split(";").map(Number);
  //alfabeticamente
  array_dados_variavel = quickSort(array_dados_variavel);
  //calcular quantidade de cada item
  const quantidade_dados = array_dados_variavel.reduce((acumulador, atual) => {
    acumulador[atual] = acumulador[atual] ? acumulador[atual] + 1 : 1;
    return acumulador;
  }, {});

  // Array vazia que irá conter {nome: 'nome_digitado', valor: valor_digitado}
  let array_valores = [];
  // contador auxiliar
  // percorrer todos os nomes digitados e adicionar na array "final" que será ordenada alfabeticamente
  let valor_anterior;
  array_dados_variavel.forEach((dados_variavel) => {
    if (dados_variavel != valor_anterior) {
      array_valores.push({
        valor: dados_variavel,
        qtde: quantidade_dados[dados_variavel],
      });
    }
    valor_anterior = dados_variavel;
  });

  let total_dados = [];
  array_valores.forEach((t) => {
    total_dados.push(parseFloat(t.qtde));
  });

  // Somatório total
  let resultado = total_dados.reduce(
    (acumulador, item) => acumulador + item,
    0
  );

  //calculo FA
  //cont aux q
  let k = 0;
  let l = 0;
  // o primeiro valor
  // enquanto percorre, soma quantidade
  array_valores.forEach((element) => {
    element.fi = element.qtde;
    element.fr_porcento = (element.qtde * 100) / resultado;
    //Caso base, caso seja primeira vez no laco o FA eh o valor do item mesmo
    if (k == 0) {
      element.fa = parseFloat(element.qtde);
      //caso seja um item depois do primeiro, soma o valor do FA do anterior com o atual
    } else if (k > 0) {
      //fa anterior q-1                        //valor do item atual
      element.fa =
        parseFloat(array_valores[k - 1].fa) + parseFloat(element.qtde);
    }
    k++;
    if (l == 0) {
      element.fa_porcento = parseFloat(element.fr_porcento);
    } else if (l > 0) {
      element.fa_porcento =
        parseFloat(array_valores[l - 1].fa_porcento) +
        parseFloat(element.fr_porcento);
    }
    l++;
  });

  return array_valores;
}

function tratamentoDeDadosNominal() {
  //recebendo dados do input
  let dadosVar = document.getElementById("dados_variavel").value;
  //dividindo os dados
  // let array_variavel = variavel;
  let array_dados_variavel = dadosVar.split(";");
  //alfabeticamente
  array_dados_variavel = quickSort(array_dados_variavel);
  //calcular quantidade de cada item
  const quantidade_dados = array_dados_variavel.reduce((acumulador, atual) => {
    acumulador[atual] = acumulador[atual] ? acumulador[atual] + 1 : 1;
    return acumulador;
  }, {});

  // Array vazia que irá conter {nome: 'nome_digitado', valor: valor_digitado}
  let array_valores = [];
  // contador auxiliar
  // percorrer todos os nomes digitados e adicionar na array "final" que será ordenada alfabeticamente
  let valor_anterior;
  array_dados_variavel.forEach((dados_variavel) => {
    if (dados_variavel != valor_anterior) {
      array_valores.push({
        valor: dados_variavel,
        qtde: quantidade_dados[dados_variavel],
      });
    }
    valor_anterior = dados_variavel;
  });

  let total_dados = [];
  array_valores.forEach((t) => {
    total_dados.push(parseFloat(t.qtde));
  });

  // Somatório total
  let resultado = total_dados.reduce(
    (acumulador, item) => acumulador + item,
    0
  );

  //calculo FA
  //cont aux q
  let k = 0;
  let l = 0;
  // o primeiro valor
  // enquanto percorre, soma quantidade
  array_valores.forEach((element) => {
    element.fi = element.qtde;
    element.fr_porcento = (element.qtde * 100) / resultado;
    //Caso base, caso seja primeira vez no laco o FA eh o valor do item mesmo
    if (k == 0) {
      element.fa = parseFloat(element.qtde);
      //caso seja um item depois do primeiro, soma o valor do FA do anterior com o atual
    } else if (k > 0) {
      //fa anterior q-1                        //valor do item atual
      element.fa =
        parseFloat(array_valores[k - 1].fa) + parseFloat(element.qtde);
    }
    k++;
    if (l == 0) {
      element.fa_porcento = parseFloat(element.fr_porcento);
    } else if (l > 0) {
      element.fa_porcento =
        parseFloat(array_valores[l - 1].fa_porcento) +
        parseFloat(element.fr_porcento);
    }
    l++;
  });

  return array_valores;
}

function media(valores) {
  // Cálculo de média para variável discreta/continua
  let total_qtde = valores.reduce(
    (acumulador, item) => acumulador + item.qtde,
    0
  );
  let total_valores = valores.reduce(
    (acumulador, item) => acumulador + item.valor * item.qtde,
    0
  );
  let media = total_valores / total_qtde;

  return media;
}

//calculando moda
function moda() {
  let dadosVar = document.getElementById("dados_variavel").value;
  let array_dados_variavel = dadosVar.split(";").map(Number);
  array_dados_variavel = quickSort(array_dados_variavel);
  let entrada = array_dados_variavel;
  let maior = null;
  let ocorrenciasMaior = -1;
  let contagem = 1;
  for (let i = 1; i <= entrada.length; i++) {
    if (i < entrada.length && entrada[i] == entrada[i - contagem]) contagem++;
    else if (contagem > ocorrenciasMaior) {
      maior = entrada[i - 1];
      ocorrenciasMaior = contagem;
    }
  }

  return maior;
}
function mediana() {
  let dadosVar = document.getElementById("dados_variavel").value;
  let array_dados_variavel = dadosVar.split(";").map(Number);
  array_dados_variavel = quickSort(array_dados_variavel);
  let md = array_dados_variavel;
  let valor_mediana = "";
  var posicao = md.length / 2;
  let qtde = md.length;
  let pos_elemento = "";
  //console.log(posicao);
  if (qtde % 2 == 0) {
    if (md[posicao - 1] == md[posicao]) {
      //Se for igual ele já declara que aquela é a mediana
      valor_mediana = md[posicao];
      return valor_mediana;
    } else {
      //Se não for aqui ele mostra o calculo da mediana
      valor_mediana = (md[posicao] + md[posicao - 1]) / 2;
      return valor_mediana;
    }
  } else {
    //Se a posição for impar , ele da o numero da posição direto arredondando a posição com a função pronta math.round, mostrando a posicao do elemento
    pos_elemento = Math.ceil(posicao) - 1;
    //pegar a posicao do elemento e mostrar o valor do elemento
    return md[pos_elemento];
  }
}
function desvioPadraoAmostra(valores, media) {
  // somatorio fi
  let somatorio_fi = valores.reduce(
    (acumulador, item) => acumulador + item.qtde,
    0
  );

  let somatorio_valores = valores.reduce(
    (acumulador, item) => acumulador + (Math.pow((item.valor - media), 2) * item.qtde),
    0
  );
  
  let desvio_padrao = Math.sqrt(somatorio_valores / (somatorio_fi - 1)).toFixed(2);

  return desvio_padrao;
}

function desvioPadraoPopulacao(valores, media) {
  // somatorio fi
  let somatorio_fi = valores.reduce(
    (acumulador, item) => acumulador + item.qtde,
    0
  );

  let somatorio_valores = valores.reduce(
    (acumulador, item) => acumulador + (Math.pow((item.valor - media), 2) * item.qtde),
    0
  );
  
  let desvio_padrao = Math.sqrt(somatorio_valores / somatorio_fi).toFixed(2);

  return desvio_padrao;
}

function coeficienteVariacaoDiscreta(desvio_padrao, media) {
  let cv = Math.round((desvio_padrao  / media) * 100);

  return cv;
}

//criando tabela discreta
function criarTabelaDiscreta() {
  const tipo_desvio = document.getElementById("tipo_desvio").value;
  let corpo = document.querySelector("tbody");
  //limpar tela
  corpo.innerHTML = "";
  let array_valores = tratamentoDeDados();
  let media_discreta = media(array_valores);
  let valor_moda = moda();
  let valor_mediana = mediana();
  let desvio_padrao;
  if (tipo_desvio == 'populacao') { 
    desvio_padrao = desvioPadraoPopulacao(array_valores, media_discreta);
  } else if (tipo_desvio == 'amostra') { 
    desvio_padrao = desvioPadraoAmostra(array_valores, media_discreta);
  }
  coeficiente_variacao = coeficienteVariacaoDiscreta(desvio_padrao, media_discreta);
  //mostrar nome tabela
  let nome_tabela = document.getElementById("nome_tabela");

  nome_tabela.innerHTML = "Quantitativa Discreta";
  //motrar mediana
  texto_mediana.innerHTML = `Mediana: ${valor_mediana} <br>`;
  //motrar media
  texto_media.innerHTML = `Media: ${media_discreta.toFixed(2)} <br>`;
  //mostrar moda
  let texto_moda = document.getElementById("texto_moda");
  texto_moda.innerHTML = `Moda: ${valor_moda.toFixed(2)} <b>`;
    //motrar desvio padrao
  let texto_desvio_padrao = document.getElementById("texto_desvio_padrao");
  texto_desvio_padrao.innerHTML = `Desvio Padrão ${desvio_padrao} <b>`;
  //mostrar coeficiente de varancia
  let texto_coeficiente = document.getElementById("texto_coeficiente_variacao");
  texto_coeficiente.innerHTML = `Coeficiente de Variacao ${coeficiente_variacao.toFixed(2)} <b>`;
  // O que tem aqui é q esse loop cria uma linha <tr>, com algumas colunas (células) <td>
  // que depois dá pra usar aqui abaixo
  // let soma_total = array_valores.reduce((soma_total, array_valores) => soma_total + array_valores, 0);
  //   console.log(soma_total);
  array_valores.forEach((e) => {
    let linha = document.createElement("tr");
    let campoDados = document.createElement("tr");
    let campo_fr_porcento = document.createElement("td");
    let campo_fa = document.createElement("td");
    let campo_fa_porcento = document.createElement("td");
    let campoVariavel = document.createElement("td");
    let texto_fa = document.createTextNode(e.fa);
    let texto_fr_porcento = document.createTextNode(Math.floor(e.fr_porcento));
    let texto_fa_porcento = document.createTextNode(Math.floor(e.fa_porcento));
    let textoVariavel = document.createTextNode(e.valor);
    let texto_fi = document.createTextNode(e.fi);
    campoDados.appendChild(texto_fi);
    campoVariavel.appendChild(textoVariavel);
    campo_fr_porcento.appendChild(texto_fr_porcento);
    campo_fa.appendChild(texto_fa);
    campo_fa_porcento.appendChild(texto_fa_porcento);
    linha.appendChild(campoVariavel);
    linha.appendChild(campoDados);
    linha.appendChild(campo_fr_porcento);
    linha.appendChild(campo_fa);
    linha.appendChild(campo_fa_porcento);
    corpo.appendChild(linha);
  });
}

function criarTabelaNom() {
  let corpo = document.querySelector("tbody");
  //limpar tela
  corpo.innerHTML = "";
  array_valores = tratamentoDeDadosNominal();
  valor_moda = modaOrdinal();
  let valor_mediana = medianaNominal();
  //mostrar mediana na tela
  texto_mediana.innerHTML = `Mediana: ${valor_mediana} <br>`;
  //mostrar media na tela
  texto_media.innerHTML = "Media: Nao tem <br>";
  // nome tabela
  let nome_tabela = document.getElementById("nome_tabela");
  nome_tabela.innerHTML = "Qualitativa Ordinal/Nominal";
  //mostrar moda na tela
  let texto_moda = document.getElementById("texto_moda");
  texto_moda.innerHTML = `Moda: ${valor_moda} <b>`;
  //motrar desvio padrao
  let texto_desvio_padrao = document.getElementById("texto_desvio_padrao");
  texto_desvio_padrao.innerHTML = `Desvio Padrão: Nao tem <b>`;
  //mostrar coeficiente de varancia
  let texto_coeficiente = document.getElementById("texto_coeficiente_variacao");
  texto_coeficiente.innerHTML = `Coeficiente de Variacao: Nao tem <b>`;
  // O que tem aqui é q esse loop cria uma linha <tr>, com algumas colunas (células) <td>
  // que depois dá pra usar aqui abaixo
  array_valores.forEach((e) => {
    let linha = document.createElement("tr");
    let campoDados = document.createElement("tr");
    let campo_fr_porcento = document.createElement("td");
    let campo_fa = document.createElement("td");
    let campo_fa_porcento = document.createElement("td");
    let campoVariavel = document.createElement("td");
    let texto_fa = document.createTextNode(e.fa);
    let texto_fr_porcento = document.createTextNode(Math.floor(e.fr_porcento));
    let texto_fa_porcento = document.createTextNode(Math.floor(e.fa_porcento));
    let textoVariavel = document.createTextNode(e.valor);
    let texto_fi = document.createTextNode(e.fi);
    campoDados.appendChild(texto_fi);
    campoVariavel.appendChild(textoVariavel);
    campo_fr_porcento.appendChild(texto_fr_porcento);
    campo_fa.appendChild(texto_fa);
    campo_fa_porcento.appendChild(texto_fa_porcento);
    linha.appendChild(campoVariavel);
    linha.appendChild(campoDados);
    linha.appendChild(campo_fr_porcento);
    linha.appendChild(campo_fa);
    linha.appendChild(campo_fa_porcento);
    corpo.appendChild(linha);
  });
}

function gerarGraficoDiscreta() {
  array_valores = tratamentoDeDados();
  array_label = [];
  array_data = [];
  colors = [];

  /// talvez gerar as cores aqui tbm
  array_valores.forEach((e) => {
    array_label.push(e.nome);
    array_data.push(e.fr_porcento);
    colors.push(getRandomColor());
  });
  let dadosVar = document.getElementById("dados_variavel").value;
  let nome = document.getElementById("nome_variavel").value;
  let array_dados_variavel = dadosVar.split(";").map(Number);
  array_dados_variavel = quickSort(array_dados_variavel);
  let ctx = document.getElementById("myChart");
  let grafico = new Chart(ctx, {
    // tipo grafico
    type: "bar",
    // data para o grafico
    data: {
      // labels: textoVariavel,
      labels: array_dados_variavel,
      datasets: [
        {
          label: nome,
          backgroundColor: colors,
          borderColor: "rgba(0, 0, 0, 0.1)",
          data: array_data,
          // data: texto_fr_porcento,
        },
      ],
    },
  });
}

function gerarGraficoQualitativaOrdinal() {
  array_valores = tratamentoDeDadosOrdinal();
  array_label = [];
  array_data = [];
  colors = [];

  /// talvez gerar as cores aqui tbm
  array_valores.forEach((e) => {
    array_label.push(e.nome);
    array_data.push(e.fr_porcento);
    colors.push(getRandomColor());
  });

  let dadosVar = document.getElementById("dados_variavel").value;
  let nome = document.getElementById("nome_variavel").value;
  let array_dados_variavel = dadosVar.split(";");
  array_dados_variavel = quickSort(array_dados_variavel);
  let ctx = document.getElementById("myChart");
  let grafico = new Chart(ctx, {
    // tipo de grafico
    type: "pie",
    // data para o grafico
    data: {
      // labels: textoVariavel,
      labels: array_dados_variavel,
      datasets: [
        {
          label: nome,
          backgroundColor: colors,
          borderColor: "rgba(0, 0, 0, 0.1)",
          data: array_data,
          // data: texto_fr_porcento,
        },
      ],
    },
  });
}

function gerarGraficoQualitativaNominal() {
  array_valores = tratamentoDeDadosNominal();
  array_label = [];
  array_data = [];
  colors = [];

  /// talvez gerar as cores aqui tbm
  array_valores.forEach((e) => {
    array_label.push(e.nome);
    array_data.push(e.fr_porcento);
    colors.push(getRandomColor());
  });

  let dadosVar = document.getElementById("dados_variavel").value;
  let nome = document.getElementById("nome_variavel").value;
  let array_dados_variavel = dadosVar.split(";");
  array_dados_variavel = quickSort(array_dados_variavel);
  let ctx = document.getElementById("myChart");
  let grafico = new Chart(ctx, {
    // tipo de grafico
    type: "pie",
    // data para o grafico
    data: {
      // labels: textoVariavel,
      labels: array_dados_variavel,
      datasets: [
        {
          label: nome,
          backgroundColor: colors,
          borderColor: "rgba(0, 0, 0, 0.1)",
          data: array_data,
          // data: texto_fr_porcento,
        },
      ],
    },
  });
}

function tratamentoDeDadosContinua() {
  //organizar em ordem crescente done
  //descobrir a amplitude
  let dadosVar = document.getElementById("dados_variavel").value;
  let array_dados_variavel = dadosVar.split(";").map(Number);
  array_dados_variavel = quickSort(array_dados_variavel);
  console.log(array_dados_variavel);
  let at = array_dados_variavel.slice(-1) - array_dados_variavel[0];
  //quantidade de classes
  let classe = [];
  let qtde_classes = Math.floor(Math.sqrt(array_dados_variavel.length));
  classe[0] = qtde_classes - 1;
  classe[1] = qtde_classes;
  classe[2] = qtde_classes + 1;

  let aux = true;
  let qtde_linha = 0;
  let intervalo_classes = 0;
  while (aux) {
    at++;
    // for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if ((at % classe[j] == 0) && (at / classe[j] > 1)) {
        aux = false;
        qtde_linha = classe[j];
        intervalo_classes = at / classe[j];
        break;
      }
    }
    // }
  }

  let array_final_continua = [];
  // montar tabela com as linhas separando intervalos de classe
  let valor_anterior = (array_dados_variavel[0]  - 1);
  // precisamos navegar a qtde de classes separando pelo valor do intervalo
  for (let i = 0; i < qtde_linha; i++) {
    let limite_classe = valor_anterior + intervalo_classes;

    qtde_itens_intervalo = array_dados_variavel.filter(
      (item) => item >= valor_anterior && item < limite_classe
    );
    array_final_continua.push({
      valor: `${valor_anterior} |----- ${limite_classe}`,
      qtde: qtde_itens_intervalo.length,
      xi: Math.ceil((limite_classe + valor_anterior) / 2),
    });

    valor_anterior = valor_anterior + intervalo_classes;
    // a quantide de itens por intervalor é o FI
  }

  let total_dados = [];
  array_final_continua.forEach((t) => {
    total_dados.push(parseFloat(t.qtde));
  });

  // Somatório total
  let resultado = total_dados.reduce(
    (acumulador, item) => acumulador + item,
    0
  );

  //calculo FA
  //cont aux q
  let k = 0;
  let l = 0;
  // o primeiro valor
  // enquanto percorre, soma quantidade
  array_final_continua.forEach((element) => {
    element.fi = element.qtde;
    element.fr_porcento = (element.qtde * 100) / resultado;
    //Caso base, caso seja primeira vez no laco o FA eh o valor do item mesmo
    if (k == 0) {
      element.fa = parseFloat(element.qtde);
      //caso seja um item depois do primeiro, soma o valor do FA do anterior com o atual
    } else if (k > 0) {
      //fa anterior q-1                        //valor do item atual
      element.fa =
        parseFloat(array_final_continua[k - 1].fa) + parseFloat(element.qtde);
    }
    k++;
    if (l == 0) {
      element.fa_porcento = parseFloat(element.fr_porcento);
    } else if (l > 0) {
      element.fa_porcento =
        parseFloat(array_final_continua[l - 1].fa_porcento) +
        parseFloat(element.fr_porcento);
    }
    l++;
  });

  console.log(array_final_continua);
  return array_final_continua;
}

//criando tabela continua
function criarTabelaContinua() {
  let corpo = document.getElementById("tbody_continua");
  //limpar tela
  corpo.innerHTML = "";
  let array_valores = tratamentoDeDadosContinua();
  let media_continua = mediaContinua(array_valores);
  let valor_moda = moda();
  let valor_mediana = mediana();
  let desvio_padrao = desvioPadraoPopulacaoContinua(array_valores, media_continua);
  let coeficiente_variacao_continua = coeficienteVariacaoDiscreta(desvio_padrao, media_continua);
  console.log(media_continua);
  console.log(desvio_padrao);
  console.log(coeficiente_variacao_continua);
  //motrar desvio padrao
  let texto_desvio_padrao = document.getElementById("texto_desvio_padrao");
  texto_desvio_padrao.innerHTML = `Desvio Padrão ${desvio_padrao} <b>`;
  //mostrar coeficiente de varancia
  let texto_coeficiente = document.getElementById("texto_coeficiente_variacao");
  texto_coeficiente.innerHTML = `Coeficiente de Variacao ${coeficiente_variacao_continua.toFixed(2)} <b>`;
  //mostrar nome tabela
  let nome_tabela = document.getElementById("nome_tabela");

  nome_tabela.innerHTML = "Quantitativa Continua";
  //motrar mediana
  texto_mediana.innerHTML = `Mediana: ${valor_mediana} <br>`;
  //motrar media
  texto_media.innerHTML = `Media: ${media_continua.toFixed(2)} <br>`;
  //mostrar moda
  let texto_moda = document.getElementById("texto_moda");
  texto_moda.innerHTML = `Moda: ${valor_moda.toFixed(2)} <b>`;
  // O que tem aqui é q esse loop cria uma linha <tr>, com algumas colunas (células) <td>
  // que depois dá pra usar aqui abaixo
  // let soma_total = array_valores.reduce((soma_total, array_valores) => soma_total + array_valores, 0);
  //   console.log(soma_total);
  array_valores.forEach((e) => {
    let linha = document.createElement("tr");
    let campoDados = document.createElement("tr");
    let campo_fr_porcento = document.createElement("td");
    let campo_fa = document.createElement("td");
    let campo_fa_porcento = document.createElement("td");
    let campoVariavel = document.createElement("td");
    let campo_xi = document.createElement("td");
    let texto_xi = document.createTextNode(e.xi);
    let texto_fa = document.createTextNode(e.fa);
    let texto_fr_porcento = document.createTextNode(Math.floor(e.fr_porcento));
    let texto_fa_porcento = document.createTextNode(Math.floor(e.fa_porcento));
    let textoVariavel = document.createTextNode(e.valor);
    let texto_fi = document.createTextNode(e.fi);
    campoDados.appendChild(texto_fi);
    campoVariavel.appendChild(textoVariavel);
    campo_fr_porcento.appendChild(texto_fr_porcento);
    campo_fa.appendChild(texto_fa);
    campo_fa_porcento.appendChild(texto_fa_porcento);
    campo_xi.appendChild(texto_xi);
    linha.appendChild(campoVariavel);
    linha.appendChild(campoDados);
    linha.appendChild(campo_fr_porcento);
    linha.appendChild(campo_fa);
    linha.appendChild(campo_fa_porcento);
    linha.appendChild(campo_xi);
    corpo.appendChild(linha);
  });
}

function mediaContinua(valores) {
  let total_qtde = valores.reduce(
    (acumulador, item) => acumulador + item.qtde,
    0
  );

  let total_valores = valores.reduce(
    (acumulador, item) => acumulador + (item.xi * item.qtde),
    0
  );

  let media = total_valores / total_qtde;

  return media;
}

function desvioPadraoPopulacaoContinua(valores, media) {
  // somatorio fi
  let somatorio_fi = valores.reduce(
    (acumulador, item) => acumulador + item.qtde,
    0
  );

  let somatorio_valores = valores.reduce(
    (acumulador, item) => acumulador + (Math.pow((item.xi - media), 2) * item.qtde),
    0
  );
  
  let desvio_padrao = Math.sqrt(somatorio_valores / somatorio_fi).toFixed(2);

  return desvio_padrao;
}

function graficoContinua(){
  let array_valores = tratamentoDeDadosContinua();
  let colors = [];
  let array_label = [];
  console.log(array_valores)

  array_valores.forEach((e) => {
    colors.push(getRandomColor());
  })
  var ctx = document.getElementById("myChart").getContext('2d');
 var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: array_label,
    datasets: [{
      label: 'Group A',
      data: array_valores.xi,
      backgroundColor: colors,
    }]
  },
  options: {
    scales: {
      xAxes: [{
        display: false,
        barPercentage: 1.30,
      }, {
        display: true,
      }],
      yAxes: [{
        ticks: {
          beginAtZero:true
        }
      }]
    }
  }
})
}

function tratamentoDeDadosOrdinal() {
  //recebendo dados do input
  let dadosVar = document.getElementById("dados_variavel").value;
  //dividindo os dados
  // let array_variavel = variavel;
  let array_dados_variavel = dadosVar.split(";");
  console.log(array_dados_variavel);
  //alfabeticamente
  //array_dados_variavel = quickSort(array_dados_variavel);
  ///console.log(array_dados_variavel);
  //calcular quantidade de cada item
  const quantidade_dados = array_dados_variavel.reduce((acumulador, atual) => {
    acumulador[atual] = acumulador[atual] ? acumulador[atual] + 1 : 1;
    return acumulador;
  }, {});

  // Array vazia que irá conter {nome: 'nome_digitado', valor: valor_digitado}
  let array_valores = [];
  // contador auxiliar
  // percorrer todos os nomes digitados e adicionar na array "final" que será ordenada alfabeticamente
  let valor_anterior;
  array_dados_variavel.forEach((dados_variavel) => {
    if (dados_variavel != valor_anterior) {
      array_valores.push({
        valor: dados_variavel,
        qtde: quantidade_dados[dados_variavel],
      });
    }
    valor_anterior = dados_variavel;
  });

  let total_dados = [];
  array_valores.forEach((t) => {
    total_dados.push(parseFloat(t.qtde));
  });

  // Somatório total
  let resultado = total_dados.reduce(
    (acumulador, item) => acumulador + item,
    0
  );

  //calculo FA
  //cont aux q
  let k = 0;
  let l = 0;
  // o primeiro valor
  // enquanto percorre, soma quantidade
  array_valores.forEach((element) => {
    element.fi = element.qtde;
    element.fr_porcento = (element.qtde * 100) / resultado;
    //Caso base, caso seja primeira vez no laco o FA eh o valor do item mesmo
    if (k == 0) {
      element.fa = parseFloat(element.qtde);
      //caso seja um item depois do primeiro, soma o valor do FA do anterior com o atual
    } else if (k > 0) {
      //fa anterior q-1                        //valor do item atual
      element.fa =
        parseFloat(array_valores[k - 1].fa) + parseFloat(element.qtde);
    }
    k++;
    if (l == 0) {
      element.fa_porcento = parseFloat(element.fr_porcento);
    } else if (l > 0) {
      element.fa_porcento =
        parseFloat(array_valores[l - 1].fa_porcento) +
        parseFloat(element.fr_porcento);
    }
    l++;
  });

  return array_valores;
}
function modaOrdinal() {
  let dadosVar = document.getElementById("dados_variavel").value;
  let array_dados_variavel = dadosVar.split(";");
  array_dados_variavel = quickSort(array_dados_variavel);
  let entrada = array_dados_variavel;
  let maior = null;
  let ocorrenciasMaior = -1;
  let contagem = 1;
  for (let i = 1; i <= entrada.length; i++) {
    if (i < entrada.length && entrada[i] == entrada[i - contagem]) contagem++;
    else if (contagem > ocorrenciasMaior) {
      maior = entrada[i - 1];
      ocorrenciasMaior = contagem;
    }
  }

  return maior;
}

function medianaNominal() {
  let dadosVar = document.getElementById("dados_variavel").value;
  let array_dados_variavel = dadosVar.split(";");
  array_dados_variavel = quickSort(array_dados_variavel);
  let md = array_dados_variavel;
  let valor_mediana = "";
  var posicao = md.length / 2;
  let qtde = md.length;
  let pos_elemento = "";
  //console.log(posicao);
  if (qtde % 2 == 0) {
    if (md[posicao - 1] == md[posicao]) {
      //Se for igual ele já declara que aquela é a mediana
      valor_mediana = md[posicao];
      return valor_mediana;
    } else {
      //Se não for aqui ele mostra o calculo da mediana
      valor_mediana = (md[posicao] + md[posicao - 1]) / 2;
      return valor_mediana;
    }
  } else {
    //Se a posição for impar , ele da o numero da posição direto arredondando a posição com a função pronta math.round, mostrando a posicao do elemento
    pos_elemento = Math.ceil(posicao) - 1;
    //pegar a posicao do elemento e mostrar o valor do elemento
    return md[pos_elemento];
  }
}

function criarTabelaOrd() {
  let corpo = document.querySelector("tbody");
  //limpar tela
  corpo.innerHTML = "";
  array_valores = tratamentoDeDadosOrdinal();
  valor_moda = modaOrdinal();
  let valor_mediana = medianaNominal();
  //mostrar mediana na tela
  texto_mediana.innerHTML = `Mediana: ${valor_mediana} <br>`;
  //mostrar media na tela
  texto_media.innerHTML = "Media: Nao tem <br>";
  // nome tabela
  let nome_tabela = document.getElementById("nome_tabela");
  nome_tabela.innerHTML = "Qualitativa Ordinal/Nominal";
  //mostrar moda na tela
  let texto_moda = document.getElementById("texto_moda");
  texto_moda.innerHTML = `Moda: ${valor_moda} <b>`;
  //motrar desvio padrao
  let texto_desvio_padrao = document.getElementById("texto_desvio_padrao");
  texto_desvio_padrao.innerHTML = `Desvio Padrão: Nao tem <b>`;
  //mostrar coeficiente de varancia
  let texto_coeficiente = document.getElementById("texto_coeficiente_variacao");
  texto_coeficiente.innerHTML = `Coeficiente de Variacao: Nao tem <b>`;
  // O que tem aqui é q esse loop cria uma linha <tr>, com algumas colunas (células) <td>
  // que depois dá pra usar aqui abaixo
  array_valores.forEach((e) => {
    let linha = document.createElement("tr");
    let campoDados = document.createElement("tr");
    let campo_fr_porcento = document.createElement("td");
    let campo_fa = document.createElement("td");
    let campo_fa_porcento = document.createElement("td");
    let campoVariavel = document.createElement("td");
    let texto_fa = document.createTextNode(e.fa);
    let texto_fr_porcento = document.createTextNode(Math.floor(e.fr_porcento));
    let texto_fa_porcento = document.createTextNode(Math.floor(e.fa_porcento));
    let textoVariavel = document.createTextNode(e.valor);
    let texto_fi = document.createTextNode(e.fi);
    campoDados.appendChild(texto_fi);
    campoVariavel.appendChild(textoVariavel);
    campo_fr_porcento.appendChild(texto_fr_porcento);
    campo_fa.appendChild(texto_fa);
    campo_fa_porcento.appendChild(texto_fa_porcento);
    linha.appendChild(campoVariavel);
    linha.appendChild(campoDados);
    linha.appendChild(campo_fr_porcento);
    linha.appendChild(campo_fa);
    linha.appendChild(campo_fa_porcento);
    corpo.appendChild(linha);
  });
}

// Funções para ordenação com quick-sort
function troca(vet, i, j) {
   let aux = vet[i];
   vet[i] = vet[j];
   vet[j] = aux;
}


function quickSort(vet, fnComp, posIni = 0, posFim = vet.length - 1) {
   if(posFim > posIni) {
      const posPivot = posFim;
      let posDiv = posIni - 1;
      for(let i = posIni; i < posFim; i++) {
         if(vet[i] < vet[posPivot] && i != posDiv) {
         
            posDiv++;
            troca(vet, i, posDiv);
         }
      }
      posDiv++;
      troca(vet, posDiv, posPivot);

      quickSort(vet, fnComp, posIni, posDiv - 1);

      quickSort(vet, fnComp, posDiv + 1, posFim);
   }
   return vet;
}

function lerCSV() {
  let fileInput = document.getElementById("arquivo");
  let string_valores = "";
  Papa.parse(fileInput.files[0], {
    header: false,
    complete: function (results) {
      results.data[0].forEach((item) => {
        string_valores += item + ";";
      });
      document.getElementById("dados_variavel").value = string_valores;
    },
  });
}