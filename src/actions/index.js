// Coloque aqui suas actions

import fetchAPICurrencies from '../services/api';

export const login = (value) => ({ type: 'LOGIN', value });
export const setAllExpenses = (expenses) => ({ type: 'SET_ALL_EXPENSES', expenses });
export const addExpense = (expense) => ({ type: 'ADD_EXPENSE', expense });
export const uptExpense = (expenses) => ({ type: 'UPT_EXPENSE', expenses });
export const setEditId = (id) => ({ type: 'SET_EDIT_ID', id });
export const setCurrentId = (id) => ({ type: 'SET_CURRENT_ID', id });
export const resetEditMode = () => ({ type: 'RESET_EDIT_MODE' });

const actionSetTotal = (total) => ({ type: 'SET_TOTAL', total });
const getCurrencies = (value) => ({ type: 'GET_CURRENCIES', value });
const getQuotation = (current) => ({ type: 'GET_CURR_QUOTATION', current });
const actionRequestAPI = () => ({ type: 'REQUEST_API' });
// const haveQuotation = () => ({ type: 'HAVE_QUOTE' });
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
    try {
      const data = await fetchAPICurrencies();
      dispatch(getQuotation(data));
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
      return acc + expenseTotal;
    }, 0);
    dispatch(actionSetTotal(total));
  };
}
