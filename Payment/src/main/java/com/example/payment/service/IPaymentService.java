package com.example.payment.service;

import com.example.payment.model.PaymentEntity;
import com.example.payment.model.Students;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface IPaymentService {

    Flux<PaymentEntity> findAll();

    Mono<PaymentEntity> findById(String id);

    Mono<PaymentEntity> create(PaymentEntity payment);

    Mono<PaymentEntity> update(PaymentEntity payment);

    Flux<Students> findByIdStudent(String idStudent);

    Mono<Void> delete(String id);
}
