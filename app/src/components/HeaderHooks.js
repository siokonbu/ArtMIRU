import React, {useState} from 'react';
import MenuButton from './MenuButton';
import Menu from './Menu';
import MenuItem from './MenuItem';
import { useAuth0 } from "../react-auth0-spa";


import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

function HeaderHooks() {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleMenuClick() {
    setMenuOpen(!menuOpen);
  }

  function handleLinkClick() {
    setMenuOpen(false);
  }

  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div className="header">
      <a className="header-logo" href='/'>ArtMIRU</a>
      <div className="header-menu">
        <MenuButton open={menuOpen} onClick={()=>handleMenuClick()} color='#1D1D1D'/>
      </div>
      <Menu open={menuOpen}>
        <Link to="/">
          <MenuItem key={0} onClick={()=>{handleLinkClick();}}>Home</MenuItem>
        </Link>
        <Link to="/about">
          <MenuItem key={1} onClick={()=>{handleLinkClick();}}>About</MenuItem>
        </Link>
        <Link to="/archive">
          <MenuItem key={2} onClick={()=>{handleLinkClick();}}>アーカイブ</MenuItem>
        </Link>
        <div>
          {!isAuthenticated && (
            <MenuItem key={5} onClick={()=>{handleLinkClick();loginWithRedirect({});}}>ログイン</MenuItem>
          )}
          {isAuthenticated && (
            <Link to="/profile">
              <MenuItem key={4} onClick={()=>{handleLinkClick();}}>プロフィール編集</MenuItem>
            </Link>
          )}
          {isAuthenticated && (
            <MenuItem key={6} onClick={()=>{handleLinkClick();logout();}}>ログアウト</MenuItem>
          )}
        </div>
      </Menu>
    </div>
  );
}

export default HeaderHooks;
