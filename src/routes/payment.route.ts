import { Router } from 'express';
import { PaymentController } from '../controllers/payment.controller';
// import { validationMiddleware } from '../middlewares/validation.middleware';
import { ValidationMiddleware } from '../middlewares/validation.middleware';
import { CreatePaymentDto } from '../dtos/payment.dto';

export class PaymentRoute {
  public path = '/payments';
  public router = Router();
  public paymentController = new PaymentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      ValidationMiddleware(CreatePaymentDto),
      this.paymentController.createPayment
    );
    this.router.get(`${this.path}`, this.paymentController.getPayments);
    this.router.get(`${this.path}/:id`, this.paymentController.getPaymentById);
    this.router.put(
      `${this.path}/:id`,
      ValidationMiddleware(CreatePaymentDto, true),
      this.paymentController.updatePayment
    );
    this.router.delete(`${this.path}/:id`, this.paymentController.deletePayment);
  }
} 