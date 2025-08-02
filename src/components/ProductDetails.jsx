import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container, Typography, Card, CardMedia, CardContent, Chip, Button, CircularProgress } from '@mui/material';
import api from '../utils/axios';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/posts/${productId}`);
      const post = response.data;
      const productData = {
        id: post.id,
        title: post.title,
        price: Math.floor(Math.random() * 500) + 20,
        category: ['Electronics', 'Clothing', 'Books', 'Home'][Math.floor(Math.random() * 4)],
        image: `https://picsum.photos/600/400?random=${post.id}`,
        description: post.body
      };
      setProduct(productData);
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <Container sx={{ mt: 5, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!product) {
    return (
      <Container sx={{ mt: 5 }}>
        <Typography variant="h5" align="center">Product not found.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Card>
        <CardMedia
          component="img"
          height="400"
          image={product.image}
          alt={product.title}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {product.title}
          </Typography>
          <Chip label={product.category} sx={{ mb: 2 }} />
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          <Typography variant="h5" color="primary" gutterBottom>
            ${product.price}
          </Typography>
          <Button variant="contained" color="primary">
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductDetails;
