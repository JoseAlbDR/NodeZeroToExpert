import { GithubStarPayload } from '../../interfaces';

export class GithubService {
  constructor() {}

  onStar(payload: GithubStarPayload) {
    let message: string = '';

    const { starred_at, action, sender, repository } = payload;

    message = `User ${sender.login} ${action} star on ${repository.full_name}`;

    return message;
  }
}
