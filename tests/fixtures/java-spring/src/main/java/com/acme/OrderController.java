package com.acme;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class OrderController {
  private final OrderService orderService;

  public OrderController(OrderService orderService) {
    this.orderService = orderService;
  }

  @PostMapping("/orders")
  public OrderDto create(@RequestBody CreateOrderRequest request) {
    System.getenv("ORDER_TOPIC");
    return orderService.create(request);
  }

  @Scheduled(cron = "0 0 * * * *")
  public void reconcile() {
    orderService.reconcile();
  }

  @KafkaListener(topics = "order-events")
  public void consume(String payload) {
    orderService.consume(payload);
  }
}
