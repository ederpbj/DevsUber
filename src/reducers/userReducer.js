const initialState = {
  token: '',
  name: '',
  history: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NAME':
      return {...state, name: action.payload.name};
      break;
    case 'SET_TOKEN':
      return {...state, token: action.payload.token};
      break;
    case 'SET_HISTORY':
      return {...state, history: action.payload.history};
      break;
  }

  return state;
};
