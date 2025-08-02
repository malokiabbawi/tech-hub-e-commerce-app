import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';


const allProducts = [
    { id: 1, name: 'Product A', description: 'Detailed description for Product A. It is a high-quality item.', price: 100, imageUrl: 'https://via.placeholder.com/400' },
    { id: 2, name: 'Product B', description: 'Detailed description for Product B. This product is very popular.', price: 150, imageUrl: 'https://via.placeholder.com/400' },
    { id: 3, name: 'Product C', description: 'Detailed description for Product C. An excellent choice for daily use.', price: 200, imageUrl: 'https://via.placeholder.com/400' },
];

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const foundProduct = allProducts.find(p => p.id === parseInt(id));
        setProduct(foundProduct);
    }, [id]);

    if (!product) {
        return <Typography variant="h5" sx={{ padding: 4 }}>Loading or Product not found...</Typography>;
    }

    return (
        <Box sx={{ padding: 4, maxWidth: 800, margin: 'auto' }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <img src={product.imageUrl} alt={product.name} style={{ width: '100%', borderRadius: 8 }} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h3" gutterBottom>{product.name}</Typography>
                    <Typography variant="h4" color="primary" sx={{ my: 2 }}>${product.price}</Typography>
                    <Typography variant="body1" sx={{ mb: 4 }}>{product.description}</Typography>
                    <Button variant="contained" color="primary">Add to Cart</Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProductDetail;
