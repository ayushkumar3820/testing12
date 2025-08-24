import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PostDetail from './pages/PostDetail';

import { Provider } from 'react-redux';
import store from './redux/store';
import { AuthProvider } from './context/authContext';

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <Navbar />
          <div className="container mt-3">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/posts/:id" element={<PostDetail />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </Provider>
  );
}

export default App;
