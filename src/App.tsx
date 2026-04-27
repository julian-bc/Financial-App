import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Account from './pages/Account';
import Login from './pages/Login';
import Register from './pages/Register';
import TransactionHistory from './pages/TransactionHistory';
import SessionProvider from './context/SessionProvider';
import ProductProvider from './context/ProductProvider';
import NotificationProvider from './context/NotificationProvider';
import ProtectedRoute from './auth/ProtectedRoute';

function App() {
  return (
    <NotificationProvider>
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
              <Route 
                path='/transaction-history' 
                element={
                  <ProtectedRoute>
                    <TransactionHistory/>
                  </ProtectedRoute>
                } 
              />
              <Route path='/login' element={<Login/>} />
              <Route path='/register' element={<Register/>} />
            </Routes>
          </BrowserRouter>
        </ProductProvider>
      </SessionProvider>
    </NotificationProvider>
  );
}

export default App
