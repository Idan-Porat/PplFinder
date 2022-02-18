import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from 'react-router-dom';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const NavBar = () => {
  const [value, setValue] = useState(0);
  const history = useHistory();
  const urlAddress = useLocation();
  const handleClickHomeTab = () => {
    setValue(0);
    history.push('/')
  }

  const handleClickFavoritesTab = () => {
    setValue(1);
    history.push("/favorites");
  }

  const pathName = (urlAddress.pathname === "/favorites") ? "/favorites" : '/';
  useEffect(() => {
    if(pathName === "/favorites") {
      setValue(1);
    } else {
      setValue(0)
    }
  })


  return ( 
    <AppBar position="static" color="transparent" style={{ position: "fixed", top: 0 }}>
      <Tabs
        value={value}
        aria-label="Navigation"
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Home" index={0} onClick={handleClickHomeTab} />
        <Tab label="Favorites" index={1} onClick={handleClickFavoritesTab} />
      </Tabs>
    </AppBar>
  );
};

export default NavBar;
