import { NextApiRequest, NextApiResponse } from 'next';

const sleep = (delay = 2000) =>
  new Promise(resolve => {
    setTimeout(resolve, delay);
  });

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { delay, forceError } = req.query;

  if (delay) await sleep(parseInt(delay as string));
  if (forceError && JSON.parse(forceError as string)) {
    res.status(500).json({ err: `${new Error('an error')}`, ...req.query });
  } else {
    res.status(200).json(req.query);
  }
};

export default handler;
