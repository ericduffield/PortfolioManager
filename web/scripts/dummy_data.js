import { AssetClass, Side, Status, Type } from './enums.js';

const dummy_positions = [
    ['AAPL', 'Stock', 100, 200],
    ['MSFT', 'Stock', 70, 250],
    ['NVDA', 'Stock', 80, 250],
    ['META', 'Stock', 60, 250],
    ['GOOG', 'Stock', 40, 250],
    ['AMZN', 'Stock', 50, 250],
    ['BTC', 'Crypto', 0.2445, 15468.39],
    ['ETH', 'Crypto', 1.2323, 3209.80],
    ['USDT', 'Crypto', 10000, 1],
    ['BNB', 'Crypto', 20.34, 576.83],
    ['SOL', 'Crypto', 12.13, 185.92],
    ['USDC', 'Crypto', 10000, 0.9999],
    ['SPY', 'ETF', 80, 250],
    ['VOO', 'ETF', 80, 250],
    ['VTI', 'ETF', 80, 250],
    ['QQQ', 'ETF', 80, 250],
    ['US1Y', 'Bond', 1000, 250],
    ['US5Y', 'Bond', 150, 250],
    ['US10Y', 'Bond', 150, 250],
    ['US30Y', 'Bond', 150, 250]
]

const dummy_orders = [
    [1, 'MSFT', Side.Buy, Type.Market, AssetClass.Stock, 100, 100, 'l-kesJn07NNNYzeaGnWJ', Status.Filled, 100],
    [2, 'AAPL', Side.Sell, Type.Market, AssetClass.Stock, 50, 100, 'tu0lj408rhA3l8t2XoBz', Status.PartiallyFilled, 50],
    [3, 'MSFT', Side.Buy, Type.Market, AssetClass.Stock, 100, 100, 'Cw9E7m80aHGEiTnBv6hN', Status.Rejected, 100],
    [4, 'AAPL', Side.Sell, Type.Market, AssetClass.Stock, 50, 100, 'g1a-OP5xjU2eUxr6xcGE', Status.New, 50],
    [5, 'MSFT', Side.Buy, Type.Market, AssetClass.Stock, 100, 100, '42sVu2XbvU128vyzKQ3V', Status.Filled, 100],
    [6, 'AAPL', Side.Sell, Type.Market, AssetClass.Stock, 50, 100, 'WKOWV1q6ZrMA6jrs6YT7', Status.Filled, 50],
    [7, 'MSFT', Side.Buy, Type.Market, AssetClass.Stock, 100, 100, 'wCMi6LmT8I8EO1hfdwfh', Status.PartiallyFilled, 100],
    [8, 'AAPL', Side.Sell, Type.Market, AssetClass.Stock, 50, 100, 'FXv7eGXifqlPzmW6VCWf', Status.Filled, 50],
    [9, 'MSFT', Side.Buy, Type.Market, AssetClass.Stock, 100, 100, 'd2SHxFRpNTX5UlUIYPAK', Status.New, 100],
    [10, 'AAPL', Side.Sell, Type.Market, AssetClass.Stock, 50, 100, 'BrgwAuLmHgbINVFzD3Ri', Status.Rejected, 50],
    [11, 'MSFT', Side.Buy, Type.Market, AssetClass.Stock, 100, 100, 'LcG1RuwwTK8GvLERsMnJ', Status.New, 100],
    [12, 'AAPL', Side.Sell, Type.Market, AssetClass.Stock, 50, 100, 'C3as2jy8Z3yV1n8l5HgF', Status.Filled, 50]]

const dummy_performance = [
    ["2023-09-01",  345689.56],
    ["2023-10-01",  365464.90],
    ["2023-11-01",  354685.47],
    ["2023-12-01",  376855.23],
    ["2024-01-01",  366855.68],
    ["2024-02-01",  395000.67],
    ["2024-03-01",  406340.93],
    ["2024-04-01",  422674.58],
    ["2024-05-01",  414468.92],
    ["2024-06-01",  425152.71],
    ["2024-07-01",  433675.45],
]

const dummy_cash = 113957.23;

export { dummy_positions, dummy_orders, dummy_performance, dummy_cash };