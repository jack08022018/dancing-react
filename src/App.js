import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login/LoginPage';
import StudentInfo from './pages/studentInfo/StudentInfoPage';
import Error from './pages/error/Error';
import { Provider } from 'react-redux';
import { store } from './app/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={<Login />} />
            <Route path='login' element={<Login />} />
            <Route path="info" element={<div className="center-content"><StudentInfo /></div>} />

            <Route path='*' element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;