import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Login from './page/login/LoginPage';
import StudentInfo from './page/studentInfo/StudentInfoPage';
import Home from './page/home/HomePage';

// import Home from './page/Home';
import About from './page/About';
import Error from './page/Error';
import MainLayout from './layouts/mainLayout/MainLayout';

function App() {
  const [user, setUser] = useState(null);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* <Route path='/' element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path='about' element={<About />} />

            <Route path='products' element={<SharedProductLayout />}>
              <Route index element={<Products />} />
              <Route path=':productId' element={<SingleProduct />} />
            </Route>

            <Route path='login' element={<LoginNew setUser={setUser}></LoginNew>} />
            <Route
              path='dashboard'
              element={
                <ProtectedRoute user={user}>
                  <Dashboard user={user} />
                </ProtectedRoute>
              }
            />
            <Route path='*' element={<Error />} />
          </Route> */}
          <Route path='/' element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='about' element={<About />} />

            <Route path='*' element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;