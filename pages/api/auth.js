import nextConnect from 'next-connect';
import middleware from '../../middlewares/middleware';
import passport from '../../lib/passport';
import { extractUser } from '../../lib/api-helpers';
import { clientPromise } from '../../lib/connection-helpers';

const db = (await clientPromise).db(process.env.MONGODB_DB);

const handler = nextConnect();

handler.use(middleware);

handler.post(passport.authenticate('local'), (req, res) => {
  // return our user object
  res.json({ user: extractUser(req.user) });
});

handler.delete((req, res) => {
  req.logOut();
  res.status(204).end();
});

export default handler;