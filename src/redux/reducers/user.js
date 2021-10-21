import { SAVE_USER } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  avatar: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_USER:
    return {
      name: action.data.name,
      email: action.data.email,
      avatar: action.data.avatar,
    };
  default:
    return state;
  }
};

export default userReducer;
