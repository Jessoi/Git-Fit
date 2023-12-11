import React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import MenuIcon from '@mui/icons-material/Menu'
import { NavLink, useNavigate } from 'react-router-dom'
import useToken from '@galvanize-inc/jwtdown-for-react'
import { StyledNavbar } from './styles.jsx'

function Nav () {
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const { logout, token } = useToken()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
    handleCloseUserMenu()
  }

  return (
    <StyledNavbar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            Git-Fit |
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              <NavLink to='/trainee/workouts/'>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign='center'>Workouts</Typography>
                </MenuItem>
              </NavLink>
              <NavLink to='/trainee/createworkout/'>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign='center'>Create Workout</Typography>
                </MenuItem>
              </NavLink>
              {token
                ? null
                : [
                    <NavLink key='signup' to='/trainee/signup/'>
                      <Button
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                      >
                        Sign Up
                      </Button>
                    </NavLink>,
                    <NavLink key='login' to='/trainee/login/'>
                      <Button
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                      >
                        Log In
                      </Button>
                    </NavLink>
                  ]}
            </Menu>
          </Box>
          <Typography
            variant='h5'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            Git-Fit
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {token ? (
              <>
                <NavLink to='/trainee/workouts/'>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign='center'>Workouts</Typography>
                  </MenuItem>
                </NavLink>
                <NavLink to='/trainee/createworkout/'>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign='center'>Create Workout</Typography>
                  </MenuItem>
                </NavLink>
              </>
            ) : null}
            {token
              ? null
              : [
                  <NavLink key='signup' to='/trainee/signup/'>
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                      Sign Up
                    </Button>
                  </NavLink>,
                  <NavLink key='login' to='/trainee/login/'>
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                      Log In
                    </Button>
                  </NavLink>
                ]}
          </Box>
          {token && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title='Open settings'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt='Profile' />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <NavLink to='/trainee/'>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign='center'>Profile</Typography>
                  </MenuItem>
                </NavLink>
                <NavLink to='/trainee/edit-profile/'>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign='center'>Edit Profile</Typography>
                  </MenuItem>
                </NavLink>
                <NavLink to='/trainee/change-password/'>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign='center'>Change Password</Typography>
                  </MenuItem>
                </NavLink>
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign='center'>Log Out</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </StyledNavbar>
  )
}

export default Nav
