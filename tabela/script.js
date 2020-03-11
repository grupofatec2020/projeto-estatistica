function criarTabela(){

  //recebendo dados do input
  let variavel = document.getElementById("nome_variavel").value;
  let dadosVar = document.getElementById("dados_variavel").value;
  //dividindo os dados
  let array_variavel = variavel.split(";");
  let array_dados_variavel = dadosVar.split(";");

  // Array vazia que irá conter {nome: 'nome_digitado', valor: valor_digitado}
  let array_nomes_valores = [];
  // contador auxiliar
  let j = 0;
  // percorrer todos os nomes digitados e adicionar na array "final" que será ordenada alfabeticamente
  array_variavel.forEach(nome_variavel => {
    array_nomes_valores.push({nome: nome_variavel, valor: array_dados_variavel[j]})
    j = j + 1;
  });
  //organizar alfabeticamente
  array_nomes_valores.sort((a, b) => {
    if (a.nome > b.nome){
      return 1
    }
    else {
      return -1
    }
    });

  let total_dados = [];
  let i = 0;
  array_nomes_valores.forEach(e => {
    let linha = document.createElement("tr");
    let corpo = document.querySelector("tbody");
    let campoDados = document.createElement("tr");
    let campoVariavel = document.createElement("td");
    let textoVariavel = document.createTextNode(e.nome);
    // Está parecendo que não vai ter muita questão de validação dos dados,
    // então vamos confiar que o usuário vai informar o mesmo número de nomes de variáveis e de valores
    // partindo dessa premissa básica, vai ter o mesma quantidade de nomes e valores, então na teoria
    // o nome na posição zero do array_variavel vai ser referente ao valor na posição zero do array_dados_variavel
    // certo até aqui? ???? sim
    // Vamos precisar de uma variável de apoio (variável contadora, por convenção, geralmente é i), declarando fora do laço forEach
    let textoDados = document.createTextNode(e.valor); // aqui vamos usar o contador I
    //i = i + 1; // para mudar o contador
    // na teoria é isso foi

    campoDados.appendChild(textoDados);
    campoVariavel.appendChild(textoVariavel);
    linha.appendChild(campoVariavel);
    linha.appendChild(campoDados);

    corpo.appendChild(linha);
  });
  array_nomes_valores.forEach(t => {
    total_dados.push(parseInt(t.valor));
      console.log(typeof(total_dados))
  })
  let resultado = total_dados.reduce((acumulador, item) => acumulador + item, 0);
   console.log(resultado);

    }
       
      //total_dados = total_dados.reduce(function(total, numero){
      //  return(total + numero);
      //})
      //console.log(total);
  

