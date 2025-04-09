import { config } from 'dotenv';
import sanityClient from '@sanity/client';

config(); // Leser .env-fila

const client = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: true
});

export default async function () {
  return await client.fetch(`*[_type == "news" && language == "nn"] | order(_createdAt desc)`);
}
