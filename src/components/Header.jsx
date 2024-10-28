import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/userSlice';
import { clearCart } from '../redux/cartSlice';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Header() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearCart());
  };

  return (
    <AppBar position="static" sx={{ background: '#3f51b5' }}>
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff' }}>
          RomanBooks
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/" sx={{ margin: '0 10px' }}>
            Home
          </Button>
          <Button color="inherit" component={Link} to="/books" sx={{ margin: '0 10px' }}>
            Books
          </Button>
          <Button color="inherit" component={Link} to="/cart" sx={{ margin: '0 10px' }}>
            Cart
          </Button>
          {isAuthenticated ? (
            <Button color="inherit" onClick={handleLogout} sx={{ margin: '0 10px' }}>
              Logout
            </Button>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/register" sx={{ margin: '0 10px' }}>
                Register
              </Button>
              <Button color="inherit" component={Link} to="/login" sx={{ margin: '0 10px' }}>
                Login
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;