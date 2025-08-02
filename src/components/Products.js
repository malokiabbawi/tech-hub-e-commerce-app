import React, { useState } from 'react';
import { Grid, Box, Button, IconButton, Typography } from '@mui/material';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import { Link } from 'react-router-dom';

const products = [
  
  { id: 1, name: 'Product A', description: 'Description of Product A', price: 100, imageUrl: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Product B', description: 'Description of Product B', price: 150, imageUrl: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Product C', description: 'Description of Product C', price: 200, imageUrl: 'https://via.placeholder.com/150' },
];

const ProductCard = ({ product }) => (
    <Box sx={{ border: '1px solid #ccc', padding: 2, borderRadius: 2 }}>
        <img src={product.imageUrl} alt={product.name} style={{ width: '100%' }} />
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body2">{product.description}</Typography>
        <Typography variant="h5">${product.price}</Typography>
    </Box>
);

const ProductListItem = ({ product }) => (
    <Box sx={{ border: '1px solid #ccc', padding: 2, borderRadius: 2, display: 'flex', alignItems: 'center' }}>
        <img src={product.imageUrl} alt={product.name} style={{ width: 100, marginRight: 20 }} />
        <Box>
            <Typography variant="h6">{product.name}</Typography>
            <Typography variant="body2">{product.description}</Typography>
            <Typography variant="h5">${product.price}</Typography>
        </Box>
    </Box>
);

const Products = () => {
    const [view, setView] = useState('grid');
    const toggleView = () => {
        setView(view === 'grid' ? 'list' : 'grid');
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <Typography variant="h4">Our Products</Typography>
                <IconButton onClick={toggleView} color="primary">
                    {view === 'grid' ? <ViewListIcon /> : <ViewModuleIcon />}
                </IconButton>
            </Box>

            {view === 'grid' ? (
                <Grid container spacing={3}>
                    {products.map(product => (
                        <Grid item xs={12} sm={6} md={4} key={product.id}>
                            <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
                                <ProductCard product={product} />
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Grid container spacing={2}>
                    {products.map(product => (
                        <Grid item xs={12} key={product.id}>
                            <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
                                <ProductListItem product={product} />
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default Products;
