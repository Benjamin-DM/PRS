package com.example.payment.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document("Payment")
public class PaymentEntity {

    @Id
    private String id;
    private String cost;
    private String type;
    private String idStudent;
    private String status;
}
