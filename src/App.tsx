import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Account from './pages/Account';
import Login from './pages/Login';
import Register from './pages/Register';
import SessionProvider from './context/SessionProvider';
import ProtectedRoute from './auth/ProtectedRoute';

function App() {
  return (
    <SessionProvider>
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
    </SessionProvider>
  );
}

export default App
