import { Handler, HandlerContext, HandlerEvent } from '@netlify/functions';
import { GithubStarPayload } from '../../../src/interfaces/github-start.interface';
import { GithubIssuePayload } from '../../../src/interfaces/github-issue.interface';

const notify = async (message: string) => {
  const body = {
    content: message,
    embeds: [
      {
        image: {
          url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2NqbTg5dW9sbm5uYmd5MzZrYTd5b3R1d3l0ZGl4aGVnY3M4eDV2MyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/cb9aF9tDyiRkYbz3BX/giphy.gif',
        },
      },
    ],
  };

  const res = await fetch(process.env.DISCORD_WEBHOOK_URL ?? '', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    console.log('Error sending message to discord');
    return false;
  }

  return true;
};

const onStar = (payload: GithubStarPayload) => {
  const { starred_at, action, sender, repository } = payload;

  const message = `User ${sender.login} ${action} star on ${repository.full_name}`;

  return message;
};

const onIssue = (payload: GithubIssuePayload) => {
  const { action, issue } = payload;

  if (action === 'opened')
    return `An issue was opened by ${issue.user.login} with this title ${issue.title}`;

  if (action === 'closed')
    return `An issue was closed by ${issue.user.login} with this title ${issue.title}`;

  if (action === 'reopened')
    return `An issue was reopened by ${issue.user.login} with this title ${issue.title}`;

  return `Unhandled action for the issue event ${action}`;
};

export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  const githubEvent = event.headers['x-github-event'] ?? 'unknown';
  // const signature = req.header('x-hub-signature-256') ?? 'unknown';
  const payload = JSON.parse(event.body ?? '{}');

  let message = '';

  switch (githubEvent) {
    case 'star':
      message = onStar(payload);
      break;
    case 'issues':
      message = onIssue(payload);
      break;
    default:
      console.log('Unknown event: ' + githubEvent);
  }

  await notify(message);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'done',
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };
};
