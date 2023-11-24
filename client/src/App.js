import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import SetAvatar from './pages/SetAvatar';
import Home from './pages/Home';
import MainLayout from './components/layouts/MainLayout';
import Profile from './pages/Profile';
import Temp from './pages/Temp';
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/set-avatar/:id" element={<SetAvatar />} />
                <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />
                <Route path="/temp" element={<MainLayout><Temp/></MainLayout>} />
                <Route path="/" element={<MainLayout><Home /></MainLayout>} />
                <Route path="*" element={<MainLayout><Temp image={"skeleton.gif"} title={"Page not found"} content={"What do you want to find here? Come back now."}/></MainLayout>} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
