import type { Request, Response } from 'express';

const notFound = (req: Request, res: Response) => {
  const message: string = 'Api not found';

  return res.status(404).json({ message, success: false, error: 'Wrong URL!' });
};

export default notFound;
