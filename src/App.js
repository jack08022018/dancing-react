import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import './App.css';
import Login from './page/login/LoginPage';
import StudentInfo from './page/studentInfo/StudentInfoPage';

import { useState } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Error from './pages/Error';
import SharedLayout from './pages/SharedLayout';
import SingleProduct from './pages/SingleProduct';
import Dashboard from './pages/Dashboard';
import LoginNew from './pages/Login';
import ProtectedRoute from './pages/ProtectedRoute';
import SharedProductLayout from './pages/SharedProductLayout';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
        <Route exact path="/login" key={0} element={<div className="center-content"><Login /></div>} />
          <Route exact path="/info" key={1} element={<div className="center-content"><StudentInfo /></div>} />
        </Routes>
      </Router>
    </Provider>
  );

  // const [user, setUser] = useState(null);
  // return (
  //   <BrowserRouter>
  //     <Routes>
  //       <Route path='/' element={<SharedLayout />}>
  //         <Route index element={<Home />} />
  //         <Route path='about' element={<About />} />

  //         <Route path='products' element={<SharedProductLayout />}>
  //           <Route index element={<Products />} />
  //           <Route path=':productId' element={<SingleProduct />} />
  //         </Route>

  //         <Route path='login' element={<Login setUser={setUser}></Login>} />
  //         <Route
  //           path='dashboard'
  //           element={
  //             <ProtectedRoute user={user}>
  //               <Dashboard user={user} />
  //             </ProtectedRoute>
  //           }
  //         />
  //         <Route path='*' element={<Error />} />
  //       </Route>
  //     </Routes>
  //   </BrowserRouter>
  // );
}

export default App;