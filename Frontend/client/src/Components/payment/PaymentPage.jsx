import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Recaptcha from 'react-google-recaptcha';
import QRCode from 'qrcode.react'; // For UPI QR Code
import { QRCodeCanvas } from 'qrcode.react';
import { Container, Typography, TextField, Button, Grid, Paper, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const Payment = () => {
    const [step, setStep] = useState(1);
    const [paymentDetails, setPaymentDetails] = useState({
        name: '',
        email: '',
        amount: '',
        method: '',
        otp: '',
        plan: '',
        captcha: '',
        cardNumber: '',
        cvv: '',
        expiryDate: '',
        bank: '',
        username: '',
        password: ''
    });

    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails({ ...paymentDetails, [name]: value });
    };

    const handleNextStep = () => {
        setStep(step + 1);
    };

    const handlePreviousStep = () => {
        setStep(step - 1);
    };

    const handlePayment = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/payment', paymentDetails);
            if (response.data === "Payment successful") {
                setPaymentSuccess(true);
            }
        } catch (error) {
            console.error("Payment error: ", error);
        }
    };

    const handleOtpVerification = async () => {
        const response = await axios.post('http://localhost:8080/api/verify-otp', { otp: paymentDetails.otp, email: paymentDetails.email });
        if (response.data) {
            setOtpVerified(true);
            handleNextStep();
        } else {
            alert('Invalid OTP');
        }
    };

    const handleCaptcha = (value) => {
        setPaymentDetails({ ...paymentDetails, captcha: value });
    };

    const banks = ['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra Bank'];

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Payment Process
                </Typography>
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                        >
                            <Typography variant="h6" gutterBottom>
                                Select a Plan
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Button
                                        fullWidth
                                        variant={paymentDetails.plan === 'monthly' ? 'contained' : 'outlined'}
                                        onClick={() => setPaymentDetails({ ...paymentDetails, plan: 'monthly', amount: '500' })}
                                    >
                                        Monthly Plan - ₹500
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button
                                        fullWidth
                                        variant={paymentDetails.plan === 'yearly' ? 'contained' : 'outlined'}
                                        onClick={() => setPaymentDetails({ ...paymentDetails, plan: 'yearly', amount: '5000' })}
                                    >
                                        Yearly Plan - ₹5000
                                    </Button>
                                </Grid>
                            </Grid>
                            <Box sx={{ mt: 2 }}>
                                <Button fullWidth variant="contained" onClick={handleNextStep}>
                                    Next
                                </Button>
                            </Box>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                        >
                            <Typography variant="h6" gutterBottom>
                                Enter Your Details
                            </Typography>
                            <TextField
                                fullWidth
                                label="Full Name"
                                name="name"
                                value={paymentDetails.name}
                                onChange={handleInputChange}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                value={paymentDetails.email}
                                onChange={handleInputChange}
                                sx={{ mb: 2 }}
                            />
                            <Box sx={{ mt: 2 }}>
                                <Button fullWidth variant="contained" onClick={handleNextStep}>
                                    Next
                                </Button>
                            </Box>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                        >
                            <Typography variant="h6" gutterBottom>
                                Select Payment Method
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Button
                                        fullWidth
                                        variant={paymentDetails.method === 'credit_card' ? 'contained' : 'outlined'}
                                        onClick={() => setPaymentDetails({ ...paymentDetails, method: 'credit_card' })}
                                    >
                                        Credit Card
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button
                                        fullWidth
                                        variant={paymentDetails.method === 'debit_card' ? 'contained' : 'outlined'}
                                        onClick={() => setPaymentDetails({ ...paymentDetails, method: 'debit_card' })}
                                    >
                                        Debit Card
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button
                                        fullWidth
                                        variant={paymentDetails.method === 'upi' ? 'contained' : 'outlined'}
                                        onClick={() => setPaymentDetails({ ...paymentDetails, method: 'upi' })}
                                    >
                                        UPI
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button
                                        fullWidth
                                        variant={paymentDetails.method === 'internet_banking' ? 'contained' : 'outlined'}
                                        onClick={() => setPaymentDetails({ ...paymentDetails, method: 'internet_banking' })}
                                    >
                                        Internet Banking
                                    </Button>
                                </Grid>
                            </Grid>
                            <Box sx={{ mt: 2 }}>
                                <Button fullWidth variant="contained" onClick={handleNextStep}>
                                    Next
                                </Button>
                            </Box>
                        </motion.div>
                    )}

                    {step === 4 && paymentDetails.method === 'credit_card' && (
                        <motion.div
                            key="credit-card"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                        >
                            <Typography variant="h6" gutterBottom>
                                Credit Card Details
                            </Typography>
                            <TextField
                                fullWidth
                                label="Card Number"
                                name="cardNumber"
                                value={paymentDetails.cardNumber}
                                onChange={handleInputChange}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="CVV"
                                name="cvv"
                                value={paymentDetails.cvv}
                                onChange={handleInputChange}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Expiry Date"
                                name="expiryDate"
                                value={paymentDetails.expiryDate}
                                onChange={handleInputChange}
                                sx={{ mb: 2 }}
                            />
                            <Box sx={{ mt: 2 }}>
                                <Button fullWidth variant="contained" onClick={handleNextStep}>
                                    Next
                                </Button>
                            </Box>
                        </motion.div>
                    )}

                    {step === 4 && paymentDetails.method === 'debit_card' && (
                        <motion.div
                            key="debit-card"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                        >
                            <Typography variant="h6" gutterBottom>
                                Debit Card Details
                            </Typography>
                            <TextField
                                fullWidth
                                label="Card Number"
                                name="cardNumber"
                                value={paymentDetails.cardNumber}
                                onChange={handleInputChange}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="CVV"
                                name="cvv"
                                value={paymentDetails.cvv}
                                onChange={handleInputChange}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Expiry Date"
                                name="expiryDate"
                                value={paymentDetails.expiryDate}
                                onChange={handleInputChange}
                                sx={{ mb: 2 }}
                            />
                            <Box sx={{ mt: 2 }}>
                                <Button fullWidth variant="contained" onClick={handleNextStep}>
                                    Next
                                </Button>
                            </Box>
                        </motion.div>
                    )}

                    {step === 4 && paymentDetails.method === 'upi' && (
                        <motion.div
                            key="upi"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                        >
                            <Typography variant="h6" gutterBottom>
                                UPI Payment
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                            <QRCodeCanvas value={`upi://pay?pa=your-upi-id@bank&pn=YourName&am=${paymentDetails.amount}&cu=INR`} />
                            </Box>
                            <Typography variant="body2" align="center" gutterBottom>
                                Scan the QR code to complete the payment.
                            </Typography>
                            <Box sx={{ mt: 2 }}>
                                <Button fullWidth variant="contained" onClick={handleNextStep}>
                                    Next
                                </Button>
                            </Box>
                        </motion.div>
                    )}

                    {step === 4 && paymentDetails.method === 'internet_banking' && (
                        <motion.div
                            key="internet-banking"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                        >
                            <Typography variant="h6" gutterBottom>
                                Internet Banking
                            </Typography>
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel>Select Bank</InputLabel>
                                <Select
                                    name="bank"
                                    value={paymentDetails.bank}
                                    onChange={handleInputChange}
                                    label="Select Bank"
                                >
                                    {banks.map((bank) => (
                                        <MenuItem key={bank} value={bank}>
                                            {bank}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                fullWidth
                                label="Username"
                                name="username"
                                value={paymentDetails.username}
                                onChange={handleInputChange}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                name="password"
                                type="password"
                                value={paymentDetails.password}
                                onChange={handleInputChange}
                                sx={{ mb: 2 }}
                            />
                            <Box sx={{ mt: 2 }}>
                                <Button fullWidth variant="contained" onClick={handleNextStep}>
                                    Next
                                </Button>
                            </Box>
                        </motion.div>
                    )}

                    {step === 5 && (
                        <motion.div
                            key="step5"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                        >
                            <Typography variant="h6" gutterBottom>
                                Verify OTP and Captcha
                            </Typography>
                            <TextField
                                fullWidth
                                label="Enter OTP"
                                name="otp"
                                value={paymentDetails.otp}
                                onChange={handleInputChange}
                                sx={{ mb: 2 }}
                            />
                            <Recaptcha sitekey="your-recaptcha-site-key" onChange={handleCaptcha} />
                            <Box sx={{ mt: 2 }}>
                                <Button fullWidth variant="contained" onClick={handlePayment}>
                                    Verify and Pay
                                </Button>
                            </Box>
                        </motion.div>
                    )}

                    {paymentSuccess && (
                        <motion.div
                            key="payment-success"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                        >
                                                        <Typography variant="h6" gutterBottom>
                                Payment Successful!
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                Thank you for your payment. Your subscription is now active.
                            </Typography>
                            <Button
                                fullWidth
                                variant="contained"
                                onClick={() => setStep(1)}
                            >
                                Restart Payment
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Paper>
        </Container>
    );
};

export default Payment;




