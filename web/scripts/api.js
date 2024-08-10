import { Endpoint } from './enums.js';

const API_URL = 'http://localhost:5000';

import { dummy_positions, dummy_orders, dummy_cash, dummy_performance } from './dummy_data.js';

const getApi = async (endpoint) => {
    return fetch(API_URL + endpoint)
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch((error) => {
            return false;
        });
}

const getPositions = async () => {
    let positions = await getApi(Endpoint.Positions);
    if (positions) return [positions, false];

    console.log("Error fetching positions, using dummy data");
    return [dummy_positions, true];
}

const getOrders = async () => {
    let orders = await getApi(Endpoint.Orders);
    if (orders) return orders;

    console.log("Error fetching orders, using dummy data");
    return dummy_orders;
}

const getCash = async () => {
    let cash = await getApi(Endpoint.Cash);
    if (cash) return cash;

    console.log("Error fetching cash, using dummy data");
    return dummy_cash;
}

const getPerformance = async () => {
    performance = await getApi(Endpoint.Performance);
    if (performance) return performance;

    console.log("Error fetching performance, using dummy data");
    return dummy_performance;
}

const sendOrder = async (body) => {
    return fetch(API_URL + Endpoint.Orders, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    })
        .then(response => {
            return response;
        })
        .catch((error) => {
            return error;
        });
}

export { getPositions, getOrders, getCash, getPerformance, sendOrder };