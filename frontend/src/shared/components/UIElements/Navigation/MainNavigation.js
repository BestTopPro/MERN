import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import MainHeader from "./MainHeader";
import SideDrawer from "./SideDrawer";
import BackDrop from '../BackDrop';
import "./MainNavigation.css";

const MainNavigation = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = ()=>{
      setDrawerIsOpen(true);
  }
  const closeDrawerHandler = () =>{
      setDrawerIsOpen(false);
  }

  return (
    <React.Fragment>
        {drawerIsOpen && <BackDrop onClick={closeDrawerHandler}/>}
      {
        <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
          <nav className="main-navigation__drawer-nav">
            <NavLinks />
          </nav>
        </SideDrawer>
      }
      <MainHeader>
        <button className="menu-navigation__menu-btn" onClick={openDrawerHandler}>
          <span/>
          <span/>
          <span/> 
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">MyPlaces</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
