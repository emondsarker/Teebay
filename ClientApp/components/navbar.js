import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [name, setName] = useState("");

  const router = useRouter()
  useEffect(() => {
    // redirect if not logged in
    let userId = window.localStorage.getItem("userId")
    if (userId == null) {
      router.push('/sign-in')
    } else {
      setName(window.localStorage.getItem("name"))
    }

    // Indicates current part of the website on the navbar for better UX
    if (router.pathname === '/my-products' || router.pathname === '/my-product/[id]') {
      console.log('my-products')
      document.getElementById('my-products').style.cssText = "color: white; background-color: purple; font-weight: bold"
    }
    if (router.pathname === '/all-products' || router.pathname === '/product/[id]') {
      console.log('my-products')
      document.getElementById('all-products').style.cssText = "color: white; background-color: purple; font-weight: bold"
    }
    if (router.pathname === '/transaction') {
      console.log('my-products')
      document.getElementById('transaction').style.cssText = "color: white; background-color: purple; font-weight: bold"
    }

  }, [])


  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    // clear localStorage, update this when auth is more secure
    localStorage.removeItem("name")
    localStorage.removeItem("email")
    localStorage.removeItem("userId")
    router.push('/sign-in')
  }

  return (
    <div position="static" sx={{ background: 'white', color: 'grey' }}>
      <Container >
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Teebay
          </Typography>



          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
            <Link href="/all-products">
              <Button onClick={handleCloseNavMenu} id="all-products" sx={{ my: 2, color: 'black', display: 'block' }}>
                All Products
              </Button>
            </Link>
            <Link href="/my-products">
              <Button onClick={handleCloseNavMenu} id="my-products" sx={{ my: 2, color: 'black', display: 'block' }}>
                My Products
              </Button>
            </Link>
            <Link href="/transaction">
              <Button onClick={handleCloseNavMenu} id="transaction" sx={{ my: 2, color: 'black', display: 'block' }}>
                Transcation
              </Button>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={name} src=" " />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px', minWidth: '500px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem>
                <Typography textAlign="center"><b> {name} </b></Typography>
              </MenuItem>
              <MenuItem onClick={logout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </div>
  );
}
export default ResponsiveAppBar;