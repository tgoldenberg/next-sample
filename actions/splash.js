import ACTION_TYPES from '../constants';

export const setSplashUser = (position, referralLink) => ({
  type: ACTION_TYPES.SET_SPLASH_USER,
  position,
  referralLink,
});
