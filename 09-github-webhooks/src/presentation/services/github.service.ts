import { GithubIssuePayload, GithubStarPayload } from '../../interfaces';

export class GithubService {
  constructor() {}

  onStar(payload: GithubStarPayload) {
    const { starred_at, action, sender, repository } = payload;

    const message = `User ${sender.login} ${action} star on ${repository.full_name}`;

    return message;
  }

  onIssue(payload: GithubIssuePayload) {
    const { action, issue } = payload;

    if (action === 'opened') {
      const message = `An issue was opened by ${issue.user.login} with this title ${issue.title}`;

      return message;
    }

    if (action === 'closed') {
      const message = `An issue was closed by ${issue.user.login} with this title ${issue.title}`;

      return message;
    }

    if (action === 'reopened') {
      const message = `An issue was reopened by ${issue.user.login} with this title ${issue.title}`;

      return message;
    }

    return `Unhandled action for the issue event ${action}`;
  }
}
