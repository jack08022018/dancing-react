import { message } from 'antd';
// import { useNavigate } from 'react-router-dom';
// const navigate = useNavigate();

export function handleError(e) {
  console.log(e);
  let msgError = '';

  // error before send request
  if(e.response === undefined) {
    msgError = e.message;
  }
  if(e.response !== undefined) {
    console.error(e.response.data);
    let status = e.response.status;
    if(status !== 500) {
      msgError = e.response.statusText;
    }
    if(status === 500) {
      msgError = typeof e.response.data === 'string' ? e.response.data : e.response.data.message;
    }
    if(status === 401) {
      msgError = typeof e.response.data === 'string' ? e.response.data : e.response.data.message;
      document.location.href = '/login';
      throw e;
    }
  }
  message.open({
    type: 'error',
    content: msgError,
    duration: 2,
  });
  // throw new Error(msgError);
}

export function addKeyToList(data) {
  if(!Array.isArray(data)) {
    return data;
  }
  let result = data.map((s, index) => {
    s.key = index;
    return s;
  });
  return result;
}

export function formatStringDate(input, separator) {
  input = input.trim();
  if(input.length !== 8) {
      return '';
  }
  return input.substr(0,4) + separator + input.substr(4,2) + separator + input.substr(6,2);
}

export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
