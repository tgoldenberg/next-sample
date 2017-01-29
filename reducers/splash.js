import ACTION_TYPES from '../constants';

const initialState = {
  position: 0,
  referralLink: '',
};

const splash = (state = initialState, action) => {
  switch(action.type) {
    case ACTION_TYPES.SET_SPLASH_USER:
      return {
        position: action.position,
        referralLink: action.referralLink,
      };
    default:
      return state;
  }
};

export default splash;
