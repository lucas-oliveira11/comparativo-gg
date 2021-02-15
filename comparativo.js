'use strict';

var comparativo = document.getElementById("content_estatisticaComparacao");

var itens = comparativo.getElementsByTagName("span");

var headers = [];

/*pegar o nome dos atributos*/
for (var i = 0; i < itens.length; i++) {
	var title = itens[i].innerText.replace('[+]', '');

	if (title.indexOf('Goleiro') > 0) {
		title = 'GOL'
	} else if (title.indexOf('Escanteio') > 0) {
		title = 'ESC'
	} else if (title.indexOf('Visão') > 0) {
		title = 'VIS'
	} else if (title.indexOf('Desarme') > 0) {
		title = 'DES'
	} else if (title.indexOf('Pênalti') > 0) {
		title = 'PEN'
	} else if (title.indexOf('Jogadas') > 0) {
		title = 'AER'
	} else if (title.indexOf('Finaliz') > 0) {
		title = 'FIN'
	} else if (title.indexOf('Cruzamento') > 0) {
		title = 'CRU'
	} else if (title.indexOf('Domínio') > 0) {
		title = 'DOM'
	} else if (title.indexOf('Drib') > 0) {
		title = 'DRI'
	} else if (title.indexOf('Curto') > 0) {
		title = 'PCU'
	} else if (title.indexOf('Longo') > 0) {
		title = 'PLO'
	} else if (title.indexOf('Resist') > 0) {
		title = 'RES'
	} else if (title.indexOf('Velocid') > 0) {
		title = 'VEL'
	} else if (title.indexOf('Expe') > 0) {
		title = 'EXP'
	}

	headers.push(title);
	i++;
}

var nomesTimeCasa = [];
var nomesTimeFora = [];

var qualidadesHome = [];
var qualidadesAway = [];

/*pegar os nomes no primeiro quadro*/
var itemNomesCasa = itens[0].getElementsByTagName('div')[1].getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr');
var itemNomesFora = itens[0].getElementsByTagName('div')[2].getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr');

/*varre itens do time da casa pra pegar os nomes dos jogadores*/
for (var x = 1; x < itemNomesCasa.length; x++) {
	var nome = itemNomesCasa[x].getElementsByTagName('td')[0].innerText;

	if (nomesTimeCasa.indexOf(nome) < 0) {
		nomesTimeCasa.push(nome);
	}

}

/*varre itens do time visitante pra pegar os nomes dos jogadores*/
for (var x = 1; x < itemNomesFora.length; x++) {
	var nome = itemNomesFora[x].getElementsByTagName('td')[0].innerText;

	if (nomesTimeFora.indexOf(nome) < 0) {
		nomesTimeFora.push(nome);
	}

}


/*varrer todos os quadros pra pegar as qualidades*/
for (var i = 0; i < itens.length; i++) {
	var home = itens[i].getElementsByTagName('div')[1].getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr');
	var away = itens[i].getElementsByTagName('div')[2].getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr');

	for (var x = 1; x < home.length; x++) {
		qualidadesHome.push(home[x].getElementsByTagName('td')[1].innerText);
	}

	for (var x = 1; x < away.length; x++) {
		qualidadesAway.push(away[x].getElementsByTagName('td')[1].innerText);
	}
	i++;
}

var totalTimeCasa = 0;
var totalTimeFora = 0;

/** precisa de refactoring - switch repetido */
/*parse qualidades pra numero de 1 a 10 */
for (var i = 0; i < qualidadesHome.length; i++) {
	switch(qualidadesHome[i]) {
		case 'Horrível':
			qualidadesHome[i] = 1;
			break;
		case 'Péssimo':
			qualidadesHome[i] = 2;
			break;
		case 'Muito Ruim':
			qualidadesHome[i] = 3;
			break;
		case 'Ruim':
			qualidadesHome[i] = 4;
			break;
		case 'Regular':
			qualidadesHome[i] = 5;
			break;
		case 'Bom':
			qualidadesHome[i] = 6;
			break;
		case 'Muito Bom':
			qualidadesHome[i] = 7;
			break;
		case 'Ótimo':
			qualidadesHome[i] = 8;
			break;
		case 'Excelente':
			qualidadesHome[i] = 9;
			break;
		case 'Craque':
			qualidadesHome[i] = 10;
			break;
	}

	totalTimeCasa += qualidadesHome[i];
}

/** precisa de refactoring - switch repetido */
/*parse qualidades pra numero de 1 a 10 */
for (var i = 0; i < qualidadesAway.length; i++) {
	switch(qualidadesAway[i]) {
		case 'Horrível':
			qualidadesAway[i] = 1;
			break;
		case 'Péssimo':
			qualidadesAway[i] = 2;
			break;
		case 'Muito Ruim':
			qualidadesAway[i] = 3;
			break;
		case 'Ruim':
			qualidadesAway[i] = 4;
			break;
		case 'Regular':
			qualidadesAway[i] = 5;
			break;
		case 'Bom':
			qualidadesAway[i] = 6;
			break;
		case 'Muito Bom':
			qualidadesAway[i] = 7;
			break;
		case 'Ótimo':
			qualidadesAway[i] = 8;
			break;
		case 'Excelente':
			qualidadesAway[i] = 9;
			break;
		case 'Craque':
			qualidadesAway[i] = 10;
			break;
	}

	totalTimeFora += qualidadesAway[i]
}

var tabelaTimeCasaHtml = `<span style="font-size: 12px;color:white; font-weight: bold;background-color:black; padding: 10px;text-align:center">CASA</span>
<table style="border: 1px solid black;border-collapse: collapse;"> <tr align="center">`;

/* insere o header da tabela */
for (var i = 0; i < headers.length; i++) {

	if (i === 0) {
		tabelaTimeCasaHtml = tabelaTimeCasaHtml.concat(
			`<td style="font-size: 12px;border: 1px solid black;border-collapse: collapse;width: 30%;color:white; font-weight: bold;background-color:black">NOME</td>`);
	}

	tabelaTimeCasaHtml = tabelaTimeCasaHtml.concat(`<td style="font-size: 12px;border: 1px solid black;border-collapse: collapse;width: 4%;color:white; font-weight: bold;background-color:black">${headers[i]}</td>`);
}

tabelaTimeCasaHtml = tabelaTimeCasaHtml.concat(`<td style="font-size: 12px;border: 1px solid black;width: 10%;color:white; font-weight: bold;background-color:black">TOTAL</td> </tr>`);

var homeAereas = [];
var homeFinalizacao = [];
var homePenalti = [];
var homeCruzamento = [];
var homeEscanteio = [];
var homeDesarme = [];
var homeDominio = [];
var homeDrible = [];
var homeGoleiro = [];
var homeCurto = [];
var homeLongo = [];
var homeResistencia = [];
var homeVisao = [];
var homeVelocidade = [];
var homeExperiencia = [];

for (var i = 0; i < 11; i++) {
	homeAereas.push(qualidadesHome[i]);
}
for (var i = 11; i < 22; i++) {
	homeFinalizacao.push(qualidadesHome[i]);
}
for (var i = 22; i < 33; i++) {
	homePenalti.push(qualidadesHome[i]);
}
for (var i = 33; i < 44; i++) {
	homeCruzamento.push(qualidadesHome[i]);
}
for (var i = 44; i < 55; i++) {
	homeEscanteio.push(qualidadesHome[i]);
}
for (var i = 55; i < 66; i++) {
	homeDesarme.push(qualidadesHome[i]);
}
for (var i = 66; i < 77; i++) {
	homeDominio.push(qualidadesHome[i]);
}
for (var i = 77; i < 88; i++) {
	homeDrible.push(qualidadesHome[i]);
}
for (var i = 88; i < 99; i++) {
	homeGoleiro.push(qualidadesHome[i]);
}
for (var i = 99; i < 110; i++) {
	homeCurto.push(qualidadesHome[i]);
}
for (var i = 110; i < 121; i++) {
	homeLongo.push(qualidadesHome[i]);
}
for (var i = 121; i < 132; i++) {
	homeResistencia.push(qualidadesHome[i]);
}
for (var i = 132; i < 143; i++) {
	homeVisao.push(qualidadesHome[i]);
}
for (var i = 143; i < 154; i++) {
	homeVelocidade.push(qualidadesHome[i]);
}
for (var i = 154; i < 165; i++) {
	homeExperiencia.push(qualidadesHome[i]);
}

this.elegeCor = function(nivel) {
	switch(nivel) {
		case 1:
			return '#add8e6';
			break;
		case 2:
			return '#63d9ff';
			break;
		case 3:
			return '#278eaf';
			break;
		case 4:
			return '#3ea71c';
			break;
		case 5:
			return '#277d0b';
			break;
		case 6:
			return '#f9a574';
			break;
		case 7:
			return '#fd985c';
			break;
		case 8:
			return '#ff7d30';
			break;
		case 9:
			return '#e85600';
			break;
		case 10:
			return '#e00000';
			break;
	}
}

/* MONTA TABELA TIME CASA*/
for (var i = 0; i < 11; i++) {
	tabelaTimeCasaHtml = tabelaTimeCasaHtml.concat(`<tr align="center" style="font-size: 12px;border-bottom: 1px solid black">`);

	var totalJogadador = homeAereas[i] + homeFinalizacao[i] + homePenalti[i] + homeCruzamento[i] + homeEscanteio[i] + homeDesarme[i] + homeDominio[i] + homeDrible[i] + homeGoleiro[i] + homeCurto[i] + homeLongo[i] + homeResistencia[i] + homeVisao[i] + homeVelocidade[i] + homeExperiencia[i];

	tabelaTimeCasaHtml = tabelaTimeCasaHtml.concat(`<td style="height: 30px;font-size: 12px;border: 1px solid black">${nomesTimeCasa[i]}</td>`);
	tabelaTimeCasaHtml = tabelaTimeCasaHtml.concat(`<td style="height: 30px;font-size: 12px;color:black; font-weight: bold;background-color:${this.elegeCor(homeAereas[i])}">${homeAereas[i]}</td>`);
	tabelaTimeCasaHtml = tabelaTimeCasaHtml.concat(`<td style="height: 30px;font-size: 12px;color:black; font-weight: bold;background-color:${this.elegeCor(homeFinalizacao[i])}">${homeFinalizacao[i]}</td>`);
	tabelaTimeCasaHtml = tabelaTimeCasaHtml.concat(`<td style="height: 30px;font-size: 12px;color:black; font-weight: bold;background-color:${this.elegeCor(homePenalti[i])}">${homePenalti[i]}</td>`);
	tabelaTimeCasaHtml = tabelaTimeCasaHtml.concat(`<td style="height: 30px;font-size: 12px;color:black; font-weight: bold;background-color:${this.elegeCor(homeCruzamento[i])}">${homeCruzamento[i]}</td>`);
	tabelaTimeCasaHtml = tabelaTimeCasaHtml.concat(`<td style="height: 30px;font-size: 12px;color:black; font-weight: bold;background-color:${this.elegeCor(homeEscanteio[i])}">${homeEscanteio[i]}</td>`);
	tabelaTimeCasaHtml = tabelaTimeCasaHtml.concat(`<td style="height: 30px;font-size: 12px;color:black; font-weight: bold;background-color:${this.elegeCor(homeDesarme[i])}">${homeDesarme[i]}</td>`);
	tabelaTimeCasaHtml = tabelaTimeCasaHtml.concat(`<td style="height: 30px;font-size: 12px;color:black; font-weight: bold;background-color:${this.elegeCor(homeDominio[i])}">${homeDominio[i]}</td>`);
	tabelaTimeCasaHtml = tabelaTimeCasaHtml.concat(`<td style="height: 30px;font-size: 12px;color:black; font-weight: bold;background-color:${this.elegeCor(homeDrible[i])}">${homeDrible[i]}</td>`);
	tabelaTimeCasaHtml = tabelaTimeCasaHtml.concat(`<td style="height: 30px;font-size: 12px;color:black; font-weight: bold;background-color:${this.elegeCor(homeGoleiro[i])}">${homeGoleiro[i]}</td>`);
	tabelaTimeCasaHtml = tabelaTimeCasaHtml.concat(`<td style="height: 30px;font-size: 12px;color:black; font-weight: bold;background-color:${this.elegeCor(homeCurto[i])}">${homeCurto[i]}</td>`);
	tabelaTimeCasaHtml = tabelaTimeCasaHtml.concat(`<td style="height: 30px;font-size: 12px;color:black; font-weight: bold;background-color:${this.elegeCor(homeLongo[i])}">${homeLongo[i]}</td>`);
	tabelaTimeCasaHtml = tabelaTimeCasaHtml.concat(`<td style="height: 30px;font-size: 12px;color:black; font-weight: bold;background-color:${this.elegeCor(homeResistencia[i])}">${homeResistencia[i]}</td>`);
	tabelaTimeCasaHtml = tabelaTimeCasaHtml.concat(`<td style="height: 30px;font-size: 12px;color:black; font-weight: bold;background-color:${this.elegeCor(homeVisao[i])}">${homeVisao[i]}</td>`);
	tabelaTimeCasaHtml = tabelaTimeCasaHtml.concat(`<td style="height: 30px;font-size: 12px;color:black; font-weight: bold;background-color:${this.elegeCor(homeVelocidade[i])}">${homeVelocidade[i]}</td>`);
	tabelaTimeCasaHtml = tabelaTimeCasaHtml.concat(`<td style="height: 30px;font-size: 12px;color:black; font-weight: bold;background-color:${this.elegeCor(homeExperiencia[i])}">${homeExperiencia[i]}</td>`);
	tabelaTimeCasaHtml = tabelaTimeCasaHtml.concat(`<td style="height: 30px;font-size: 12px;color:black; font-weight: bold;">${totalJogadador}</td> </tr>`);
}

tabelaTimeCasaHtml = tabelaTimeCasaHtml.concat(`<tr align="center" style="height: 30px;font-size: 12px;border: 1px solid black;color: white;background-color:black"><td>TOTAL: ${totalTimeCasa} </td></tr></table>`);

// **************** TIME VISITANTE **************************//

var tabelaTimeForaHtml = `<div style="margin-top: 20px"><span style="font-size: 12px;color:white; font-weight: bold;background-color:black; padding: 10px;">VISITANTE</span>
<table style="border: 1px solid black;border-collapse: collapse;"> <tr align="center">`;

/* insere o header da tabela */
for (var i = 0; i < headers.length; i++) {

	if (i === 0) {
		tabelaTimeForaHtml = tabelaTimeForaHtml.concat(
			`<td style="font-size: 12px;border: 1px solid black;border-collapse: collapse;width: 30%;color:white; font-weight: bold;background-color:black">NOME</td>`);
	}

	tabelaTimeForaHtml = tabelaTimeForaHtml.concat(`<td style="font-size: 12px;border: 1px solid black;border-collapse: collapse;width: 4%;color:white; font-weight: bold;background-color:black">${headers[i]}</td>`);
}

tabelaTimeForaHtml = tabelaTimeForaHtml.concat(`<td style="font-size: 12px;border: 1px solid black;width: 10%;color:white; font-weight: bold;background-color:black">TOTAL</td> </tr>`);

var awayAereas = [];
var awayFinalizacao = [];
var awayPenalti = [];
var awayCruzamento = [];
var awayEscanteio = [];
var awayDesarme = [];
var awayDominio = [];
var awayDrible = [];
var awayGoleiro = [];
var awayCurto = [];
var awayLongo = [];
var awayResistencia = [];
var awayVisao = [];
var awayVelocidade = [];
var awayExperiencia = [];

for (var i = 0; i < 11; i++) {
	awayAereas.push(qualidadesAway[i]);
}
for (var i = 11; i < 22; i++) {
	awayFinalizacao.push(qualidadesAway[i]);
}
for (var i = 22; i < 33; i++) {
	awayPenalti.push(qualidadesAway[i]);
}
for (var i = 33; i < 44; i++) {
	awayCruzamento.push(qualidadesAway[i]);
}
for (var i = 44; i < 55; i++) {
	awayEscanteio.push(qualidadesAway[i]);
}
for (var i = 55; i < 66; i++) {
	awayDesarme.push(qualidadesAway[i]);
}
for (var i = 66; i < 77; i++) {
	awayDominio.push(qualidadesAway[i]);
}
for (var i = 77; i < 88; i++) {
	awayDrible.push(qualidadesAway[i]);
}
for (var i = 88; i < 99; i++) {
	awayGoleiro.push(qualidadesAway[i]);
}
for (var i = 99; i < 110; i++) {
	awayCurto.push(qualidadesAway[i]);
}
for (var i = 110; i < 121; i++) {
	awayLongo.push(qualidadesAway[i]);
}
for (var i = 121; i < 132; i++) {
	awayResistencia.push(qualidadesAway[i]);
}
for (var i = 132; i < 143; i++) {
	awayVisao.push(qualidadesAway[i]);
}
for (var i = 143; i < 154; i++) {
	awayVelocidade.push(qualidadesAway[i]);
}
for (var i = 154; i < 165; i++) {
	awayExperiencia.push(qualidadesAway[i]);
}

/* MONTA TABELA TIME F*/
for (var i = 0; i < 11; i++) {
	tabelaTimeForaHtml = tabelaTimeForaHtml.concat(`<tr align="center" style="font-size: 12px;border-bottom: 1px solid black">`);

	var totalJogadador = awayAereas[i] + awayFinalizacao[i] + awayPenalti[i] + awayCruzamento[i] + awayEscanteio[i] + awayDesarme[i] + awayDominio[i] + awayDrible[i] + awayGoleiro[i] + awayCurto[i] + awayLongo[i] + awayResistencia[i] + awayVisao[i] + awayVelocidade[i] + awayExperiencia[i];

	tabelaTimeForaHtml = tabelaTimeForaHtml.concat(`<td style="height: 30px;font-size: 12px;border: 1px solid black">${nomesTimeFora[i]}</td>`);
	tabelaTimeForaHtml = tabelaTimeForaHtml.concat(`<td style="height: 30px;font-size: 12px;color:black; font-weight: bold;background-color:${this.elegeCor(awayAereas[i])}">${awayAereas[i]}</td>`);
	tabelaTimeForaHtml = tabelaTimeForaHtml.concat(`<td style="height: 30px;font-size: 12px;color:black; font-weight: bold;background-color:${this.elegeCor(awayFinalizacao[i])}">${awayFinalizacao[i]}</td>`);
	tabelaTimeForaHtml = tabelaTimeForaHtml.concat(`<td style="height: 30px;font-size: 12px;color:black; font-weight: bold;background-color:${this.elegeCor(awayPenalti[i])}">${awayPenalti[i]}</td>`);
	tabelaTimeForaHtml = tabelaTimeForaHtml.concat(`<td style="height: 30px;font-size: 12px;color:black; font-weight: bold;background-color:${this.elegeCor(awayCruzamento[i])}">${awayCruzamento[i]}</td>`);
	tabelaTimeForaHtml = tabelaTimeForaHtml.concat(`<td style="height: 30px;font-size: 12px;color:black; font-weight: bold;background-color:${this.elegeCor(awayEscanteio[i])}">${awayEscanteio[i]}</td>`);
	tabelaTimeForaHtml = tabelaTimeForaHtml.concat(`<td style="height: 30px;font-size: 12px;color:black; font-weight: bold;background-color:${this.elegeCor(awayDesarme[i])}">${awayDesarme[i]}</td>`);
	tabelaTimeForaHtml = tabelaTimeForaHtml.concat(`<td style="height: 30px;font-size: 12px;color:black; font-weight: bold;background-color:${this.elegeCor(awayDominio[i])}">${awayDominio[i]}</td>`);
	tabelaTimeForaHtml = tabelaTimeForaHtml.concat(`<td style="height: 30px;font-size: 12px;color:black; font-weight: bold;background-color:${this.elegeCor(awayDrible[i])}">${awayDrible[i]}</td>`);
	tabelaTimeForaHtml = tabelaTimeForaHtml.concat(`<td style="height: 30px;font-size: 12px;color:black; font-weight: bold;background-color:${this.elegeCor(awayGoleiro[i])}">${awayGoleiro[i]}</td>`);
	tabelaTimeForaHtml = tabelaTimeForaHtml.concat(`<td style="height: 30px;font-size: 12px;color:black; font-weight: bold;background-color:${this.elegeCor(awayCurto[i])}">${awayCurto[i]}</td>`);
	tabelaTimeForaHtml = tabelaTimeForaHtml.concat(`<td style="height: 30px;font-size: 12px;color:black; font-weight: bold;background-color:${this.elegeCor(awayLongo[i])}">${awayLongo[i]}</td>`);
	tabelaTimeForaHtml = tabelaTimeForaHtml.concat(`<td style="height: 30px;font-size: 12px;color:black; font-weight: bold;background-color:${this.elegeCor(awayResistencia[i])}">${awayResistencia[i]}</td>`);
	tabelaTimeForaHtml = tabelaTimeForaHtml.concat(`<td style="height: 30px;font-size: 12px;color:black; font-weight: bold;background-color:${this.elegeCor(awayVisao[i])}">${awayVisao[i]}</td>`);
	tabelaTimeForaHtml = tabelaTimeForaHtml.concat(`<td style="height: 30px;font-size: 12px;color:black; font-weight: bold;background-color:${this.elegeCor(awayVelocidade[i])}">${awayVelocidade[i]}</td>`);
	tabelaTimeForaHtml = tabelaTimeForaHtml.concat(`<td style="height: 30px;font-size: 12px;color:black; font-weight: bold;background-color:${this.elegeCor(awayExperiencia[i])}">${awayExperiencia[i]}</td>`);
	tabelaTimeForaHtml = tabelaTimeForaHtml.concat(`<td style="height: 30px;font-size: 12px;color:black; font-weight: bold;">${totalJogadador}</td> </tr>`);
}

tabelaTimeForaHtml = tabelaTimeForaHtml.concat(`<tr align="center" style="height: 30px;font-size: 12px;border: 1px solid black;color: white;background-color:black"><td>TOTAL: ${totalTimeFora} </td></tr></table></div>`);

$(comparativo).html(tabelaTimeCasaHtml + tabelaTimeForaHtml);