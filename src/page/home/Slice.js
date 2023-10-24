import { 
  createSlice,
  combineReducers,
  PayloadAction,
} from '@reduxjs/toolkit';
import tableReducer from './component/datatable/Slice';
import formSearchReducer from './component/formSearch/Slice'

const initialState = {
  name: 'Home page',
};

export const Slice = createSlice({
  name: 'homePage',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { setName } = Slice.actions;

const homeReducer = combineReducers({
  mainView: Slice.reducer,
  table: tableReducer,
  formSearch: formSearchReducer,
});
export default homeReducer;
