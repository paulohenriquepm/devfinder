import { Request, Response } from 'express';

import ListCandidatesService from '../services/ListCandidatesService';

export default class CandidatesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { experience, uf, city, technologies } = request.query;

    const formattedCity = `${city} - ${uf}`;

    const listCandidates = new ListCandidatesService();

    const candidates = await listCandidates.execute({
      experience,
      city: formattedCity,
      technologies,
    });

    return response.json(candidates);
  }
}
