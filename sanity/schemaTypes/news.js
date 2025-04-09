export default {
    name: 'news',
    title: 'Nyheit',
    type: 'document',
    fields: [
      { name: 'title', title: 'Tittel', type: 'string' },
      { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
      { name: 'content', title: 'Innhald', type: 'text' },
      { name: 'language', title: 'Språk', type: 'string' }
    ]
  }
  