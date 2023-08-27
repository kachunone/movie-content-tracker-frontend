"use client";

import React, { useState, MouseEvent } from "react";
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
import MenuItem from "@mui/material/MenuItem";
import { MovieCreation } from "@mui/icons-material";
import LoginIcon from "@mui/icons-material/Login";
import { useContext } from "react";
import { AuthContext } from "@/context/auth";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import Divider from "@mui/material/Divider";
import Link from "next/link";
import Drawer from "@mui/material/Drawer";

const pages = [
  { option: "Discover", link: "/" },
  { option: "About", link: "/about" },
];
const userOptions = [{ option: "Watch List", link: "/watchlist" }];
const authOptions = [
  { option: "Login", link: "/login" },
  { option: "Sign Up", link: "/signup" },
];

export default function ResponsiveAppBar() {
  const router = useRouter();
  const [drawerState, setDrawerState] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [anchorElAuth, setAnchorElAuth] = useState<null | HTMLElement>(null);
  const { isLoggedIn, logout, setUsername, loggedInUser } =
    useContext(AuthContext);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenAuthMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElAuth(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseAuthMenu = () => {
    setAnchorElAuth(null);
  };

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "#081426" }}>
        <Container>
          <Toolbar disableGutters>
            <MovieCreation
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                color: "yellow",
                fontSize: "2rem",
              }}
            />
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                color: "yellow",
                textDecoration: "none",
              }}
            >
              CineTracker
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                onClick={() => {
                  setDrawerState(true);
                }}
              >
                <MenuIcon sx={{ color: "yellow", fontSize: "2rem" }} />
              </IconButton>
            </Box>
            <MovieCreation
              sx={{
                display: { xs: "none", sm: "flex", md: "none" },
                mr: 1,
                color: "yellow",
                fontSize: "2rem",
              }}
            />
            <Typography
              variant="h5"
              noWrap
              sx={{
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                color: "yellow",
                textDecoration: "none",
              }}
            >
              CineTracker
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Link
                  key={page.option}
                  href={`${page.link}`}
                  className="text-white m-2 transition duration-300 hover:text-yellow-500"
                >
                  {page.option}
                </Link>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0, display: "flex" }}>
              {isLoggedIn && (
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar sx={{ bgcolor: "orange", color: "black" }}>
                    {loggedInUser.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
              )}
              {!isLoggedIn && (
                <IconButton onClick={handleOpenAuthMenu} sx={{ p: 0 }}>
                  <LoginIcon
                    sx={{
                      color: "orange",
                      fontSize: "2rem",
                      display: { xs: "flex", md: "none" },
                      p: 0,
                    }}
                  ></LoginIcon>
                </IconButton>
              )}
              {!isLoggedIn && (
                <Box
                  sx={{ display: { xs: "none", md: "flex" }, gap: "0.2rem" }}
                >
                  <Button sx={{ color: "yellow" }}>
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button sx={{ color: "yellow" }}>
                    <Link href="/signup">Sign up</Link>
                  </Button>
                </Box>
              )}

              <Menu
                sx={{
                  ".MuiPaper-root": {
                    backgroundColor: "#201F28",
                    color: "#FFDB0E",
                  },
                  ".MuiMenuItem-root:hover": {
                    backgroundColor: "#EAB306",
                    color: "#201F28",
                  },
                  mt: "45px",
                }}
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
                <Typography
                  sx={{ textAlign: "center", p: "0.5rem", color: "white" }}
                >
                  Hi,{" "}
                  {loggedInUser.charAt(0).toUpperCase() + loggedInUser.slice(1)}
                  !
                </Typography>
                {userOptions.map((option) => (
                  <MenuItem key={option.option} onClick={handleCloseUserMenu}>
                    <Link href={`${option.link}`}>{option.option}</Link>
                  </MenuItem>
                ))}
                <Divider
                  sx={{
                    bgcolor: "yellowgreen",
                  }}
                />
                <MenuItem>
                  <Typography
                    onClick={() => {
                      logout();
                      setUsername("");
                      deleteCookie("token");
                      handleCloseUserMenu();
                      router.replace("/");
                    }}
                    sx={{
                      color: "red",
                      textAlign: "center",
                      width: "100%",
                    }}
                  >
                    Log Out
                  </Typography>
                </MenuItem>
              </Menu>
              <Menu
                sx={{
                  ".MuiPaper-root": {
                    backgroundColor: "#201F28",
                    color: "#FFDB0E",
                  },
                  ".MuiMenuItem-root:hover": {
                    backgroundColor: "#EAB306",
                    color: "#201F28",
                  },
                  mt: "45px",
                }}
                anchorEl={anchorElAuth}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElAuth)}
                onClose={handleCloseAuthMenu}
              >
                {authOptions.map((option) => (
                  <MenuItem key={option.option} onClick={handleCloseAuthMenu}>
                    <Link href={`${option.link}`}>{option.option}</Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        anchor={"left"}
        open={drawerState}
        onClose={() => {
          setDrawerState(false);
        }}
      >
        <Box
          sx={{
            width: 200,
            backgroundColor: "#081426",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <MovieCreation
            sx={{
              mt: "2rem",
              color: "yellow",
              fontSize: "2rem",
            }}
          />
          <Typography
            variant="h6"
            noWrap
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              color: "yellow",
              textDecoration: "none",
            }}
          >
            CineTracker
          </Typography>
          <Divider
            sx={{
              width: "100%",
              bgcolor: "yellowgreen",
              m: "1rem",
            }}
          />
          {pages.map((page) => (
            <Link
              key={page.option}
              href={`${page.link}`}
              className="text-white m-2 transition duration-300 hover:text-yellow-500"
              onClick={() => {
                setDrawerState(false);
              }}
            >
              {page.option}
            </Link>
          ))}
        </Box>
      </Drawer>
    </>
  );
}
