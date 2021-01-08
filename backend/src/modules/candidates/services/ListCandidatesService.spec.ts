import axios from 'axios';

import AppError from '../../../errors/AppError';

import ListCandidatesService from './ListCandidatesService';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ListCandidates', () => {
  it('should be able to list all the candidates', async () => {
    const mockedData = {
      data: {
        candidates: [
          {
            id: 1,
            city: 'Rio de Janeiro - RJ',
            experience: '12+ years',
            technologies: [
              {
                name: 'Java',
                is_main_tech: true,
              },
              {
                name: 'Python',
                is_main_tech: false,
              },
            ],
          },
          {
            id: 2,
            city: 'Divinópolis - MG',
            experience: '0-2 years',
            technologies: [
              {
                name: 'Node',
                is_main_tech: true,
              },
              {
                name: 'React',
                is_main_tech: true,
              },
            ],
          },
        ],
      },
    };

    mockedAxios.get.mockImplementationOnce(() => Promise.resolve(mockedData));

    const listCandidates = new ListCandidatesService();

    const candidates = await listCandidates.execute();

    expect(candidates.length).toBeGreaterThan(0);
    expect(candidates[0].id).toBe(1);
    expect(candidates[1].id).toBe(2);
  });

  it('should not be able to list the candidates', async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.reject(new AppError('Network Error', 500)),
    );

    const listCandidates = new ListCandidatesService();

    await expect(listCandidates.execute()).rejects.toBeInstanceOf(AppError);
  });
});
