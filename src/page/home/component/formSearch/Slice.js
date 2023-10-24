import { 
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { handleError, addKeyToList } from '../../../../app/CommonUtils';
import axios from 'axios'

const initialState = {
  ownerArray: [],
  categoryArray: [],
  initializing: true,
};

export const getAllDataAsync = createAsyncThunk('formSearch/getAllData',
  async () => {
    try {
      const response = await axios({
        method: 'post',
        url: `/jpa/api/getProductData`,
      });
      return response.data;
    } catch (e) {
      console.log(e)
      handleError(e);
    }
  }
);

export const Slice = createSlice({
  name: 'formSearch',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllDataAsync.fulfilled, (state, action) => {
        console.log(action.payload)
        state.ownerArray = addKeyToList(action.payload.ownerArray);
        state.categoryArray = addKeyToList(action.payload.categoryArray);
        state.initializing = false;
      })
  },
});

export const { decrement } = Slice.actions;

export default Slice.reducer;

