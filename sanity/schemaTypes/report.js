export default {
    name: 'report',
    title: 'Årsmelding',
    type: 'document',
    fields: [
      { name: 'year', title: 'År', type: 'number' },
      { name: 'filename', title: 'Filnavn (PDF)', type: 'string' },
      { name: 'language', title: 'Språk', type: 'string' }
    ]
  }
  