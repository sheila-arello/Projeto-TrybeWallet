// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const initialState = {
  isLoading: false,
  isQuotationAvailable: false,
  currencies: [],
  expenses: [],
  currQuotation: {},
  total: 0,
};

function wallet(state = initialState, action) {
  switch (action.type) {
  case 'REQUEST_API':
    return {
      ...state,
      isLoading: true,
    };
  case 'FAILED_REQUEST':
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  case 'GET_CURRENCIES':
    return {
      ...state,
      currencies: action.value,
      isLoading: false,
    };
  case 'GET_CURR_QUOTATION':
    return {
      ...state,
      currQuotation: action.current,
      isLoading: false,
      isQuotationAvailable: true,
    };
  case 'RESET_QUOTE':
    return {
      ...state,
      isQuotationAvailable: false,
    };
  case 'SET_TOTAL':
    return {
      ...state,
      total: action.total,
    };
  case 'ADD_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
      isQuotationAvailable: false,
    };
  case 'SET_ALL_EXPENSES':
    return {
      ...state,
      expenses: action.expenses,
      isQuotationAvailable: false,
    };
  default:
    return state;
  }
}
export default wallet;
