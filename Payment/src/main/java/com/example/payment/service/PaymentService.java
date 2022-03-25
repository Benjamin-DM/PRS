package com.example.payment.service;


import com.example.payment.model.PaymentEntity;
import com.example.payment.model.Students;
import com.example.payment.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class PaymentService implements IPaymentService{

    private final PaymentRepository repository;

    WebClient webClientStudents = WebClient.builder().baseUrl("http://20.197.186.95:9093").build();

    @Override
    public Flux<PaymentEntity> findAll() {
        return repository.findAll();
    }

    @Override
    public Mono<PaymentEntity> findById(String id) {
        return repository.findById(id);
    }

    @Override
    public Mono<PaymentEntity> create(PaymentEntity payment) {
        return repository.save(payment);
    }

    @Override
    public Mono<PaymentEntity> update(PaymentEntity payment) {
        return repository.save(payment);
    }

    @Override
    public Flux<Students> findByIdStudent(String idStudent) {
        Flux<Students> studentFlux = webClientStudents
                .get()
                .uri("http://20.197.186.95:9093/repository/user/{id}", idStudent)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToFlux(Students.class);
        return studentFlux;
    }


    @Override
    public Mono<Void> delete(String id) {
        return repository.findById(id).flatMap(payment -> repository.deleteById(payment.getId()));
    }
}
