import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IconContext } from 'react-icons';
import './btnstyles.css';

const SidebarButton = ({ to, title, icon }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const btnClass = isActive ? "btn-body active" : "btn-body";

  return (
    <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
      <IconContext.Provider value={{ size: "25px" }}>
        <div className={btnClass}>
          {icon}
          <span style={{ marginLeft: '7px' }}>{title}</span>
        </div>
      </IconContext.Provider>
    </Link>
  );
};

export default SidebarButton;
