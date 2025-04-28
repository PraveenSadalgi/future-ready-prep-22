
import jwt from 'jsonwebtoken';

const generateToken = (id: string): string => {
  const secret = process.env.JWT_SECRET || '50b4d24edb360056d0bc2888db3d917c65af5f6a9edf4606832cc60ecb8e7cc7b88b66750684b14b4ebcc32d0ce281651d9a43a604612993fbe463b75c4640d2';
  return jwt.sign({ id }, secret, {
    expiresIn: '30d',
  });
};

export default generateToken;
