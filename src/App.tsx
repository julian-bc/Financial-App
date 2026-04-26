import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Account from './pages/Account';
import Login from './pages/Login';
import Register from './pages/Register';
import SessionProvider from './context/SessionProvider';
import ProductProvider from './context/ProductProvider';
import ProtectedRoute from './auth/ProtectedRoute';

function App() {
  return (
    <SessionProvider>
      <ProductProvider>
        <BrowserRouter>
          <Routes>
            <Route 
              index 
              element={
                <ProtectedRoute>
                  <Account/>
                </ProtectedRoute>
              } />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
          </Routes>
        </BrowserRouter>
      </ProductProvider>
    </SessionProvider>
  );
}

export default App
