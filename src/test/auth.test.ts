import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import request from 'supertest';
import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Auth', () => {
  describe('[POST] /auth/register', () => {
    it('response should have the Create userData', async () => {
      const userData = {
        username: 'testuser',
        password: 'q1w2e3r4!',
      };

      const authRoute = new AuthRoute();
      const auth = authRoute.auth;

      auth.register = jest.fn().mockResolvedValue({
        _id: '60706478aad6c9ad19a31c84',
        username: userData.username,
        password: await bcrypt.hash(userData.password, 10),
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([authRoute]);
      return request(app.getServer())
        .post(`${authRoute.path}/register`)
        .send(userData)
        .expect(201);
    });
  });

  describe('[POST] /auth/login', () => {
    it('response should have the JWT token', async () => {
      const userData = {
        username: 'testuser',
        password: 'q1w2e3r4!',
      };

      const authRoute = new AuthRoute();
      const auth = authRoute.auth;

      auth.login = jest.fn().mockResolvedValue({
        token: 'jwt-token',
        user: {
          _id: '60706478aad6c9ad19a31c84',
          username: userData.username,
        },
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([authRoute]);
      return request(app.getServer())
        .post(`${authRoute.path}/login`)
        .send(userData)
        .expect(200)
        .expect(res => {
          expect(res.body).toHaveProperty('token');
          expect(res.body).toHaveProperty('user');
          expect(res.body.user).toHaveProperty('username', userData.username);
        });
    });
  });

  // describe('[POST] /logout', () => {
  //   it('logout Set-Cookie Authorization=; Max-age=0', async () => {
  //     const userData: User = {
  //       _id: '60706478aad6c9ad19a31c84',
  //       email: 'test@email.com',
  //       password: await bcrypt.hash('q1w2e3r4!', 10),
  //     };

  //     const authRoute = new AuthRoute();
  //     const users = authRoute.authController.authService.users;

  //     users.findOne = jest.fn().mockReturnValue(userData);

  //     (mongoose as any).connect = jest.fn();
  //     const app = new App([authRoute]);
  //     return request(app.getServer())
  //       .post(`${authRoute.path}logout`)
  //       .send(userData)
  //       .set('Set-Cookie', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ')
  //       .expect('Set-Cookie', /^Authorization=\; Max-age=0/);
  //   });
  // });
});
