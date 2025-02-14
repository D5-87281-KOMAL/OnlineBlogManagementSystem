import React from 'react';
import { motion } from 'framer-motion';

const Cancel = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-50 to-pink-50"
        >
            <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md text-center">
                <h2 className="text-3xl font-bold text-red-600 mb-4">Payment Failed</h2>
                <p className="text-gray-600">Your payment was not successful. Please try again or contact support.</p>
                <button
                    onClick={() => window.location.href = '/'}
                    className="mt-6 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
                >
                    Try Again
                </button>
            </div>
        </motion.div>
    );
};

export default Cancel;