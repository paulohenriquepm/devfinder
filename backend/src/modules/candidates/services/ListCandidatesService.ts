import axios from 'axios';

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

interface IResponse {
  candidates: ICandidate[];
}

export default class ListCandidatesService {
  public async execute(): Promise<ICandidate[]> {
    const response = await axios.get(process.env.API_URL || '');

    const { candidates } = response.data;

    return candidates;
  }
}
