interface CreateOrderInput {
  id: string;
  amount: number;
}

interface Order {
  id: string;
  amount: number;
  status: "created";
}

export function registerRoutes(app: { post(path: string, handler: unknown): void }): void {
  app.post("/orders", createOrder);
}

export async function createOrder(input: CreateOrderInput): Promise<Order> {
  const order = normalizeOrder(input);
  persistOrder(order);
  await fetch("https://payments.example.com/charge");
  return order;
}

function normalizeOrder(input: CreateOrderInput): Order {
  return {
    id: input.id,
    amount: input.amount,
    status: "created"
  };
}

function persistOrder(order: Order): string {
  process.env.ORDER_TABLE;
  return order.id;
}

export function main(): void {
  registerRoutes({
    post() {
      return undefined;
    }
  });
}
