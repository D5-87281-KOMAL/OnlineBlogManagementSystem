import React, { useState } from 'react';
import { Box, Typography, TextField, Button, CircularProgress, Alert, Grid, Card, CardContent, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

// Styled Subscribe Container
const SubscribeContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4),
  maxWidth: '800px',
  margin: 'auto',
  marginTop: theme.spacing(8),
  boxShadow: theme.shadows[10],
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
}));

// Subscription Plans Data
const PLANS = [
  {
    id: 'basic',
    title: 'Basic Plan',
    price: '₹49/month',
    features: ['Limited Ads'],
  }
];

const Subscribe = () => {
  const [email, setEmail] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = async () => {
    if (!email) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!selectedPlan) {
      setError('Please select a subscription plan.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Replace with your backend API endpoint
      const response = await axios.post('/api/subscribe', { email, plan: selectedPlan });
      if (response.data.success) {
        // Send payment link to email
        await axios.post('/api/send-payment-link', { email, plan: selectedPlan });
        setSuccess(true);
        setEmail('');
        setSelectedPlan('');
      } else {
        setError(response.data.message || 'Subscription failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SubscribeContainer>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Choose Your Plan
      </Typography>
      <Typography variant="body1" gutterBottom align="center" color="textSecondary">
        Select the plan that best suits your needs and enjoy unlimited streaming.
      </Typography>

      {/* Plan Selection Grid */}
      <Grid container spacing={3} sx={{ marginTop: 2, justifyContent: 'center' }}>
        {PLANS.map((plan) => (
          <Grid item xs={12} sm={6} md={4} key={plan.id}>
            <Card
              sx={{
                border: selectedPlan === plan.id ? '2px solid #1976d2' : '1px solid #e0e0e0',
                borderRadius: 2,
                cursor: 'pointer',
                transition: 'border-color 0.3s',
                '&:hover': {
                  borderColor: '#1976d2',
                },
              }}
              onClick={() => setSelectedPlan(plan.id)}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom align="center" color="primary">
                  {plan.title}
                </Typography>
                <Typography variant="h5" gutterBottom align="center" color="textPrimary">
                  {plan.price}
                </Typography>
                <Box sx={{ textAlign: 'left' }}>
                  {plan.features.map((feature, index) => (
                    <Typography key={index} variant="body2" sx={{ marginBottom: 1 }} color="textSecondary">
                      • {feature}
                    </Typography>
                  ))}
                </Box>
                <RadioGroup
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                >
                  <FormControlLabel
                    value={plan.id}
                    control={<Radio color="primary" />}
                    label="Select Plan"
                    sx={{ marginTop: 1, justifyContent: 'center' }}
                  />
                </RadioGroup>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Email Input */}
      <TextField
        fullWidth
        label="Email Address"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ marginTop: 3 }}
      />

      {/* Error and Success Messages */}
      {error && (
        <Alert severity="error" sx={{ marginTop: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ marginTop: 2 }}>
          Subscription successful! A payment link has been sent to your email.
        </Alert>
      )}

      {/* Subscribe Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubscribe}
        disabled={loading}
        sx={{ marginTop: 3, width: '100%', padding: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : 'Subscribe'}
      </Button>
    </SubscribeContainer>
  );
};

export default Subscribe;




