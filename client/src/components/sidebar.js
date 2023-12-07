import React, { useState, useEffect } from 'react';
import { BiFolderOpen , BiLogOut, BiUser } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import { FaBars, FaRegChartBar } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { useDispatch } from "react-redux";
import *as Action from "./../redux/taskreducer"
import { useNavigate } from 'react-router-dom';
import { MdShoppingCart } from 'react-icons/md';
import { FaBriefcase, FaUser } from 'react-icons/fa';

export const NavBar = () => {
    const dispatch=  useDispatch();

    const [isOpen, setIsOpen] = useState(false); 

    const toggle = () => setIsOpen(!isOpen);
    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(Action.clearState())
        navigate('/login');
      };

    const menuItem = [
        {
            path: "/",
            name: "TASKS",
            icon: <AiFillHome />
        },
       
       
    ];
    const navigate = useNavigate(); 

   
    return (
        <div>
            <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
                <div className="top_section">
                    <p style={{ display: isOpen ? "block" : "none" }} className="logo">Logo</p>
                    <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                {menuItem.map((item, index) => (
                    <NavLink to={item.path} key={index} className="link">
                        <div className="icon">{item.icon}</div>
                        <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
                    </NavLink>
                ))}
               

                <div className="link">
                <button className="icon" onClick={handleLogout}><BiLogOut /></button>
                <div style={{ display: isOpen ? "block" : "none" }} className="link_text  ">logout</div>

                </div>
            </div>
        </div>
    );
};
