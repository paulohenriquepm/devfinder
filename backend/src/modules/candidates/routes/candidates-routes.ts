import { Router } from 'express';

import CandidatesController from '../controllers/CandidatesController';

const candidatesRouter = Router();
const candidatesController = new CandidatesController();

candidatesRouter.get('/', candidatesController.index);

export default candidatesRouter;
