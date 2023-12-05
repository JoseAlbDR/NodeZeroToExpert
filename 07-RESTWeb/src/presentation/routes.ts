import express, { Router } from 'express';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    router.get('/', (req, res) => {
      res.json([
        {
          id: 1,
          text: 'Buy Milk',
          createdAt: new Date(),
        },
        {
          id: 2,
          text: 'Buy Milk',
          createdAt: null,
        },
        {
          id: 3,
          text: 'Buy Milk',
          createdAt: new Date(),
        },
      ]);
    });
    return router;
  }
}
