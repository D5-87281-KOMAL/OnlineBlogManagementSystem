import React from 'react';
import { motion } from 'framer-motion';

const Success = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-50 to-blue-50"
        >
            <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md text-center">
                <h2 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h2>
                <p className="text-gray-600">Thank you for your payment. Your transaction was completed successfully.</p>
                <button
                    onClick={() => window.location.href = '/'}
                    className="mt-6 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
                >
                    Return Home
                </button>
            </div>
        </motion.div>
    );
};

export default Success;