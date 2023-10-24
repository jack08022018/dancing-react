import { 
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import * as Common from '../../app/CommonUtils';
import axios from 'axios';

const initialState = {
  isLoginSuccess: false
};

export const checkAuthorityAsync = createAsyncThunk('student/checkAuthority',
  async (params, thunkAPI) => {
    try {
      let accessToken = localStorage.getItem('accessToken');
      if(!accessToken) {
        throw new Error('401');
      }
      const json = await axios({
        method: 'post',
        url: '/student/checkAuthority',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      return '200';
    } catch (e) {
      console.log(e)
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
      .addCase(checkAuthorityAsync.fulfilled, (state, action) => {
        // console.log(action.payload)
        // localStorage.setItem('accessToken', action.payload.accessToken);
        // localStorage.setItem('username', action.payload.username);
        // localStorage.setItem('role', action.payload.roles[0]);
        state.isLoginSuccess = true;
      })
  },
});

// export const { onCollapse, selectPage } = Slice.actions;

export default Slice.reducer;
