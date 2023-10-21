import { 
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import * as Common from '../../app/CommonUtils';
import axios from 'axios';

const initialState = {
  classList: [],
  selectedClass: {
    name: '',
    mobile: '',
    idClass: 0
  },
  initializing: true,
  isAuthorize: true
};

export const getStudentDataAsync = createAsyncThunk('student/getStudentData',
  async (params, thunkAPI) => {
    try {
      console.log(`params: ${JSON.stringify(params)}`);
      const json = await axios({
        method: 'post',
        url: '/api/student/getStudentData',
        data: params,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      // console.log(json.data)
      if(json.data.status !== '00') {
        throw new Error(json.data.message);
      }
      let data = json.data.data;
      if(data.length === 0) {
        throw new Error('No class!');
      }
      data = data.map((s: any) => {
        s.tuitionFeeDate = s.tuitionFeeDate === undefined ? null : s.tuitionFeeDate;
        s.learningDate = Common.formatStringDate(s.learningDate, '/');
        s.status = s.status === undefined ? 'ABSENT' : s.status;
        s.weekday = s.weekday.charAt(0).toUpperCase() + s.weekday.slice(1).toLowerCase();
        return s;
      });
      const distinctList = data
        .filter((item: any, index: number, self: any) =>
            index === self.findIndex((obj: any) => obj.idClass === item.idClass)
        )
        .map((s: any) => {
          const dataEachClass = data.filter((item: any) => item.idClass === s.idClass);
          return {
            idClass: s.idClass,
            songTitle: s.songTitle,
            name: s.name,
            mobile: s.mobile,
            data: Common.deepClone(dataEachClass)
          };
        });
      console.log(distinctList);
      return distinctList;
      // return distinctList;
    } catch (e) {
      console.log(e)
      // Common.handleError(e);
      return Common.handleError(e);
    }
  }
);

export const Slice = createSlice({
  name: 'StudentInfo',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStudentDataAsync.fulfilled, (state, action) => {
        state.classList = Common.addKeyToList(action.payload);
        state.selectedClass = action.payload[0];
        state.initializing = false;
      })
  },
});

export default Slice.reducer;
