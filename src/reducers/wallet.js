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
  currencies: [],
  expenses: [],
  total: 0,
};

function wallet(state = initialState, action) {
  switch (action.type) {
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
