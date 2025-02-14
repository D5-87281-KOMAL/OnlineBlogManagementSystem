import * as React from 'react';
import { Box, Container, Grid, Link, Typography } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'orange',
        color: 'white',
        py: 4,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* About Us Section */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2">
              We are a passionate team dedicated to providing the best content and services to our users. Our mission is to make your experience seamless and enjoyable.
            </Typography>
          </Grid>

          {/* Contact Section */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2">
              Email: support@SMKS.com
            </Typography>
            <Typography variant="body2">
              Phone: +1 7346764757
            </Typography>
            <Typography variant="body2">
              Address: Hinjewadi,Phase 2,Pune
            </Typography>
          </Grid>

          {/* Social Media Section */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box>
              <Link href="https://facebook.com" color="inherit" target="_blank" rel="noopener noreferrer">
                <Facebook sx={{ mr: 2 }} />
              </Link>
              <Link href="https://twitter.com" color="inherit" target="_blank" rel="noopener noreferrer">
                <Twitter sx={{ mr: 2 }} />
              </Link>
              <Link href="https://instagram.com" color="inherit" target="_blank" rel="noopener noreferrer">
                <Instagram sx={{ mr: 2 }} />
              </Link>
              <Link href="https://linkedin.com" color="inherit" target="_blank" rel="noopener noreferrer">
                <LinkedIn />
              </Link>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright Section */}
        <Box mt={4}>
          <Typography variant="body2" align="center">
            &copy; {new Date().getFullYear()} SMKS Blogs. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;