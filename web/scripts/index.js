import { dollarFormatter, percentageFormatter } from './baseline.js';
import { PositionManager } from './positionManager.js';
import { AssetClass, Styles } from './enums.js';
import { getCash, getPerformance } from './api.js';

let positionManager = new PositionManager();

async function updateUI() {
    let investmentsValue = 0;
    let totalChange = 0;
    let dayChange = 0;
    let assetClasses = {
        [AssetClass.Stock]: 0,
        [AssetClass.Crypto]: 0,
        [AssetClass.ETF]: 0,
        [AssetClass.Bond]: 0
    }

    let [[positions, _], cash, performance] = await Promise.all([positionManager.getPositions(), getCash(), getPerformance()]);

    Object.values(positions).forEach(position => {
        const tr = document.createElement("tr");
        tr.id = position.ticker;
        let trContent = `<td class="assetName"><div><img src="${position.logo}"><b>${position.ticker}</b></div></td>
                         <td>${position.asset_class}</td>
                         <td>${position.quantity}</td>
                         <td>${dollarFormatter.format(position.average_price)}</td>
                          <td>${dollarFormatter.format(position.total_price)}</td>
                          <td>${dollarFormatter.format(position.current_price)}</td>
                          <td class="${position.day_change > 0 ? Styles.Green : Styles.Red}">${dollarFormatter.format(position.day_change)} (${percentageFormatter.format(position.day_change_percentage)})</td>
                          <td class="${position.total_change > 0 ? Styles.Green : Styles.Red}">${dollarFormatter.format(position.total_change)} (${percentageFormatter.format(position.total_change_percentage)})</td>`

        tr.innerHTML = trContent;
        document.querySelector("table tbody").appendChild(tr);

        assetClasses[position.asset_class] += position.total_current_value;
        investmentsValue += position.total_current_value;
        totalChange += position.total_change;
        dayChange += position.day_change;
    })
    let portfolioValue = investmentsValue + cash;

    document.querySelector("#investments-value").innerHTML = dollarFormatter.format(investmentsValue);
    document.querySelector("#portfolio-value").innerHTML = dollarFormatter.format(portfolioValue);
    document.querySelector("#cash").innerHTML = dollarFormatter.format(cash);

    document.querySelector("#total-change").innerHTML = dollarFormatter.format(totalChange) + " (" + percentageFormatter.format(totalChange / portfolioValue) + ")";
    document.querySelector("#day-change").innerHTML = dollarFormatter.format(dayChange) + " (" + percentageFormatter.format(dayChange / portfolioValue) + ")";
    document.querySelector("#total-change").classList = totalChange > 0 ? Styles.Green : Styles.Red;
    document.querySelector("#day-change").classList = dayChange > 0 ? Styles.Green : Styles.Red;

    $('.charts').css('display', 'grid')
    $('#charts').css('display', 'grid')
    $('#info').css('display', 'grid')
    $('.loading').css('display', 'none')
    $('#top-box').css('justify-content', 'space-between')
    $('#holdings').css('display', 'table')
    $('#holdings-loading').css('display', 'none')

    // Load google charts
    google.charts.setOnLoadCallback(drawCharts(assetClasses, cash));
    google.charts.setOnLoadCallback(drawPerformance(performance, portfolioValue));
}

function drawCharts(assetClasses, cash) {
    drawChart('asset-chart', Object.entries(assetClasses), 400);
    drawChart('all-chart', Object.entries(assetClasses).concat([["Cash", cash]]), 400);
    drawChart('stock-chart', positionManager.filterPositions(AssetClass.Stock));
    drawChart('crypto-chart', positionManager.filterPositions(AssetClass.Crypto));
    drawChart('etf-chart', positionManager.filterPositions(AssetClass.ETF));
    drawChart('bond-chart', positionManager.filterPositions(AssetClass.Bond));
}

// Draw the chart and set the chart values
function drawChart(id, values, width = 'none') {
    if (values.length == 0) return;

    var data = google.visualization.arrayToDataTable(values, true);
    // Optional; add a title and set the width and height of the chart
    var options = {
        backgroundColor: 'transparent',
        chartArea: { width: '100%', height: '100%' },
        legend: { position: 'right', textStyle: { fontSize: 18 }, alignment: 'center' },
        tooltip: { trigger: 'none' },
        pieSliceTextStyle: { color: '#edeffd', fontSize: 14 },
        colors: ['#4483b8', '#A03A2C', '#C67C53', '#9B7D8A', '#78B36C', '#4c8077', '#485270'],
        enableInteractivity: false,
        titlePosition: 'none',
        width: width,
    };

    var chart = new google.visualization.PieChart(document.getElementById(id));
    chart.draw(data, options);

    // docs: https://developers.google.com/chart/interactive/docs/gallery/piechart
}

function drawPerformance(performance, portfolioValue) {
    var data = new google.visualization.DataTable();
    data.addColumn('date');
    data.addColumn('number');
    data.addColumn({ type: 'string', role: 'tooltip' });

    performance.forEach(date => {
        data.addRow([new Date(date[0]), date[1], dollarFormatter.format(date[1])]);
    });

    data.addRow([new Date(), portfolioValue, dollarFormatter.format(portfolioValue)]);
    let options = {
        legend: 'none',
        titlePosition: 'none',
        height: 500,
        width: 1300,
        pointSize: 10,
        backgroundColor: 'transparent',
        hAxis: { format: 'MMM yyyy' },
        tooltip: { isHtml: true },
        series: {
            0: { color: '#16c784' },
        }
    };

    var chart = new google.visualization.LineChart(document.getElementById('performance-chart'));
    chart.draw(data, options);
}

google.charts.load('current', { 'packages': ['corechart'] });
google.charts.load('current', { 'packages': ['line'] });

updateUI();
