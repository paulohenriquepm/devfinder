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

  // it('should be able to filter the candidates by experience, city and techs', async () => {
  //   const mockedData = {
  //     data: {
  //       candidates: [
  //         {
  //           id: 1,
  //           city: 'Rio de Janeiro - RJ',
  //           experience: '12+ years',
  //           technologies: [
  //             {
  //               name: 'Java',
  //               is_main_tech: true,
  //             },
  //             {
  //               name: 'Python',
  //               is_main_tech: false,
  //             },
  //           ],
  //         },
  //         {
  //           id: 2,
  //           city: 'Divinópolis - MG',
  //           experience: '0-1 years',
  //           technologies: [
  //             {
  //               name: 'Node.js',
  //               is_main_tech: true,
  //             },
  //             {
  //               name: 'React',
  //               is_main_tech: true,
  //             },
  //           ],
  //         },
  //         {
  //           id: 3,
  //           city: 'Divinópolis - MG',
  //           experience: '0-1 years',
  //           technologies: [
  //             {
  //               name: 'PHP',
  //               is_main_tech: true,
  //             },
  //             {
  //               name: 'Angular 8',
  //               is_main_tech: true,
  //             },
  //             {
  //               name: 'Azure',
  //               is_main_tech: false,
  //             },
  //             {
  //               name: 'Node.js',
  //               is_main_tech: true,
  //             },
  //             {
  //               name: 'React',
  //               is_main_tech: true,
  //             },
  //           ],
  //         },
  //         {
  //           id: 4,
  //           city: 'Divinópolis - MG',
  //           experience: '1-2 years',
  //           technologies: [
  //             {
  //               name: 'PHP',
  //               is_main_tech: true,
  //             },
  //             {
  //               name: 'Angular 8',
  //               is_main_tech: true,
  //             },
  //             {
  //               name: 'Azure',
  //               is_main_tech: false,
  //             },
  //             {
  //               name: 'Node.js',
  //               is_main_tech: true,
  //             },
  //             {
  //               name: 'React',
  //               is_main_tech: true,
  //             },
  //           ],
  //         },
  //         {
  //           id: 5,
  //           city: 'Pará de Minas - MG',
  //           experience: '1-2 years',
  //           technologies: [
  //             {
  //               name: 'Node.js',
  //               is_main_tech: true,
  //             },
  //             {
  //               name: 'React',
  //               is_main_tech: true,
  //             },
  //           ],
  //         },
  //         {
  //           id: 6,
  //           city: 'Florianópolis - SC',
  //           experience: '5-6 years',
  //           technologies: [
  //             {
  //               name: 'Node.js',
  //               is_main_tech: false,
  //             },
  //             {
  //               name: 'React',
  //               is_main_tech: false,
  //             },
  //             {
  //               name: 'Ruby',
  //               is_main_tech: true,
  //             },
  //             {
  //               name: 'Python',
  //               is_main_tech: true,
  //             },
  //           ],
  //         },
  //         {
  //           id: 7,
  //           city: 'São Paulo - SP',
  //           experience: '7-8 years',
  //           technologies: [
  //             {
  //               name: 'Node.js',
  //               is_main_tech: true,
  //             },
  //             {
  //               name: 'React',
  //               is_main_tech: false,
  //             },
  //             {
  //               name: 'PHP',
  //               is_main_tech: false,
  //             },
  //             {
  //               name: 'Ruby',
  //               is_main_tech: false,
  //             },
  //             {
  //               name: 'Vue.js',
  //               is_main_tech: true,
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   };

  //   mockedAxios.get.mockImplementationOnce(() => Promise.resolve(mockedData));

  //   const listCandidates = new ListCandidatesService();

  //   const candidates = await listCandidates.execute({
  //     experience: '0-1 years',
  //     city: 'Divinópolis - MG',
  //     technologies: ['Node.js', 'React'],
  //   });

  //   expect(candidates.length).toBe(5);
  // });
});
