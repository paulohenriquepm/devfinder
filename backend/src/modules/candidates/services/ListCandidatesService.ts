import axios from 'axios';

interface IRequest {
  experience: any;
  city: any;
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
    const response = await axios.get(process.env.API_URL || '');

    const { candidates } = response.data;

    let filteredCandidates: ICandidate[] = [];
    let ids: Array<number> = [];

    filteredCandidates = candidates.filter(
      (candidate: ICandidate) =>
        candidate.experience === experience &&
        candidate.city === city &&
        candidate.technologies.filter(
          tech =>
            technologies.includes(tech.name) && tech.is_main_tech === true,
        ).length === technologies.length,
    );

    if (filteredCandidates.length !== 5) {
      ids = filteredCandidates.map((candidate: ICandidate) => candidate.id);

      const relatedCandidates = candidates.filter(
        (candidate: ICandidate) =>
          !ids.includes(candidate.id) &&
          candidate.city === city &&
          candidate.technologies.filter(
            tech =>
              technologies.includes(tech.name) && tech.is_main_tech === true,
          ).length === technologies.length,
      );

      filteredCandidates = filteredCandidates.concat(relatedCandidates);
      ids = ids.concat(
        relatedCandidates.map((candidate: ICandidate) => candidate.id),
      );
    }

    if (filteredCandidates.length !== 5) {
      const relatedCandidates = candidates.filter(
        (candidate: ICandidate) =>
          !ids.includes(candidate.id) &&
          candidate.technologies.filter(
            tech =>
              technologies.includes(tech.name) && tech.is_main_tech === true,
          ).length === technologies.length,
      );

      filteredCandidates = filteredCandidates.concat(relatedCandidates);
      ids = ids.concat(
        relatedCandidates.map((candidate: ICandidate) => candidate.id),
      );
    }

    if (filteredCandidates.length !== 5) {
      const relatedCandidates = candidates.filter(
        (candidate: ICandidate) =>
          !ids.includes(candidate.id) &&
          candidate.technologies.filter(tech =>
            technologies.includes(tech.name),
          ).length === technologies.length,
      );

      filteredCandidates = filteredCandidates.concat(relatedCandidates);
      ids = ids.concat(
        relatedCandidates.map((candidate: ICandidate) => candidate.id),
      );
    }

    if (filteredCandidates.length !== 5) {
      const relatedCandidates = candidates.filter(
        (candidate: ICandidate) => !ids.includes(candidate.id),
      );

      filteredCandidates = filteredCandidates.concat(relatedCandidates);
    }

    filteredCandidates = filteredCandidates.slice(0, 5);

    return filteredCandidates;
  }
}
