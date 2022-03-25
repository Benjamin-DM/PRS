package com.example.payment.controller;

import com.example.payment.model.PaymentEntity;
import com.example.payment.model.Students;
import com.example.payment.service.IPaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
@RequestMapping("/payment")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    private final IPaymentService service;

    @GetMapping
    public Flux<PaymentEntity> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public Mono<PaymentEntity> getOne(@PathVariable String id) {
        return service.findById(id);
    }

    @GetMapping("/{idStudent}")
    public Flux<Students> findByIdStudent(@PathVariable("idStudent") String idStudent) {
        return service.findByIdStudent(idStudent);
    }

    @PostMapping
    public Mono<PaymentEntity> create(@RequestBody PaymentEntity payment) {
        return service.create(payment);
    }

    @PutMapping("/{id}")
    public Mono<PaymentEntity> update(@RequestBody PaymentEntity payment) {
        return service.update(payment);
    }

    @DeleteMapping("/{id}")
    public Mono<Void> delete(@PathVariable String id) {
        return service.delete(id);
    }
}
