export default class Portfolio {
    constructor() {
        this.stocks = {};
    }

    hasSymbol(symbol) {
        return this.stocks.hasOwnProperty(symbol);
    }

    getStocks() {
        return this.stocks;
    }

    getTickerCount() {
        return Object.keys(this.stocks).length;
    }

    getShares(symbol) {
        return this.stocks[symbol] || 0;
    }

    isEmpty() {
        return Object.keys(this.stocks).length === 0;
    }

    addStock(ticker, quantity) {
        this.stocks[ticker] = (this.stocks[ticker] || 0) + quantity; // if it has a value, uses if. if not, uses 0. 
    }

    purchase(symbol, shares) {
        this.stocks[symbol] = (this.stocks[symbol] || 0) + shares;
    }

    sell(symbol, shares) {
        if (!this.stocks[symbol] || this.stocks[symbol] < shares) {
            throw new Error('ShareSaleException: not enough shares');
        }
        this.stocks[symbol] -= shares;
        if (this.stocks[symbol] === 0) {
            delete this.stocks[symbol];
        }
    }
    
}


