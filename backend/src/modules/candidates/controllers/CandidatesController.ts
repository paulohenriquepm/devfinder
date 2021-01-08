import { Request, Response } from 'express';

import ListCandidatesService from '../services/ListCandidatesService';

export default class CandidatesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCandidates = new ListCandidatesService();

    const candidates = await listCandidates.execute();

    return response.json(candidates);
  }
}
