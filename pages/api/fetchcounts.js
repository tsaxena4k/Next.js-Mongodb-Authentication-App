import nextConnect from 'next-connect';
import middleware from '../../middlewares/middleware';
import { extractUser } from '../../lib/api-helpers';
import { clientPromise } from '../../lib/connection-helpers';

const handler = nextConnect();

handler.use(middleware); // see how we're reusing our middleware

// GET /api/fetchPosters
handler.get(async (req, res) => {
const allrecords = await req.db.collection("records").count({});
const alluniversities = await req.db.collection("universities").count({});
const allposters = await req.db.collection("posters").count({});

const allresults = [allrecords, alluniversities, allposters]
res.status(200).json(allresults);

});

export default handler;