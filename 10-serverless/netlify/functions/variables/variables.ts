import { Handler, HandlerContext, HandlerEvent } from '@netlify/functions';

export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  const myImportantVariable = process.env.MY_IMPORTANT_VARIABLE;

  if (!myImportantVariable) throw new Error('Missing MY_IMPORTANT_VARIABLE');

  return {
    statusCode: 200,
    body: JSON.stringify({
      myImportantVariable,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };
};
