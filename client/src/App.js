import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import SetAvatar from './pages/SetAvatar';
import Home from './pages/Home';
import MainLayout from './components/layouts/MainLayout';
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/set-avatar/:id" element={<SetAvatar />} />
                {/* <Route path="/" element={<Chat />} /> */}
                <Route path="/" element={<MainLayout><Home /></MainLayout>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
