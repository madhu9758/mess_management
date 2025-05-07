import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ExpenseController } from '@controllers/expense.controller';
import { authMiddleware } from '@middlewares/auth.middleware';

export class ExpenseRoute implements Routes {
  public path = '/expenses';
  public router = Router();
  public expense = new ExpenseController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.expense.getAllExpenses);
    this.router.get(`${this.path}/:id`, authMiddleware, this.expense.getExpenseById);
    this.router.get(`${this.path}/category/:category`, authMiddleware, this.expense.getExpensesByCategory);
    this.router.post(`${this.path}`, authMiddleware, this.expense.createExpense);
    this.router.put(`${this.path}/:id`, authMiddleware, this.expense.updateExpense);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.expense.deleteExpense);
  }
} 