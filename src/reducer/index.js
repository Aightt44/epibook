import { combineReducers } from 'redux';

import { SET_USER_INFOS, UPDATE_PHOTO } from '../actions/user';

function user(state, action) {
  switch (action.type) {
    case SET_USER_INFOS:
      return {
        infos: action.infos
      };
    case UPDATE_PHOTO: {
      const res = {
        infos: { ...state.infos }
      };
      res.infos.photo = action.photo;
      return res;
    }
    default:
      return state == null ? {} : state;
  }
}

const rootReducer = combineReducers({
  user
});

export default rootReducer;
