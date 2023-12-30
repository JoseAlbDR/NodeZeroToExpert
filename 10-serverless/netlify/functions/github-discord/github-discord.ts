import { Handler, HandlerContext, HandlerEvent } from '@netlify/functions';

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

export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  await notify('Hello world from netlify functions');

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
