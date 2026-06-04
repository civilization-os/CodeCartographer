package com.acme;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class OrderController {
  private final OrderService orderService;
  private final OrderRepository orderRepository;

  public OrderController(OrderService orderService, OrderRepository orderRepository) {
    this.orderService = orderService;
    this.orderRepository = orderRepository;
  }

  @PostMapping("/orders")
  public OrderDto create(@RequestBody CreateOrderRequest request) {
    System.getenv("ORDER_TOPIC");
    return validateAndCreate(request);
  }

  private OrderDto validateAndCreate(CreateOrderRequest request) {
    orderRepository.save(new OrderEntity());
    return orderService.create(request);
  }

  private OrderEntity loadOrder(String externalId) {
    return orderRepository.findByExternalId(externalId);
  }

  @Scheduled(cron = "0 0 * * * *")
  public void reconcile() {
    orderService.reconcile();
  }

  @KafkaListener(topics = "order-events")
  public void consume(String payload) {
    orderService.consume(payload);
  }

  /**
   * Called before each @RequestMapping method.
   * @param orderId order identifier
   * @return order context
   */
  @ModelAttribute("orderContext")
  public OrderContext loadOrderContext(@PathVariable("orderId") int orderId) {
    return orderService.loadContext(orderId);
  }
}

@Entity
@Table(name = "orders")
class OrderEntity {
}

interface OrderRepository extends JpaRepository<OrderEntity, Integer> {
  OrderEntity findByExternalId(String externalId);
}

class OrderService {
  public OrderDto create(CreateOrderRequest request) {
    return new OrderDto();
  }

  public void reconcile() {
  }

  public void consume(String payload) {
  }

  public OrderContext loadContext(int orderId) {
    return new OrderContext();
  }
}
