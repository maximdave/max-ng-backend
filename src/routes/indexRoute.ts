import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Max-NG task completed by David Enoragbon');
});

export default router;
