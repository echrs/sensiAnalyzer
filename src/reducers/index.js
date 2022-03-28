import { combineReducers } from 'redux';

import user from './user';
import ingredient from './ingredient';

export const reducers = combineReducers({ user, ingredient });