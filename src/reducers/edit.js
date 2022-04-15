const initialState = {
  editId: 0,
  currentId: 0,
  isEditingMode: false,
};

function edit(state = initialState, action) {
  switch (action.type) {
  case 'SET_EDIT_ID':
    return {
      ...state,
      editId: action.id,
      isEditingMode: true,
    };
  case 'SET_CURRENT_ID':
    return {
      ...state,
      currentId: action.id,
      isEditingMode: false,
    };
  case 'RESET_EDIT_MODE':
    return {
      ...state,
      isEditingMode: false,
    };
  default:
    return state;
  }
}

export default edit;
