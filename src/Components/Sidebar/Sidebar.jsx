import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { sidebarConfig } from "../../Utils/sidebarConfig";

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const location = useLocation();

  const toggleMenu = (index) => {
    setOpenMenu(openMenu === index ? null : index);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-body">
        {sidebarConfig.map((item, index) => (
          <div key={index} className="sidebar-item">
            {item.path ? (
              <Link
                to={item.path}
                className={`sidebar-main-item ${
                  location.pathname === item.path ? "active" : ""
                }`}
              >
                {item.icon && (
                  <span className="sidebar-icon">
                    {React.createElement(item.icon)}
                  </span>
                )}
                <span className="sidebar-title">{item.title}</span>
              </Link>
            ) : (
              <div
                className="sidebar-main-item"
                onClick={() => toggleMenu(index)}
              >
                {item.icon && (
                  <span className="sidebar-icon">
                    {React.createElement(item.icon)}
                  </span>
                )}
                <span className="sidebar-title">{item.title}</span>
              </div>
            )}

            {item.subItems && openMenu === index && (
              <div className="sidebar-sub-items">
                {item.subItems.map((subItem, subIndex) => (
                  <Link
                    key={subIndex}
                    to={subItem.path}
                    className={`sidebar-sub-item ${
                      location.pathname === subItem.path ? "active" : ""
                    }`}
                  >
                    {subItem.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
