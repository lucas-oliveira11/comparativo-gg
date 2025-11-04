
'use strict';

// Constantes e configurações
const QUALITY_MAP = {
    'Horrível': 1,
    'Péssimo': 2,
    'Muito Ruim': 3,
    'Ruim': 4,
    'Regular': 5,
    'Bom': 6,
    'Muito Bom': 7,
    'Ótimo': 8,
    'Excelente': 9,
    'Craque': 10
};

const HEADER_MAP = {
    'Goleiro': 'GOL',
    'Escanteio': 'ESC',
    'Visão': 'VIS',
    'Desarme': 'DES',
    'Pênalti': 'PEN',
    'Jogadas': 'AER',
    'Finaliz': 'FIN',
    'Cruzamento': 'CRU',
    'Domínio': 'DOM',
    'Drib': 'DRI',
    'Curto': 'PCU',
    'Longo': 'PLO',
    'Resist': 'RES',
    'Velocid': 'VEL',
    'Expe': 'EXP'
};

const COLOR_MAP = {
    1: '#ffebee',
    2: '#ffcdd2',
    3: '#ef9a9a',
    4: '#fff9c4',
    5: '#fff59d',
    6: '#c8e6c9',
    7: '#a5d6a7',
    8: '#81c784',
    9: '#66bb6a',
    10: '#4caf50'
};

const SKILLS = ['Aereas', 'Finalizacao', 'Penalti', 'Cruzamento', 'Escanteio', 'Desarme',
    'Dominio', 'Drible', 'Goleiro', 'Curto', 'Longo', 'Resistencia',
    'Visao', 'Velocidade', 'Experiencia'];

// CSS Styles
const STYLES = `
<style>
    .comparativo-wrapper {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        padding: 15px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 12px;
        max-width: 701px;
        margin: 0 auto;
        box-sizing: border-box;
    }

    .team-container {
        background: white;
        border-radius: 8px;
        margin-bottom: 15px;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }

    .team-title {
        background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
        color: white;
        padding: 12px 16px;
        font-size: 15px;
        font-weight: 700;
        text-align: center;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        text-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }

    .team-title.away {
        background: linear-gradient(135deg, #c31432 0%, #240b36 100%);
    }

    .stats-table {
        width: 100%;
        border-collapse: collapse;
        background: white;
        table-layout: fixed;
    }

    .stats-table thead {
        background: linear-gradient(135deg, #434343 0%, #000000 100%);
    }

    .stats-table th {
        color: white;
        padding: 8px 2px;
        font-size: 9px;
        font-weight: 600;
        text-align: center;
        border-right: 1px solid rgba(255, 255, 255, 0.1);
        text-transform: uppercase;
        letter-spacing: 0.3px;
        width: 3.5%;
    }

    .stats-table th:first-child {
        text-align: left;
        padding-left: 8px;
        padding-right: 4px;
        width: 22%;
        font-size: 10px;
    }

    .stats-table th:last-child {
        border-right: none;
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        width: 6%;
    }

    .stats-table tbody tr {
        transition: all 0.3s ease;
        border-bottom: 1px solid #e0e0e0;
    }

    .stats-table tbody tr:hover {
        background: linear-gradient(90deg, #f8f9fa 0%, #e9ecef 100%);
        transform: translateX(3px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .stats-table tbody tr:nth-child(odd) {
        background-color: #fafafa;
    }

    .stats-table td {
        padding: 8px 2px;
        font-size: 11px;
        text-align: center;
        border-right: 1px solid #f0f0f0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .stats-table td:first-child {
        text-align: left;
        padding-left: 8px;
        padding-right: 4px;
        font-weight: 600;
        color: #2c3e50;
        border-right: 2px solid #e0e0e0;
        font-size: 10px;
    }

    .stats-table td.skill-cell {
        font-weight: 700;
        color: #2c3e50;
        position: relative;
        cursor: help;
        transition: all 0.2s ease;
    }

    .stats-table td.skill-cell:hover {
        transform: scale(1.1);
        z-index: 10;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    .stats-table td:last-child {
        font-weight: 700;
        font-size: 12px;
        background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
        color: #c1440e;
        border-right: none;
        border-left: 2px solid #e0e0e0;
    }

    .stats-table tfoot {
        background: linear-gradient(135deg, #434343 0%, #000000 100%);
    }

    .stats-table tfoot td {
        color: white;
        padding: 12px;
        font-size: 13px;
        font-weight: 700;
        text-align: center;
        letter-spacing: 0.8px;
        border: none;
    }

    /* Responsividade */
    @media (max-width: 701px) {
        .comparativo-wrapper {
            max-width: 100%;
            padding: 8px;
        }
        
        .stats-table th,
        .stats-table td {
            padding: 6px 1px;
            font-size: 8px;
        }
        
        .stats-table th:first-child,
        .stats-table td:first-child {
            padding-left: 6px;
            font-size: 8px;
        }
        
        .team-title {
            font-size: 12px;
            padding: 10px;
        }
        
        .stats-table tfoot td {
            font-size: 11px;
            padding: 10px;
        }
    }
</style>
`;

// Funções auxiliares
function normalizeHeader(title) {
    const cleanTitle = title.replace('[+]', '');

    for (const [key, value] of Object.entries(HEADER_MAP)) {
        if (cleanTitle.indexOf(key) > 0) {
            return value;
        }
    }

    return cleanTitle;
}

function parseQualityToNumber(quality) {
    return QUALITY_MAP[quality] || 0;
}

function getColorByLevel(level) {
    return COLOR_MAP[level] || '#ffffff';
}

function getQualityLabel(level) {
    return Object.keys(QUALITY_MAP).find(key => QUALITY_MAP[key] === level) || '';
}

function extractPlayerNames(tableRows) {
    const names = [];
    for (let i = 1; i < tableRows.length; i++) {
        const name = tableRows[i].getElementsByTagName('td')[0].innerText;
        if (names.indexOf(name) < 0) {
            names.push(name);
        }
    }
    return names;
}

function extractQualities(items) {
    const qualities = [];

    for (let i = 0; i < items.length; i++) {
        const tables = items[i].getElementsByTagName('div');
        const homeTable = tables[1].getElementsByTagName('table')[0]
            .getElementsByTagName('tbody')[0].getElementsByTagName('tr');
        const awayTable = tables[2].getElementsByTagName('table')[0]
            .getElementsByTagName('tbody')[0].getElementsByTagName('tr');

        const homeQualities = [];
        const awayQualities = [];

        for (let x = 1; x < homeTable.length; x++) {
            homeQualities.push(homeTable[x].getElementsByTagName('td')[1].innerText);
        }

        for (let x = 1; x < awayTable.length; x++) {
            awayQualities.push(awayTable[x].getElementsByTagName('td')[1].innerText);
        }

        i++;
        qualities.push({ home: homeQualities, away: awayQualities });
    }

    return qualities;
}

function convertQualitiesToNumbers(qualities) {
    return qualities.map(parseQualityToNumber);
}

function organizeSkillsByPlayer(qualitiesArray, numPlayers = 11) {
    const skillsPerPlayer = qualitiesArray.length / numPlayers;
    const playerSkills = {};

    SKILLS.forEach((skill, skillIndex) => {
        playerSkills[skill] = [];
        for (let i = 0; i < numPlayers; i++) {
            const index = skillIndex * numPlayers + i;
            playerSkills[skill].push(qualitiesArray[index]);
        }
    });

    return playerSkills;
}

function calculatePlayerTotal(playerSkills, playerIndex) {
    return SKILLS.reduce((total, skill) => total + playerSkills[skill][playerIndex], 0);
}

function generateTableHeader(headers) {
    let html = '<thead><tr>';
    html += '<th>Jogador</th>';

    headers.forEach(header => {
        html += `<th>${header}</th>`;
    });

    html += '<th>Total</th></tr></thead>';

    return html;
}

function generatePlayerRow(playerName, playerSkills, playerIndex) {
    const total = calculatePlayerTotal(playerSkills, playerIndex);
    let html = '<tr>';
    html += `<td title="${playerName}">${playerName}</td>`;

    SKILLS.forEach(skill => {
        const value = playerSkills[skill][playerIndex];
        const color = getColorByLevel(value);
        const label = getQualityLabel(value);
        html += `<td class="skill-cell" style="background-color:${color}" title="${label}">${value}</td>`;
    });

    html += `<td>${total}</td></tr>`;

    return html;
}

function generateTeamTable(teamName, headers, playerNames, playerSkills, totalTeam) {
    const label = teamName === 'CASA' ? '🏠 Time da Casa' : '✈️ Time Visitante';
    const teamClass = teamName === 'CASA' ? '' : 'away';

    let html = '<div class="team-container">';
    html += `<div class="team-title ${teamClass}">${label}</div>`;
    html += '<table class="stats-table">';
    html += generateTableHeader(headers);
    html += '<tbody>';

    for (let i = 0; i < playerNames.length; i++) {
        html += generatePlayerRow(playerNames[i], playerSkills, i);
    }

    html += '</tbody>';
    html += '<tfoot><tr>';
    html += `<td colspan="${headers.length + 2}">📊 Total: ${totalTeam} pontos</td>`;
    html += '</tr></tfoot>';
    html += '</table></div>';

    return html;
}

// Execução principal
(function() {
    const comparativo = document.getElementById("content_estatisticaComparacao");
    if (!comparativo) return;

    const items = comparativo.getElementsByTagName("span");

    // Extrair headers
    const headers = [];
    for (let i = 0; i < items.length; i++) {
        headers.push(normalizeHeader(items[i].innerText));
        i++;
    }

    // Extrair nomes dos jogadores
    const firstItem = items[0].getElementsByTagName('div');
    const homeTableRows = firstItem[1].getElementsByTagName('table')[0]
        .getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    const awayTableRows = firstItem[2].getElementsByTagName('table')[0]
        .getElementsByTagName('tbody')[0].getElementsByTagName('tr');

    const homePlayerNames = extractPlayerNames(homeTableRows);
    const awayPlayerNames = extractPlayerNames(awayTableRows);

    // Extrair e processar qualidades
    const qualitiesData = extractQualities(items);

    const homeQualitiesFlat = qualitiesData.flatMap(q => q.home);
    const awayQualitiesFlat = qualitiesData.flatMap(q => q.away);

    const homeQualitiesNumbers = convertQualitiesToNumbers(homeQualitiesFlat);
    const awayQualitiesNumbers = convertQualitiesToNumbers(awayQualitiesFlat);

    // Organizar habilidades por jogador
    const homePlayerSkills = organizeSkillsByPlayer(homeQualitiesNumbers);
    const awayPlayerSkills = organizeSkillsByPlayer(awayQualitiesNumbers);

    // Calcular totais
    const totalHome = homeQualitiesNumbers.reduce((sum, val) => sum + val, 0);
    const totalAway = awayQualitiesNumbers.reduce((sum, val) => sum + val, 0);

    // Gerar HTML
    let finalHtml = STYLES;
    finalHtml += '<div class="comparativo-wrapper">';
    finalHtml += generateTeamTable('CASA', headers, homePlayerNames, homePlayerSkills, totalHome);
    finalHtml += generateTeamTable('VISITANTE', headers, awayPlayerNames, awayPlayerSkills, totalAway);
    finalHtml += '</div>';

    $(comparativo).html(finalHtml);
})();