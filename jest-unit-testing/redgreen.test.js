import Portfolio from './redgreen.js'; 

test('portfolio is created empty', () => {
    const portfolio = new Portfolio();
    expect(portfolio.isEmpty()).toBe(true);
});

test('portfolio returns number of unique ticker symbols', () => {
    const portfolio = new Portfolio();
    portfolio.addStock('GME', 5);
    portfolio.addStock('RBLX', 10);
    expect(portfolio.getTickerCount()).toBe(2);
});

test('purchase shares of a symbol', () => {
    const portfolio = new Portfolio();
    portfolio.purchase('KYLIE', 5);
    expect(portfolio.getShares('KYLIE')).toBe(5);
});

test('sell shares of a symbol', () => {
    const portfolio = new Portfolio();
    portfolio.purchase('KYLIE', 10);
    portfolio.sell('KYLIE', 5);
    expect(portfolio.getShares('KYLIE')).toBe(5);
});

test('retrieve the number of shares for a symbol', () => {
    const portfolio = new Portfolio();
    portfolio.purchase('KYLIE', 10);
    expect(portfolio.getShares('KYLIE')).toBe(10);
});

test('portfolio only keeps owned symbols', () => {
    const portfolio = new Portfolio();
    portfolio.purchase('KYLIE', 10);
    portfolio.sell('KYLIE', 10);
    expect(portfolio.getShares('KYLIE')).toBe(0);
    expect(portfolio.hasSymbol('KYLIE')).toBe(false);
});

test('exception is thrown when trying to sell too many shares', () => {
    const portfolio = new Portfolio();
    portfolio.purchase('KYLIE', 10);
    expect(() => {
        portfolio.sell('KYLIE', 15);
    }).toThrow('ShareSaleException: not enough shares');
});