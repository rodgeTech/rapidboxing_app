export const moneyFormat = (amount, symbol = '') => {
  const formattedAmount = amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  return `$${formattedAmount} ${symbol.toUpperCase()}`;
};
