import { Order, productsDict } from './classes.js';
import { dollarFormatter, percentageFormatter, shortFormatter } from './baseline.js';
import { PositionManager } from './positionManager.js';
import { getOrders, getCash, sendOrder } from './api.js';
import { Styles, Side, Type, Status } from './enums.js';

let cash = 0;
let positionManager = new PositionManager();
let positions = {};
let orders = [];
let productInfo = {};
let dummy = false;

$(document).ready(function () {
    $('select').selectize({
        sortField: 'text'
    });
});

// Add all names to select dropdown
let select = document.querySelector("#ticker-select");
for (let key in productsDict) {
    let option = document.createElement("option");
    option.value = key;
    option.text = key;
    select.appendChild(option);
}

var eventHandler = function (name) {
    return function () {
        try {
            updateMarketData(arguments[0]);
            updateSharesOwned(arguments[0]);
            updateLimitPrice(arguments[0]);
        } catch (e) { }
    };
}

$('#ticker-select').selectize({
    onChange: eventHandler('onChange'),
});

const orderStatusDict = {
    [Status.Filled]: "#78B36C",
    [Status.PartiallyFilled]: "#C67C53",
    [Status.Rejected]: "#A03A2C",
    [Status.New]: "#4483b8"
}

async function updateUI() {
    [[positions, productInfo, dummy], orders, cash] = await Promise.all([positionManager.getPositions(), getOrders(), getCash()]);

    //clear current rows
    document.querySelector("table tbody").innerHTML = "";

    orders.slice().reverse().forEach(ord => {
        let order = new Order(ord);
        const tr = document.createElement("tr");
        const trContent = `<td class="assetName"><div><img src="${order.logo}"><b>${order.ticker}</b></div></td>
                           <td>${order.side}</td>
                           <td>${order.quantity}</td>
                           <td>${dollarFormatter.format(order.average_price)}</td>
                           <td>${dollarFormatter.format(order.total_price)}</td>
                           <td>${order.order_type}</td>
                           <td style="color: ${orderStatusDict[order.status]}">${order.status}</td>
                           <td>${order.filled_quantity}</td>
                           <td>${order.display_id}</td>
                           `
        tr.innerHTML = trContent;
        document.querySelector("table tbody").appendChild(tr);
    })

    updateSharesOwned(select.value);
    updateLimitPrice(select.value);
    updateOrderValue();
    updateBuyingPower();
    updateLimitInput();


    if (!dummy) {
        // Enable submit button
        document.querySelector("#submit-order").disabled = false;
        document.querySelector("#submit-order").style.opacity = 1;
    }
    else {
        document.querySelector("#submit-order").value = "Demo site, cannot send orders";
    }
}

var invalidChars = [
    "-",
    "+",
    "e",
    "E"
];

document.querySelector("#price-input").addEventListener("input", function () {
    this.value = this.value.replace(/[e\+\-]/gi, "");
    updateOrderValue();
});

document.querySelector("#price-input").addEventListener("keydown", function (e) {
    if (invalidChars.includes(e.key)) {
        e.preventDefault();
    }
});

document.querySelector("#quantity-input").addEventListener("input", function () {
    this.value = this.value.replace(/[e\+\-]/gi, "");
    updateOrderValue();
});

document.querySelector("#quantity-input").addEventListener("keydown", function (e) {
    if (invalidChars.includes(e.key)) {
        e.preventDefault();
    }
});


// On type change
document.querySelector("#type-select").onchange = function () {
    updateOrderValue();
    updateLimitInput();
}

function updateSharesOwned(ticker) {
    let position = positions[ticker];
    document.querySelector("#shares").innerHTML = `Shares Owned: <span>${position ? position.quantity : 0}</span>`;
}

function updateLimitPrice(ticker) {
    let product = productInfo[ticker];
    document.querySelector("#price-input").value = product.current_price;
}

function updateOrderValue() {
    let quantity = document.querySelector("#quantity-input").value;
    let type = document.querySelector("#type-select").value;
    let orderValue = 0;
    if (type == Type.Market) {
        orderValue = quantity * productInfo[select.value].current_price;
    }
    else {
        orderValue = quantity * document.querySelector("#price-input").value;
    }
    document.querySelector("#order-value").innerHTML = `Order Value: <span>${dollarFormatter.format(Math.abs(orderValue))}</span>`;
    document.querySelector("#order-value").classList = orderValue > cash ? Styles.Red : "";
}

function updateBuyingPower() {
    document.querySelector("#cash").innerHTML = `Buying Power: <span>${dollarFormatter.format(cash)}</span>`;
}

function updateLimitInput() {
    let type = document.querySelector("#type-select").value;
    let price_input = document.querySelector("#price-input");
    price_input.disabled = type == Type.Limit ? false : true;
}

function updateMarketData(ticker) {
    let product = productInfo[ticker];
    let market_data_div = document.querySelector("#market-data");

    market_data_div.innerHTML = `<p id="product"><b>${ticker}</b>&nbsp;<span>${productsDict[ticker].name}</span></p>`
    market_data_div.innerHTML += `<p id="price"><span>${dollarFormatter.format(product.current_price)}</span></p>`
    market_data_div.innerHTML += `<div id="change">Change: <span class="${product.day_change > 0 ? Styles.Green : Styles.Red}">${dollarFormatter.format(product.day_change)} (${percentageFormatter.format(product.day_change_percentage)})</span></div>`
    market_data_div.innerHTML += `<div id="bid-ask">Bid: <span>${dollarFormatter.format(product.bid)}</span> Ask: <span>${dollarFormatter.format(product.ask)}</span></div>`
    market_data_div.innerHTML += `<p id="volume">Volume: <span>${shortFormatter.format(product.volume)}</span></p>`
    market_data_div.innerHTML += `<p id="market-cap">Market Cap: <span>${shortFormatter.format(product.market_cap)}</span></p>`
}

await updateUI();

$('#orders').css('display', 'table')
$('#orders-loading').css('display', 'none')

updateMarketData(select.value, productInfo);

document.querySelector("#submit-order").onclick = async function () {
    let ticker = document.querySelector("#ticker-select").value;
    let type = document.querySelector("#type-select").value;
    let side = document.querySelector("#side-select").value;
    let quantity = document.querySelector("#quantity-input").value;
    let price = type == Type.Limit ? document.querySelector("#price-input").value : productInfo[ticker].current_price;

    if (quantity == "" || quantity <= 0) {
        alert("Invalid quantity. Please enter a positive number.");
        return;
    }

    if (type == Type.Limit && (price == "" || price <= 0)) {
        alert("Invalid limit price. Please enter a positive number.");
        return;
    }

    if (side == Side.Sell) {
        let position = positions[ticker];
        if (!position || position.quantity < quantity) {
            alert("You do not own enough shares to sell this quantity.");
            return;
        }
    }

    if (side == Side.Buy) {
        let total_price = quantity * price;
        if (total_price > cash) {
            alert("Insufficient buying power for this order.");
            return;
        }
    }

    let response = await sendOrder(JSON.stringify({
        ticker: ticker,
        asset_class: productInfo[ticker].asset_class,
        side: side,
        type: type,
        quantity: quantity,
        price: price
    }));

    console.log(response);

    // clear form
    document.querySelector("#quantity-input").value = 1;
    document.querySelector("#price-input").value = "";

    // update ui
    await updateUI();
}