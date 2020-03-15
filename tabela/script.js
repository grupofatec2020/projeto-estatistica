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
    // como na teoria vão existir a mesma quantidade de dados, podemos usar o contador J como índice na outra array tbm
    // quebrar em linha só pra ficar mais fácil de ler
    //o array valores nao ta pegando os dados, nao eh? que eh aqui embaixo?
    // parece q é esse o problema mesmo
    array_nomes_valores.push({nome: nome_variavel, 
                              valor: array_dados_variavel[j]});
    j = j + 1;
  });

  //organizar alfabeticamente
  array_nomes_valores.sort((a, b) => {
    if (a.nome > b.nome) {
      return 1
    }
    else {
      return -1
    }
  });
  // pq até aqui, conseguimos fazer array com nome e valores

  let total_dados = [];
  array_nomes_valores.forEach(t => {
    total_dados.push(parseInt(t.valor));
    // console.log(total_dados);
  });

  // Somatório total
  let resultado = total_dados.reduce((acumulador, item) => acumulador + item, 0);
  // console.log(resultado);
  //calculo FA
  //cont aux q
  let k = 0;
  let l = 0;
  array_nomes_valores.forEach(element => {
    element.fr_porcento = element.valor * 100 / resultado;
    //Caso base, caso seja primeira vez no laco o FA eh o valor do item mesmo
    if (k == 0){
      element.fa = parseFloat(element.valor);
      //caso seja um item depois do primeiro, soma o valor do FA do anterior com o atual
    } else if (k > 0) {
                //fa anterior q-1                        //valor do item atual
      element.fa = parseFloat(array_nomes_valores[k-1].fa) + parseFloat(element.valor);
    }
    k++
    if (l == 0){
      element.fa_porcento = parseFloat(element.fr_porcento);
    } else if (l > 0) {
      element.fa_porcento = parseFloat(array_nomes_valores[l-1].fa_porcento) + parseFloat(element.fr_porcento);
    }
    l++
  })
  console.log(array_nomes_valores);
  // Cálculo das FR_PORCENTO 
  //array_nomes_valores.forEach(element =>{
  //  element.fr_porcento = element.valor * 100 / resultado;
  //});
  //console.log(array_nomes_valores);

  // O que tem aqui é q esse loop cria uma linha <tr>, com algumas colunas (células) <td>
  // que depois dá pra usar aqui abaixo
  let i = 0;
  array_nomes_valores.forEach(e => {
    let linha = document.createElement("tr");
    let corpo = document.querySelector("tbody");
    let campoDados = document.createElement("tr");
    let campo_fr_porcento = document.createElement("td");
    let campo_fa = document.createElement("td");
    let campo_fa_porcento = document.createElement("td");
    let campoVariavel = document.createElement("td");
    let texto_fa = document.createTextNode(e.fa);
    let texto_fr_porcento = document.createTextNode(e.fr_porcento);
    let texto_fa_porcento = document.createTextNode(e.fa_porcento);
    let textoVariavel = document.createTextNode(e.nome);
    // Está parecendo que não vai ter muita questão de validação dos dados,
    // então vamos confiar que o usuário vai informar o mesmo número de nomes de variáveis e de valores
    // partindo dessa premissa básica, vai ter o mesma quantidade de nomes e valores, então na teoria
    // o nome na posição zero do array_variavel vai ser referente ao valor na posição zero do array_dados_variavel
    // certo até aqui? ???? sim
    // Vamos precisar de uma variável de apoio (variável contadora, por convenção, geralmente é i), declarando fora do laço forEach
    let textoDados = document.createTextNode(e.valor);

    campoDados.appendChild(textoDados);
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