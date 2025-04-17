import fetch from "node-fetch";
import { parse } from "csv-parse/sync";

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/184eBUXJeMgCDGf735z4KmvVekbveiZ2iBaqZdBsAr5c/gviz/tq?tqx=out:csv";

export default async function () {
  try {
    const res = await fetch(SHEET_URL);
    const csv = await res.text();
    const rows = parse(csv, {
      columns: true,
      skip_empty_lines: true,
    });

    // Sett for å unngå duplikate slugs
    const slugs = new Set();

    // Slug-generator
    function makeSlug(text) {
      return text
        ?.toLowerCase()
        .replace(/[æåä]/g, "a")
        .replace(/[øö]/g, "o")
        .replace(/[éèê]/g, "e")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
    }

    const reserved = ["index", "nytt", "kontakt", "om", "dokument", "fairplay", "utmerkelse"];

    return rows
      .filter((post) => post.tittel) // hopp over rader uten tittel
      .map((post) => {
        let baseSlug = post.slug?.trim().toLowerCase() || makeSlug(post.tittel);
        if (!baseSlug) {
          baseSlug = "ukjent-nyhet";
        }
        if (reserved.includes(baseSlug)) {
          baseSlug += "-nyhet";
        }

        // Lag unik slug
        let slug = baseSlug;
        let i = 1;
        while (slugs.has(slug)) {
          slug = `${baseSlug}-${i}`;
          i++;
        }
        slugs.add(slug);

        return {
          ...post,
          slug,
          title: post.tittel, // legg til alias for templaten
        };
      })
      .sort((a, b) => new Date(b.dato) - new Date(a.dato));
  } catch (err) {
    console.error("Feil ved henting av nyheiter:", err);
    return [];
  }
}