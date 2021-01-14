import { Seeder } from 'typeorm-seeding';
import { getRepository } from 'typeorm';
import axios from 'axios';

import Candidate from '../../modules/candidates/entities/Candidate';
import Tech from '../../modules/candidates/entities/Tech';

export default class CreateUsers implements Seeder {
  public async run(): Promise<void> {
    const response = await axios.get(process.env.API_URL || '');

    const { candidates } = response.data;

    const candidateRepository = getRepository(Candidate);

    await candidateRepository.delete({});

    const promises = candidates.map(async (candidate: Candidate) => {
      const createdCandidate = candidateRepository.create({
        experience: candidate.experience,
        city: candidate.city,
      });

      await candidateRepository.save(createdCandidate);

      const { id } = createdCandidate;

      const techRepository = getRepository(Tech);

      const techsPromises = candidate.technologies.map(async (tech: Tech) => {
        const createdTech = techRepository.create({
          candidate_id: id,
          name: tech.name,
          is_main_tech: tech.is_main_tech,
        });

        await techRepository.save(createdTech);
      });

      await Promise.all(techsPromises);
    });

    await Promise.all(promises);
  }
}
