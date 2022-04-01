// Coloque aqui suas actions

import { fetchAPICurrencies } from '../services/api';

export const login = (value) => ({ type: 'LOGIN', value });
export const totalExpenses = (value) => ({ type: 'TOTAL', value });
const getCurrencies = (value) => ({ type: 'GET_CURRENCIES', value });
const actionRequestAPI = () => ({ type: 'REQUEST_API' });
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
