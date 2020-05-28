function getRandomColor() {
  var letters = "0123456789ABCDEF".split("");
  var color = "#";
  for (var i = 0; i < 6; i++ ) {
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

//calculando moda
function moda() {
  let dadosVar = document.getElementById("dados_variavel").value;
  let array_dados_variavel = dadosVar.split(";").map(Number);
  array_dados_variavel.sort((a, b) => a - b);
  let entrada = array_dados_variavel;
  let maior = null;
  let ocorrenciasMaior = -1;
  let contagem = 1;
  for ( let i = 1 ; i <= entrada.length ; i++ ) {
    if ( i < entrada.length && entrada[i] == entrada[i-contagem] )
      contagem++;
    
    else if ( contagem > ocorrenciasMaior ) {
      maior = entrada[i-1];
      ocorrenciasMaior = contagem;
    }
 
  }

  return maior;
}
function mediana(){
  let dadosVar = document.getElementById("dados_variavel").value;
  let array_dados_variavel = dadosVar.split(";").map(Number);
  array_dados_variavel.sort((a, b) => a - b);
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
        return(valor_mediana)
    } else {
        //Se não for aqui ele mostra o calculo da mediana
        valor_mediana = (md[posicao] + md[posicao - 1]) / 2;
        return(valor_mediana)
    }
} else {
    //Se a posição for impar , ele da o numero da posição direto arredondando a posição com a função pronta math.round, mostrando a posicao do elemento
    pos_elemento = Math.ceil(posicao) - 1;
    //em qual posicao do array o elemente se encontra
    //pos_elemento = valor_mediana - 1;
    //pegar a posicao do elemento e mostrar o valor do elemento
    //console.log(md[pos_elemento])
    //console.log(pos_elemento);
    return(md[pos_elemento]);
 }
}
//criando tabela discreta
function criarTabelaDiscreta() {
  let corpo = document.querySelector("tbody");
  //limpar tela
  corpo.innerHTML = "";
  array_valores = tratamentoDeDados();
  media_discreta = media(array_valores);
  valor_moda = moda();
  valor_mediana = mediana();
  //mostrar nome tabela
  let nome_tabela = document.getElementById("nome_tabela"); 

  nome_tabela.innerHTML = ("Quantitativa Discreta");
  //motrar mediana
  texto_mediana.innerHTML = `Mediana: ${valor_mediana} <br>`;
  //motrar media
  texto_media.innerHTML = `Media: ${media_discreta.toFixed(2)} <br>`;
  //mostrar moda
  let texto_moda = document.getElementById("texto_moda");
  texto_moda.innerHTML = `Moda: ${valor_moda.toFixed(2)} <b>`;
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

function criarTabelaOrdNom() {
  let corpo = document.querySelector("tbody");
  //limpar tela
  corpo.innerHTML = "";
  array_valores = tratamentoDeDados();
  valor_moda = moda();
  //mostrar media na tela
  texto_media.innerHTML = "Media: Nao tem <br>";
  // nome tabela
  let nome_tabela = document.getElementById("nome_tabela"); 
  nome_tabela.innerHTML = ("Qualitativa Ordinal/Nominal");
  //mostrar moda na tela
  let texto_moda = document.getElementById("texto_moda");
  texto_moda.innerHTML = `Moda: ${valor_moda.toFixed(2)} <b>`;
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

// function continua() {
// let min = Math.min(...array_valores)
//         let max = Math.max(...array_valores)
//         let at = max - min

//         // CLASSES/LINHAS
//         let cl = Math.floor(Math.sqrt(total))
//         let vetClass = [cl - 1, cl, cl + 1]

//         // INTERVALO DE CLASSES
//         for (let i = at + 1; i != 0; i++) {
//             if (i % vetClass[0] == 0) {
//                 at = i;
//                 cl = vetClass[0];
//                 break;
//             } else if (i % vetClass[1] == 0) {
//                 at = i;
//                 cl = vetClass[1];
//                 break;
//             } else if (i % vetClass[2] == 0) {
//                 at = i;
//                 cl = vetClass[2];
//                 break;
//             }
//         }
//         let ic = (at / cl);
//       }
//     console.log(at);

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
  array_dados_variavel.sort((a, b) => a - b);
  let ctx = document.getElementById('myChart');
  let grafico = new Chart(ctx, {
    // tipo grafico
    type: 'bar',
    // data para o grafico
      data: {
          // labels: textoVariavel,
          labels: array_dados_variavel,
          datasets: [{
              label: nome,
              backgroundColor: colors,
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
  array_dados_variavel.sort((a, b) => a - b);
  let ctx = document.getElementById('myChart');
  let grafico = new Chart(ctx, {
    // tipo de grafico
    type: 'pie',
    // data para o grafico
      data: {
          // labels: textoVariavel,
          labels: array_dados_variavel,
          datasets: [{
              label: nome,
              backgroundColor: colors,
              borderColor: 'rgba(0, 0, 0, 0.1)',
              data: array_data
              // data: texto_fr_porcento,
            }]
        },
  });

}
