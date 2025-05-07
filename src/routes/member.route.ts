import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { MemberController } from '@controllers/member.controller';
import { authMiddleware } from '@middlewares/auth.middleware';

export class MemberRoute implements Routes {
  public path = '/members';
  public router = Router();
  public member = new MemberController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.member.getAllMembers);
    this.router.get(`${this.path}/:id`, authMiddleware, this.member.getMemberById);
    this.router.post(`${this.path}`, authMiddleware, this.member.createMember);
    this.router.put(`${this.path}/:id`, authMiddleware, this.member.updateMember);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.member.deleteMember);
  }
} 