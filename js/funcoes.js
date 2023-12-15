var ultimoId = 0;
//---------DATA--------------------------------


function Data() {
	var data = new Date();
	var dias = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
	var meses = ["", "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

	document.write(dias[data.getDay()] + ", " + data.getDate() + " de " + meses[data.getMonth()] + " de " + data.getFullYear());
}

//---------RECIBO VALE TRANSPORTE--------------------------------

function updateImportancia() {
	var valorNumerico = parseFloat(document.getElementById('valor').value);
	var importanciaPalavras = converteValorParaPalavras(valorNumerico);
	document.getElementById('importancia').value = importanciaPalavras;
}

function converteNumeroPorExtenso(numero) {
	var unidades = ['', 'UM', 'DOIS', 'TRÊS', 'QUATRO', 'CINCO', 'SEIS', 'SETE', 'OITO', 'NOVE'];
	var dezenas = ['DEZ', 'ONZE', 'DOZE', 'TREZE', 'QUATORZE', 'QUINZE', 'DEZESSEIS', 'DEZESSETE', 'DEZOITO', 'DEZENOVE'];
	var dezenasMultiplos = ['VINTE', 'TRINTA', 'QUARENTA', 'CINQUENTA', 'SESSENTA', 'SETENTA', 'OITENTA', 'NOVENTA'];
	var centenas = ['', 'CENTO', 'DUZENTOS', 'TREZENTOS', 'QUATROCENTOS', 'QUINHENTOS', 'SEISCENTOS', 'SETECENTOS', 'OITOCENTOS', 'NOVECENTOS'];

	var milhares = ['', ' MIL', ' MIL', ' MILHÃO', ' MILHÕES'];

	var valorEmPalavras = '';

	if (numero == 0) {
		valorEmPalavras = 'ZERO';
	} else if (numero < 10) {
		valorEmPalavras = unidades[numero];
	} else if (numero < 20) {
		valorEmPalavras = dezenas[numero - 10];
	} else if (numero < 100) {
		var unidade = numero % 10;
		var dezena = Math.floor(numero / 10);

		valorEmPalavras = dezenasMultiplos[dezena - 2];

		if (unidade > 0) {
			valorEmPalavras += ' E ' + unidades[unidade];
		}
	} else if (numero < 1000) {
		var centena = Math.floor(numero / 100);
		var dezenaUnidade = numero % 100;

		valorEmPalavras = centenas[centena];

		if (dezenaUnidade > 0) {
			valorEmPalavras += ' E ' + converteNumeroPorExtenso(dezenaUnidade);
		}
	} else {
		for (var i = 0; numero > 0; i++) {
			var parte = numero % 1000;
			numero = Math.floor(numero / 1000);

			if (parte > 0) {
				var extensoParte = converteNumeroPorExtenso(parte);

				if (i > 0 && parte === 1) {
					extensoParte += milhares[i];
				} else if (i > 0) {
					extensoParte += milhares[i + 1];
				}

				if (valorEmPalavras === '') {
					valorEmPalavras = extensoParte;
				} else {
					valorEmPalavras = extensoParte + ' E ' + valorEmPalavras;
				}
			}
		}
	}

	return valorEmPalavras;
}

function converteValorParaPalavras(valor) {
	var valorInteiro = Math.floor(valor);
	var valorDecimal = Math.round((valor - valorInteiro) * 100);

	var valorInteiroEmPalavras = converteNumeroPorExtenso(valorInteiro);
	var valorDecimalEmPalavras = '';

	// Verifica se há centavos
	if (valorDecimal > 0) {
		valorDecimalEmPalavras = 'E ' + converteNumeroPorExtenso(valorDecimal) + ' CENTAVOS';
	}

	var resultado = valorInteiroEmPalavras;

	// Adiciona a parte de centavos ao resultado, apenas se houver centavos
	if (valorDecimal > 0) {
		resultado += ' REAIS ' + valorDecimalEmPalavras;
	} else {
		resultado += ' REAIS';
	}

	return resultado;
}




//---------RECIBO COMISSÃO--------------------------------

function getDadosComissao() {
	var dataAtual = new Date();

	// Preencher o input de mês com o nome do mês atual
	var meses = ["JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO", "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"];
	var mesAtual = meses[dataAtual.getMonth()];
	document.getElementById('mes2').value = mesAtual;

	// Preencher o input de ano com o ano atual
	var anoAtual = dataAtual.getFullYear();
	document.getElementById('ano2').value = anoAtual
	document.getElementById('gerar').onclick = gerarPDFComissao;
}

function gerarPDFComissao() {
	var loja = document.getElementById('loja').value;
	var cnpj = document.getElementById('cnpj').value;
	var obs = document.getElementById('obs').value;
	var valor = document.getElementById('valor').value;
	var mes2 = document.getElementById('mes2').value;
	var ano2 = document.getElementById('ano2').value;
	var referencia = document.getElementById('referencia').value;
	var importancia = document.getElementById('importancia').value;
	var nome = document.getElementById('nome').value;
	var rg = document.getElementById('rg').value;
	var cpf = document.getElementById('cpf').value;


	if (valor == "" || importancia == "" || nome == "" || referencia == "") {
		alert('Preencha todos os campos do Formulário.');
		valor.focus();
		return false;
	} else {
		alert('Vão ser geradas duas vias do Recibo de Comissão em PDF do funcionário(a) ' + nome + '.\nClique em OK para finalizar.');
	}

	var pdf = new jsPDF();

	// Adicionando a chamada para a função updateImportancia
	updateImportancia();

	pdf.setProperties({
		title: 'Recibo Comissão',
		subject: 'Recibo ',
		keywords: 'gerador de recibos pessoal',
		creator: 'gPDF, javascript, web 2.0, ajax'
	});
	// 1º VIA DO RECIBO
	pdf.line(10, 10, 200, 10); //linha horizontal superior
	pdf.line(10, 135, 10, 10) //linha vertical esquerda
	pdf.line(10, 135, 200, 135); //linha horizontal inferior
	pdf.line(200, 135, 200, 10) //linha vertical direita

	pdf.setFont("helvetica");
	pdf.setFontType("normal");
	pdf.setFontSize(22);
	pdf.text(20, 20, '                                 RECIBO');
	//pdf.text(20, 30, 'ID:' + ultimoId, pdf.setFontSize(12));
	pdf.setTextColor(0);
	pdf.setFontSize(18);
	pdf.text(146, 30, 'Valor  R$ ' + valor);
	pdf.setFontSize(12);
	pdf.setFontType("bold"); pdf.text(20, 50, 'RECEBI DE: '); pdf.setFontType("normal"); pdf.text(46, 50, loja);
	pdf.setFontType("bold"); pdf.text(20, 58, 'CNPJ: '); pdf.setFontType("normal"); pdf.text(34, 58, cnpj);
	pdf.setFontType("bold"); pdf.text(20, 66, 'A IMPORTÂNCIA DE: '); pdf.setFontType("normal"); pdf.setFontSize(9); pdf.text(64, 66, importancia.toUpperCase());
	pdf.setFontSize(12);
	pdf.setFontType("bold"); pdf.text(20, 74, 'PERÍODO DE: '); pdf.setFontType("normal"); pdf.text(50, 74, mes2 + '/' + ano2);
	pdf.setFontType("bold"); pdf.text(20, 82, 'REFERENTE A: '); pdf.setFontType("normal"); pdf.text(53, 82, referencia.toUpperCase());
	pdf.setFontType("bold"); pdf.text(20, 90, 'OBSERVAÇÃO: '); pdf.setFontType("normal"); pdf.text(54, 90, obs.toUpperCase());
	pdf.setFontType("bold"); pdf.text(20, 105, 'DATA:___________________________');
	pdf.setFontType("bold"); pdf.text(100, 105, 'LOCAL:___________________________');
	pdf.setFontType("bold"); pdf.text(20, 113, 'NOME: '); pdf.setFontType("normal"); pdf.text(35, 113, nome.toUpperCase());
	pdf.setFontType("bold"); pdf.text(20, 121, 'CPF: '); pdf.setFontType("normal"); pdf.text(32, 121, cpf.toUpperCase()); pdf.setFontType("bold"); pdf.text(70, 121, 'RG: '); pdf.setFontType("normal"); pdf.text(80, 121, rg.toUpperCase());
	pdf.setFontType("bold"); pdf.text(20, 132, 'ASSINATURA:_________________________________________');

	// 2º VIA DO RECIBO
	pdf.line(10, 163, 200, 163); //linha horizontal superior
	pdf.line(10, 163, 10, 288) //linha vertical esquerda
	pdf.line(10, 288, 200, 288); //linha horizontal inferior
	pdf.line(200, 288, 200, 163) //linha vertical direita

	pdf.setFont("helvetica");
	pdf.setFontType("normal");
	pdf.setFontSize(22);
	pdf.text(85, 174, 'RECIBO');
	//pdf.text(20, 184, 'ID:' + ultimoId, pdf.setFontSize(12));
	pdf.setTextColor(0); //isso deve ser preto
	pdf.setFontSize(18);
	pdf.text(146, 184, 'Valor  R$ ' + valor);
	pdf.setFontSize(12);
	pdf.setFontType("bold"); pdf.text(20, 204, 'RECEBI DE: '); pdf.setFontType("normal"); pdf.text(46, 204, loja);
	pdf.setFontType("bold"); pdf.text(20, 212, 'CNPJ: '); pdf.setFontType("normal"); pdf.text(34, 212, cnpj);
	pdf.setFontType("bold"); pdf.text(20, 220, 'A IMPORTÂNCIA DE: '); pdf.setFontType("normal"); pdf.setFontSize(9); pdf.text(64, 220, importancia.toUpperCase());
	pdf.setFontSize(12);
	pdf.setFontType("bold"); pdf.text(20, 228, 'PERÍODO DE: '); pdf.setFontType("normal"); pdf.text(50, 228, mes2 + '/' + ano2);
	pdf.setFontType("bold"); pdf.text(20, 236, 'REFERENTE A: '); pdf.setFontType("normal"); pdf.text(53, 236, referencia.toUpperCase());
	pdf.setFontType("bold"); pdf.text(20, 244, 'OBSERVAÇÃO: '); pdf.setFontType("normal"); pdf.text(54, 244, obs.toUpperCase());

	pdf.setFontType("bold"); pdf.text(20, 260, 'DATA:___________________________'); pdf.setFontType("bold"); pdf.text(100, 260, 'LOCAL:___________________________');
	pdf.setFontType("bold"); pdf.text(20, 268, 'NOME: '); pdf.setFontType("normal"); pdf.text(35, 268, nome.toUpperCase());
	pdf.setFontType("bold"); pdf.text(20, 276, 'CPF: '); pdf.setFontType("normal"); pdf.text(32, 276, cpf.toUpperCase()); pdf.setFontType("bold"); pdf.text(70, 276, 'RG: '); pdf.setFontType("normal"); pdf.text(80, 276, rg.toUpperCase());
	pdf.setFontType("bold"); pdf.text(20, 285, 'ASSINATURA:__________________________________');


	// Incrementar o último ID
	ultimoId++;

	while (localStorage.getItem('recibo_' + ultimoId)) {
		ultimoId++;
	}

	// Criar um nome único para o PDF usando o ID
	var nomePDF = 'Recibo_' + nome + '_ID' + ultimoId + '.pdf';

	pdf.save(nomePDF);



	var reciboData = {
		nome: nome,
		data: new Date().toLocaleDateString(),
		referencia: referencia,
		valor: valor
	};
	localStorage.setItem('recibo_' + ultimoId, JSON.stringify(reciboData));

	gerarESalvarXML(reciboData);



	window.location.reload();
}

function construirXML(dados) {
	// Implemente a lógica para construir a string XML com base nos dados fornecidos
	// Aqui está um exemplo simples:
	const xmlString = `<recibo><id>${dados.id}</id><nome>${dados.nome}</nome></recibo>`;
	return xmlString;
}

function gerarESalvarXML(dados) {
	var xmlString = localStorage.getItem('dados_recibos_xml');

	if (!xmlString) {
		xmlString = '<?xml version="1.0" encoding="UTF-8"?><recibos></recibos>';
	}

	var xmlDoc = new DOMParser().parseFromString(xmlString, 'text/xml');

	var reciboElement = xmlDoc.createElement('recibo');

	for (var prop in dados) {
		var campoElement = xmlDoc.createElement(prop);
		var campoValor = xmlDoc.createTextNode(dados[prop]);
		campoElement.appendChild(campoValor);
		reciboElement.appendChild(campoElement);
	}

	xmlDoc.documentElement.appendChild(reciboElement);

	xmlString = new XMLSerializer().serializeToString(xmlDoc);
	localStorage.setItem('dados_recibos_xml', xmlString);
}



function gerarESalvarXML(dados) {
	const xmlString = construirXML(dados);

	fetch('http://localhost:3000/salvar-xml', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ xmlData: xmlString }),
	})
		.then(response => response.text())
		.then(message => console.log(message))
		.catch(error => console.error(error));
}


function gerarRecibo() {
	var dados = {
		nome: document.getElementById('nome').value,
		data: new Date(), // Puxe a data atual
		referente: document.getElementById('referente').value,
		cpf: document.getElementById('cpf').value,
		rg: document.getElementById('rg').value,
		valor: parseFloat(document.getElementById('valor').value)
		// Adicione outros campos conforme necessário
	};

	fetch('http://localhost:3000/DbApp', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(dados),
	})
		.then(response => response.json())
		.then(data => {
			console.log(data);
			alert('Recibo gerado com sucesso!');
		})
		.catch(error => {
			console.error(error);
			alert('Erro ao gerar recibo.');
		});
}

document.getElementById('gerar').addEventListener('click', gerarRecibo);





function adicionarDadosAoXML(dados) {
	var xmlString = localStorage.getItem('dados_recibos_xml');
	var xmlDoc;

	if (!xmlString) {
		// Se o arquivo XML não existir, crie um novo
		xmlString = '<?xml version="1.0" encoding="UTF-8"?><recibos></recibos>';
		localStorage.setItem('dados_recibos_xml', xmlString);
	}

	xmlDoc = new DOMParser().parseFromString(xmlString, 'text/xml');

	// Crie um novo elemento "recibo"
	var reciboElement = xmlDoc.createElement('recibo');

	// Adicione os elementos filhos (campos) ao elemento "recibo"
	for (var prop in dados) {
		var campoElement = xmlDoc.createElement(prop);
		var campoValor = xmlDoc.createTextNode(dados[prop]);
		campoElement.appendChild(campoValor);
		reciboElement.appendChild(campoElement);
	}

	// Adicione o elemento "recibo" ao documento XML
	xmlDoc.documentElement.appendChild(reciboElement);

	// Atualize o arquivo XML no armazenamento
	xmlString = new XMLSerializer().serializeToString(xmlDoc);
	localStorage.setItem('dados_recibos_xml', xmlString);
}

function exibirDadosDoXML() {
	var xmlString = localStorage.getItem('dados_recibos_xml');
	var xmlDoc = new DOMParser().parseFromString(xmlString, 'text/xml');

	var recibos = xmlDoc.getElementsByTagName('recibo');

	for (var i = 0; i < recibos.length; i++) {
		var recibo = recibos[i];
		var dados = {};

		for (var j = 0; j < recibo.childNodes.length; j++) {
			var campo = recibo.childNodes[j];
			dados[campo.nodeName] = campo.textContent;
		}

		console.log('ID: ' + (i + 1), dados);
	}
}