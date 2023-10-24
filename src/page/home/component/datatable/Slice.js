import { 
  createAsyncThunk,
  createSlice,
  // current,
} from '@reduxjs/toolkit';
import { handleError, addKeyToList } from '../../../../app/CommonUtils';
import axios from 'axios'

const initialState = {
  data: {
    content: [],
    total: 0,
    currentPage: 0
  },
  loading: false
};

// function test() {
//   let arr = {};
//   let a = arr.a.b;
// }

export const getUsersAsync = createAsyncThunk('datatable/getUsers',
  async (params, thunkAPI) => {
    try {
      // test();
      console.log(params);
      const response = await axios({
        method: 'post',
        url: `/jpa/api/products`,
        data: params
      });
      return response.data;
    } catch (e) {
      console.log(e)
      handleError(e);
    }
  }
);

export const Slice = createSlice({
  name: 'table',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAsync.pending, (state, action) => {
        // console.log(current(state))
        state.loading = true;
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.data.content = addKeyToList(action.payload.content);
        state.data.total = action.payload.totalElements;
        state.data.currentPage = action.payload.number;
        state.loading = false;
      })
      .addCase(getUsersAsync.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

// export const { setLoading } = Slice.actions;

export default Slice.reducer;

