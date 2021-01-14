import { getRepository } from 'typeorm';

import AppError from '../../../errors/AppError';

import Candidate from '../entities/Candidate';

interface IRequest {
  experience: any;
  city: string;
  technologies: any;
}

interface ITechnology {
  name: string;
  is_main_tech: boolean;
}

interface ICandidate {
  id: number;
  city: string;
  experience: string;
  technologies: ITechnology[];
}

export default class ListCandidatesService {
  public async execute({
    experience,
    city,
    technologies,
  }: IRequest): Promise<ICandidate[]> {
    if (!experience || !city || technologies.length === 0) {
      throw new AppError('Todos os filtros são obrigatórios.', 401);
    }

    const candidateRepository = getRepository(Candidate);

    const candidates = await candidateRepository
      .createQueryBuilder('candidates')
      .innerJoinAndSelect('candidates.technologies', 'technologies')
      .where(
        `
            (
              candidates.experience = :experience
              AND candidates.city = :city
              AND EXISTS (
                SELECT * FROM techs
                WHERE techs.candidate_id = candidates.id
                AND techs.name IN (:...techs) AND techs.is_main_tech = true
              )
            )
          OR
            (
              candidates.city = :city
              AND EXISTS (
                SELECT * FROM techs
                WHERE techs.candidate_id = candidates.id
                AND techs.name IN (:...techs) AND techs.is_main_tech = true
              )
            )
          OR
            (
              EXISTS (
                SELECT * FROM techs
                WHERE techs.candidate_id = candidates.id
                AND techs.name IN (:...techs) AND techs.is_main_tech = true
              )
            )
          OR
            (
              EXISTS (
                SELECT * FROM techs
                WHERE techs.candidate_id = candidates.id
                AND techs.name IN (:...techs)
              )
            )
          OR
            (
              EXISTS (
                SELECT * FROM techs
                WHERE techs.candidate_id = candidates.id
              )
            )
          `,
        {
          experience,
          city,
          techs: technologies,
        },
      )
      .take(5)
      .getMany();

    return candidates;
  }
}
