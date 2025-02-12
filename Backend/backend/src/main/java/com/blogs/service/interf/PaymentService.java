package com.blogs.service.interf;

import com.blogs.dto.PaymentRequestDTO;
import com.blogs.dto.PaymentResponseDTO;

public interface PaymentService {

	PaymentResponseDTO processPayment(PaymentRequestDTO paymentRequestDTO);
}
