import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { useAuthDispatch, useUserValue } from "../../context/UserContextHooks";

function Nav() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );
  const user = useUserValue();
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleLogOut = () => {
    dispatch({
      type: "LOG_OUT",
      payload: {
        token: "",
        username: "",
        id: -1,
        isAuthenticated: false,
      },
    });
    window.localStorage.removeItem("auth_token");
    handleCloseUserMenu();
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to={"/"}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            HOME
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip
              title={user.isAuthenticated ? "Open menu" : "Authenticate"}
            >
              <IconButton
                data-testid="nav-menu"
               onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {user.isAuthenticated ? (
                  <Avatar alt="Remy Sharp">{user.username[0]}</Avatar>
                ) : (
                  <AccountCircleIcon sx={{ color: "white" }} fontSize="large" />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {user.isAuthenticated ? (
                [
                  <MenuItem
                    key="Profile"
                    onClick={() => {
                      navigate("/user/" + user.id);
                      handleCloseUserMenu();
                    }}
                  >
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>,
                  <MenuItem key="Log Out" onClick={handleLogOut}>
                    <Typography textAlign="center">Log Out</Typography>
                  </MenuItem>,
                ]
              ) : (
                <MenuItem key={"Log In"} onClick={handleCloseUserMenu}>
                  <Typography textAlign={"center"} component={Link} to="/login">
                    Log In
                  </Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Nav;
