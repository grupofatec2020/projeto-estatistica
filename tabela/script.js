function tratamentoDeDados() {
  //recebendo dados do input
  let dadosVar = document.getElementById("dados_variavel").value;
  //dividindo os dados
  // let array_variavel = variavel;
  let array_dados_variavel = dadosVar.split(";").map(Number);
  //alfabeticamente
  array_dados_variavel.sort((a, b) => a - b);
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
  array_dados_variavel.forEach(dados_variavel => {
    // como na teoria vão existir a mesma quantidade de dados, podemos usar o contador J como índice na outra array tbm
    // quebrar em linha só pra ficar mais fácil de ler
    //o array valores nao ta pegando os dados, nao eh? que eh aqui embaixo?
    // parece q é esse o problema mesmo
    
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
  let resultado = total_dados.reduce((acumulador, item) => acumulador + item, 0);
  // console.log(resultado);
  //calculo FA
  //cont aux q
  let k = 0;
  let l = 0;
  // o primeiro valor
  // enquanto percorre, soma quantidade
  array_valores.forEach(element => {
    element.fi = element.qtde;
    element.fr_porcento = element.qtde * 100 / resultado;
    //Caso base, caso seja primeira vez no laco o FA eh o valor do item mesmo
    if (k == 0){
      element.fa = parseFloat(element.qtde);
      //caso seja um item depois do primeiro, soma o valor do FA do anterior com o atual
    } else if (k > 0) {
                //fa anterior q-1                        //valor do item atual
      element.fa = parseFloat(array_valores[k-1].fa) + parseFloat(element.qtde);
    }
    k++
    if (l == 0){
      element.fa_porcento = parseFloat(element.fr_porcento);
    } else if (l > 0) {
      element.fa_porcento = parseFloat(array_valores[l-1].fa_porcento) + parseFloat(element.fr_porcento);
    }
    l++;
  });

 return array_valores;
}

function media(valores) {
  // Cálculo de média para variável discreta/continua
  let total_qtde = valores.reduce((acumulador, item) => acumulador + item.qtde, 0);
  let total_valores = valores.reduce((acumulador, item) => acumulador + (item.valor * item.qtde), 0);
  let media = total_valores / total_qtde;

  return media;
}
function moda() {
  let dadosVar = document.getElementById("dados_variavel").value;
  let array_dados_variavel = dadosVar.split(";").map(Number);
  array_dados_variavel.sort((a, b) => a - b);
  let entrada = array_dados_variavel;
  
var maior = null;
var ocorrenciasMaior = -1;

var contagem = 1;
for ( var i = 1 ; i <= entrada.length ; i++ ) {
  if ( i < entrada.length && entrada[i] == entrada[i-contagem] )
    contagem++;
  
  else if ( contagem > ocorrenciasMaior ) {
    maior = entrada[i-1];
    ocorrenciasMaior = contagem;
  }
  //console.log(maior);
 
}
return maior;
}

function criarTabelaDiscreta() {
  let corpo = document.querySelector("tbody");
  //limpar tela
  corpo.innerHTML = "";
  array_valores = tratamentoDeDados();
  media_discreta = media(array_valores);
  valor_moda = moda();
  //mostrar nome tabela
  let nome_tabela = document.getElementById("nome_tabela"); 

  nome_tabela.innerHTML = ("Quantitativa Discreta");
  
  //motrar media
  texto_media.innerHTML = `Media: ${media_discreta.toFixed(1)} <br>`;
  // O que tem aqui é q esse loop cria uma linha <tr>, com algumas colunas (células) <td>
  // que depois dá pra usar aqui abaixo
  array_valores.forEach(e => {
    let linha = document.createElement("tr");
    let campoDados = document.createElement("tr");
    let campo_fr_porcento = document.createElement("td");
    let campo_fa = document.createElement("td");
    let campo_fa_porcento = document.createElement("td");
    let campoVariavel = document.createElement("td");
    let texto_fa = document.createTextNode(e.fa);
    let texto_fr_porcento = document.createTextNode(e.fr_porcento);
    let texto_fa_porcento = document.createTextNode(e.fa_porcento);
    let textoVariavel = document.createTextNode(e.valor);
    // Está parecendo que não vai ter muita questão de validação dos dados,
    // então vamos confiar que o usuário vai informar o mesmo número de nomes de variáveis e de valores
    // partindo dessa premissa básica, vai ter o mesma quantidade de nomes e valores, então na teoria
    // o nome na posição zero do array_variavel vai ser referente ao valor na posição zero do array_dados_variavel
    // certo até aqui? ???? sim
    // Vamos precisar de uma variável de apoio (variável contadora, por convenção, geralmente é i), declarando fora do laço forEach
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

  // mostrar a media na tela depois da tabela criada
  // let media = document.ggetElementById("media_discreta");
  // media.text = media;
}

function criarTabelaOrdNom() {
  let corpo = document.querySelector("tbody");
  //limpar tela
  corpo.innerHTML = "";
  array_valores = tratamentoDeDados();
  //mostrar media na tela
  texto_media.innerHTML = "Media: Nao tem <br>";
  // nome tabela
  let nome_tabela = document.getElementById("nome_tabela"); 
  nome_tabela.innerHTML = ("Qualitativa Ordinal/Nominal");

  // O que tem aqui é q esse loop cria uma linha <tr>, com algumas colunas (células) <td>
  // que depois dá pra usar aqui abaixo
  array_valores.forEach(e => {
    let linha = document.createElement("tr");
    let campoDados = document.createElement("tr");
    let campo_fr_porcento = document.createElement("td");
    let campo_fa = document.createElement("td");
    let campo_fa_porcento = document.createElement("td");
    let campoVariavel = document.createElement("td");
    let texto_fa = document.createTextNode(e.fa);
    let texto_fr_porcento = document.createTextNode(e.fr_porcento);
    let texto_fa_porcento = document.createTextNode(e.fa_porcento);
    let textoVariavel = document.createTextNode(e.valor);
    // Está parecendo que não vai ter muita questão de validação dos dados,
    // então vamos confiar que o usuário vai informar o mesmo número de nomes de variáveis e de valores
    // partindo dessa premissa básica, vai ter o mesma quantidade de nomes e valores, então na teoria
    // o nome na posição zero do array_variavel vai ser referente ao valor na posição zero do array_dados_variavel
    // certo até aqui? ???? sim
    // Vamos precisar de uma variável de apoio (variável contadora, por convenção, geralmente é i), declarando fora do laço forEach
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

  // mostrar a media na tela depois da tabela criada
  // let media = document.ggetElementById("media_discreta");
  // media.text = media;
}

function gerarGraficoDiscreta() {
    array_valores = tratamentoDeDados();
    array_label = [];
    array_data = [];

    /// talvez gerar as cores aqui tbm
    array_valores.forEach((e) => {
        array_label.push(e.nome);
        array_data.push(e.fr_porcento);
    });

  let ctx = document.getElementById('myChart');
  let grafico = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',
    // The data for our dataset
      data: {
          // labels: textoVariavel,
          labels: array_label,
          datasets: [{
              label: 'Grafico',
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(55, 299, 132)',
                'rgb(25, 199, 532)',
            ],
              borderColor: 'rgba(0, 0, 0, 0.1)',
              data: array_data
              // data: texto_fr_porcento,
            }]
        },
  });
}
  function gerarGraficoQualitativa() {
    array_valores = tratamentoDeDados();
    array_label = [];
    array_data = [];

    /// talvez gerar as cores aqui tbm
    array_valores.forEach((e) => {
        array_label.push(e.nome);
        array_data.push(e.fr_porcento);
    });

  let ctx = document.getElementById('myChart');
  let grafico = new Chart(ctx, {
    // The type of chart we want to create
    type: 'pie',
    // The data for our dataset
      data: {
          // labels: textoVariavel,
          labels: array_label,
          datasets: [{
              label: 'Grafico',
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(55, 299, 132)',
                'rgb(25, 199, 532)',
            ],
              borderColor: 'rgba(0, 0, 0, 0.1)',
              data: array_data
              // data: texto_fr_porcento,
            }]
        },
  });

}
