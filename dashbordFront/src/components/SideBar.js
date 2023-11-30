import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <div className="sidebar-container">
      <Sidebar className="sidebar">
        <div className="logo"></div>
        <Menu
        // menuItemStyles={{
        //   button: ({ level, active, disabled }) => {
        //     if (level === 0)
        //       return {
        //         color: disabled ? "#ffe6f2" : "#000000",
        //         backgroundColor: active ? "#fffff" : "#ffda7e",
        //       };
        //   },
        // }}
        >
          <div>
            <MenuItem component={<Link to="/players" />}>
              {" "}
              List players{" "}
            </MenuItem>
            <MenuItem component={<Link to="/login" />}> Login </MenuItem>
            <MenuItem component={<Link to="/register" />}> Register </MenuItem>
            <MenuItem component={<Link to="/players" />}>
              {" "}
              All players{" "}
            </MenuItem>
            <MenuItem component={<Link to="/addplayer" />}>
              {" "}
              Add player{" "}
            </MenuItem>
            <MenuItem> Performance </MenuItem>
          </div>

          <SubMenu label="Account">
            <MenuItem> Logout </MenuItem>
            <MenuItem> Profil </MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
    </div>
  );
}

export default SideBar;
