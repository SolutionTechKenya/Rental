import React from 'react'
import { useNavigate } from "react-router-dom";
import { LogOut } from 'lucide-react';
// import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants';
import { useAuth } from '../admin/AuthProvider'
// import '../../css/LogoutButton.css';

function LogoutButton() {
    const { logout } = useAuth();
    return (
    
    <>
        <button className="sidebar-item logout" onClick={logout}>
                <LogOut size={20} />
                <span onClick={logout}>Log out</span>
            </button>
    </>
    )
}

export default LogoutButton