import { config } from 'dotenv';
import sanityClient from '@sanity/client';

config();

const client = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: true
});

export default async function () {
  return await client.fetch(`*[_type == "report" && language == "nn"] | order(year desc)`);
}
