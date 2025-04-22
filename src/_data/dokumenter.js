import fetch from 'node-fetch';
import { parse } from 'csv-parse/sync';

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/12IuNw3Ky9RzDxENuOyeSYUYOyQRUvnmdbrm87S3ZGFs/gviz/tq?tqx=out:csv';

export default async function () {
  try {
    const res = await fetch(SHEET_URL);
    const csv = await res.text();
    const rows = parse(csv, {
      columns: true,
      skip_empty_lines: true
    });

    return rows.sort((a, b) => b.år - a.år);
  } catch (err) {
    console.error("Feil ved henting av dokumenter:", err);
    return [];
  }
}
