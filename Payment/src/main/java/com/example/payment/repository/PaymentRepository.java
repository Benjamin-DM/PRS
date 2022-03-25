package com.example.payment.repository;

import com.example.payment.model.PaymentEntity;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends ReactiveMongoRepository<PaymentEntity, String> {
}
