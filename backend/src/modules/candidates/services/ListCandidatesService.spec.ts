import { getRepository, Repository, Connection } from 'typeorm';

import { createTypeormConnection } from '../../../database';

import AppError from '../../../errors/AppError';

import Candidate from '../entities/Candidate';
import Tech from '../entities/Tech';

import ListCandidatesService from './ListCandidatesService';

const listCandidates = new ListCandidatesService();

let connection: Connection;
let candidateRepository: Repository<Candidate>;
let techRepository: Repository<Tech>;

describe('ListCandidates', () => {
  beforeEach(async () => {
    connection = await createTypeormConnection();

    candidateRepository = getRepository(Candidate);
    techRepository = getRepository(Tech);
  });

  afterEach(async () => {
    await connection.close();
  });

  it('should not be able to list the candidates without experience parameter', async () => {
    await expect(
      listCandidates.execute({
        experience: '',
        city: 'Divinópolis - MG',
        technologies: ['Ruby'],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to list the candidates without city parameter', async () => {
    await expect(
      listCandidates.execute({
        experience: '0-1 years',
        city: '',
        technologies: ['Ruby'],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to list the candidates without tecnologies parameter', async () => {
    await expect(
      listCandidates.execute({
        experience: '0-1 years',
        city: 'Divinópolis - MG',
        technologies: [],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to list the candidates', async () => {
    const createdCandidate = candidateRepository.create({
      id: 1,
      experience: '0-1 years',
      city: 'Divinópolis - MG',
      status: true,
    });

    await candidateRepository.save(createdCandidate);

    const createdTech = techRepository.create({
      candidate_id: createdCandidate.id,
      name: 'Ruby',
      is_main_tech: true,
      status: true,
    });

    await techRepository.save(createdTech);

    const candidates = await listCandidates.execute({
      experience: '0-1 years',
      city: 'Divinópolis - MG',
      technologies: ['Ruby'],
    });

    expect(candidates.length).toBe(1);
  });
});
