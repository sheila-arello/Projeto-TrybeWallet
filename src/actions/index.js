// Coloque aqui suas actions

import fetchAPICurrencies from '../services/api';

export const login = (value) => ({ type: 'LOGIN', value });
export const setExpenses = (expense) => ({ type: 'SET_EXPENSES', expense });

const actionSetTotal = (total) => ({ type: 'SET_TOTAL', total });
const getCurrencies = (value) => ({ type: 'GET_CURRENCIES', value });
const getQuotation = (current) => ({ type: 'GET_CURR_QUOTATION', current });
const actionRequestAPI = () => ({ type: 'REQUEST_API' });
// const haveQuotation = () => ({ type: 'HAVE_QUOTE' });
// const resetQuotation = () => ({ type: 'RESET_QUOTE' });
const failedRequest = (payload) => ({ type: 'FAILED_REQUEST', payload });
export function fetchCurrencies() {
  return async (dispatch) => {
    dispatch(actionRequestAPI());
    try {
      const data = await fetchAPICurrencies();
      const currencies = Object.keys(data).filter((elem) => elem !== 'USDT');
      // console.log(currencies);
      dispatch(getCurrencies(currencies));
    } catch (error) {
      dispatch(failedRequest(error));
    }
  };
}

export function fetchCurrQuotation() {
  return async (dispatch) => {
    dispatch(actionRequestAPI());
    try {
      const data = await fetchAPICurrencies();
      const currencies = data;
      // console.log(currencies);
      dispatch(getQuotation(currencies));
    } catch (error) {
      dispatch(failedRequest(error));
    }
  };
}

export function setTotal() {
  return (dispatch, getState) => {
    const { expenses } = getState().wallet;
    const total = expenses.reduce((acc, expense) => {
      const expenseValue = parseFloat(expense.value);
      const index = expense.currency;
      const cambio = parseFloat(expense.exchangeRates[index].ask);
      const expenseTotal = expenseValue * cambio;
      console.log(expenseTotal);
      return acc + expenseTotal;
    }, 0);
    dispatch(actionSetTotal(total));
  };
}
