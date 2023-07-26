import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { NavLink } from "react-router-dom";
import {useAuth} from "../hooks/Auth";
import logo from "../nutritrack_logo.png";
import { withTheme } from "@emotion/react";

const pages = [
  { name: "Statistics", link: "/statistics" },
  { name: "Food logs", link: "/foodlogs" },
  { name: "Admin", link: "/admin" }, // TODO: edit to only display for admins
];
const settings = ["Profile", "Account", "Logout"];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const {cookies, logout} = useAuth();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" color='white' elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <img src={logo} />
          </NavLink>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "flex-end", paddingRight: "20px" }}>
            {pages.map((page) => (
              <NavLink to={page.link} style={{ textDecoration: "none" }}>
                <Button
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}>
                  {page.name}
                </Button>
              </NavLink>
            ))}
          </Box>

          {cookies.token ? <Button variant="contained" color='dark_green' onClick={logout}>Logout</Button> : 
          <NavLink to="/login" style={{ textDecoration: "none", color: "white" }}>
            <Button variant="contained" color='dark_green'>Login</Button>
          </NavLink>
        }
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
