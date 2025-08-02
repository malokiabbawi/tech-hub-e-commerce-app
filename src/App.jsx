import React, { useState, useContext, createContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams, useNavigate } from 'react-router-dom';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppBar, Toolbar, Typography, Button, IconButton, Container, Box, Grid, Card, CardContent, CardMedia, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Brightness4, Brightness7, GridView, ViewList } from '@mui/icons-material';

const sampleProducts = [
  { id: '1', name: 'Professional Laptop', description: 'Powerful laptop with i9 processor and 32GB RAM', price: 2500, imageUrl: 'https://placehold.co/400x300/4CAF50/FFFFFF?text=Laptop' },
  { id: '2', name: 'Smartphone', description: 'New phone with an OLED screen and a 108MP camera', price: 999, imageUrl: 'https://placehold.co/400x300/2196F3/FFFFFF?text=Phone' },
  { id: '3', name: 'Wireless Headphones', description: 'Noise-cancelling headphones with long battery life', price: 150, imageUrl: 'https://placehold.co/400x300/FFC107/000000?text=Headphones' },
  { id: '4', name: 'Smart Watch', description: 'Fitness tracker watch with heart rate monitoring', price: 250, imageUrl: 'https://placehold.co/400x300/FF5722/FFFFFF?text=Watch' },
  { id: '5', name: '4K Monitor', description: 'High-resolution 27-inch screen for gaming and work', price: 600, imageUrl: 'https://placehold.co/400x300/9C27B0/FFFFFF?text=Monitor' },
];

const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const value = { user, login: () => setUser({ id: 1, name: 'User' }), logout: () => setUser(null) };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
const useAuth = () => useContext(AuthContext);

const ThemeContext = createContext(null);
const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);
  const toggleDarkMode = () => setDarkMode(!darkMode);
  const value = { darkMode, toggleDarkMode };
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
const useTheme = () => useContext(ThemeContext);

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : null;
};
const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? <Navigate to="/products" replace /> : children;
};

const Navigation = () => {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          E-commerce Store
        </Typography>
        {user ? (
          <>
            <Button color="inherit" href="/products">Products</Button>
            <Button color="inherit" href="/cart">Cart</Button>
            <Button color="inherit" onClick={logout}>Sign Out</Button>
          </>
        ) : (
          <Button color="inherit" href="/login">Sign In</Button>
        )}
        <IconButton onClick={toggleDarkMode} color="inherit">
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

const Login = () => {
  const { login } = useAuth();
  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={login}
        >
          Sign In as Guest
        </Button>
      </Box>
    </Container>
  );
};

const Products = () => {
  const navigate = useNavigate();
  const [isGridView, setIsGridView] = useState(true);

  const handleProductClick = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Products
        </Typography>
        <Box>
          <IconButton onClick={() => setIsGridView(true)} color={isGridView ? "primary" : "default"}>
            <GridView />
          </IconButton>
          <IconButton onClick={() => setIsGridView(false)} color={!isGridView ? "primary" : "default"}>
            <ViewList />
          </IconButton>
        </Box>
      </Box>
      
      {isGridView ? (
        <Grid container spacing={4}>
          {sampleProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer' }} onClick={() => handleProductClick(product.id)}>
                <CardMedia
                  component="img"
                  sx={{ aspectRatio: '4/3' }}
                  image={product.imageUrl}
                  alt={product.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {product.name}
                  </Typography>
                  <Typography>
                    {product.description.substring(0, 50)}...
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                    ${product.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <List>
          {sampleProducts.map((product) => (
            <React.Fragment key={product.id}>
              <ListItem button onClick={() => handleProductClick(product.id)}>
                <CardMedia
                  component="img"
                  sx={{ width: 150, height: 100, marginRight: 2, borderRadius: 2 }}
                  image={product.imageUrl}
                  alt={product.name}
                />
                <ListItemText
                  primary={<Typography variant="h6">{product.name}</Typography>}
                  secondary={
                    <>
                      <Typography variant="body2" color="text.secondary">
                        {product.description}
                      </Typography>
                      <Typography variant="subtitle1" color="primary">
                        ${product.price}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      )}
    </Container>
  );
};

const ProductDetail = () => {
  const { productId } = useParams();
  const product = sampleProducts.find(p => p.id === productId);

  if (!product) {
    return <Container sx={{ mt: 4 }}><Typography variant="h5">Product not found.</Typography></Container>;
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <CardMedia
            component="img"
            image={product.imageUrl}
            alt={product.name}
            sx={{ borderRadius: 2 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h3" component="h1" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="h5" color="primary" gutterBottom>
              ${product.price}
            </Typography>
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>
            <Button variant="contained" color="primary" size="large">
              Add to Cart
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

const Users = () => <Container sx={{ mt: 4 }}><Typography variant="h4">Users Page</Typography></Container>;
const Cart = () => <Container sx={{ mt: 4 }}><Typography variant="h4">Cart Page</Typography></Container>;
const Checkout = () => <Container sx={{ mt: 4 }}><Typography variant="h4">Checkout Page</Typography></Container>;

const AppContent = () => {
  const { darkMode } = useTheme();

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#388E3C',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#FFB300',
      },
      background: {
        default: darkMode ? '#121212' : '#f5f5f5',
        paper: darkMode ? '#1e1e1e' : '#ffffff',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          contained: {
            backgroundColor: '#388E3C',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#2E7D32',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? '#1e1e1e' : '#388E3C',
            color: '#ffffff',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.03)',
            },
          },
        },
      },
    },
  });

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Navigation />
          <ProtectedRoute>
            <Routes>
              <Route path="/products" element={<Products />} />
              <Route path="/products/:productId" element={<ProductDetail />} />
              <Route path="/users" element={<Users />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/" element={<Navigate to="/products" replace />} />
              <Route path="/login" element={<Navigate to="/products" replace />} />
            </Routes>
          </ProtectedRoute>
          <Routes>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </MUIThemeProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
