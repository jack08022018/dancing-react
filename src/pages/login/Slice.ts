import { 
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import * as Common from '../../app/CommonUtils';
import axios from 'axios';

const initialState = {
  isLoginSuccess: false
};

export const loginAsync = createAsyncThunk('student/login',
  async (params, thunkAPI) => {
    try {
      // console.log(`params: ${JSON.stringify(params)}`);
      const json = await axios({
        method: 'post',
        url: '/api/login',
        data: params,
      });
      // console.log(json.data)
      if(json.data.status !== '00') {
        throw new Error(json.data.message);
      }
      let data = json.data.data;
      return data;
    } catch (e) {
      console.log(e)
      Common.handleError(e);
      throw e;
    }
  }
);

export const Slice = createSlice({
  name: 'LoginPage',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        // console.log(action.payload)
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('username', action.payload.username);
        localStorage.setItem('role', action.payload.roles[0]);
        state.isLoginSuccess = true;
      })
  },
});

// export const { onCollapse, selectPage } = Slice.actions;

export default Slice.reducer;
