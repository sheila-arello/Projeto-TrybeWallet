// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// {
//   user: {
//     email: '',
//   },
//   wallet: {
//     currencies: [],
//     expenses: []
//   }
// }

// Esse reducer será responsável por tratar as informações da pessoa usuária
const initialState = {
  isLoading: false,
  currencies: [],
  expenses: [],
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
  case 'TOTAL':
    return {
      ...state,
      total: initialState.total, // action.value,
    };
  default:
    return state;
  }
}
export default wallet;
