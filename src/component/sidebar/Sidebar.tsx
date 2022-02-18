import React from "react";
import './index.css'
import { AiFillHome, AiOutlineSync } from 'react-icons/ai'
import { Link, NavLink, Router } from "react-router-dom";
const Sidebar = () => {
    return (
        <div className="sidebar">
            <NavLink
                exact={true}
                className={'item'}
                to={'/'}
            >
                <AiFillHome className="icon" />
                <span className="title">Staking</span>
            </NavLink>

            <NavLink
                className={'item'}
                to={'/bond'}
            >
                <AiOutlineSync className="icon" />
                <span className="title">Bond</span>
            </NavLink>

        </div>
    )
}

export default Sidebar