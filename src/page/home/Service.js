import { setName } from './Slice'

export const setHomeName = (newName) => dispatch => {
  dispatch(setName(newName));
}