import apiClient from './apiClient';

const nobelService = {
  async fetchLaureates() {
    const res = await apiClient.get('/laureate.json');
    return res.data.laureates || [];
  },

  async fetchPrizes() {
    const res = await apiClient.get('/prize.json');
    return res.data.prizes || [];
  },

  filterLaureates(laureates, { fullname = '', category = '', year = '' }) {
    return laureates.filter(la => {
      const name = (l.firstname || '') + ' ' + (l.surname || '');
      const matchesName = !fullname.trim() || name.toLowerCase().includes(fullname.toLowerCase());
      const matchesCategory = !category || la?.prizes?.some(p => p.category === category);
      const matchesYear = !year || la?.prizes?.some(p => String(p.year).includes(year));
      return matchesName && matchesCategory && matchesYear;
    });
  },

  mapLaureatesToTableRows(laureates, page = 1, itemsPerPage = 10) {
    const startIndex = (page - 1) * itemsPerPage;
    const paginated = laureates.slice(startIndex, startIndex + itemsPerPage);

    return paginated.map(l => [
      l.id || '—',
      (l.firstname || '') + ' ' + (l.surname || '—'),
      l.born || '—',
      l.died || '—',
      (l.prizes && l.prizes.length > 0)
        ? l.prizes.map(p => `${p.year} (${p.category})`).join('; ')
        : '—'
    ]);
  },

  mapPrizesToTableRows(prizes, page = 1, itemsPerPage = 10) {
    const startIndex = (page - 1) * itemsPerPage;
    const paginated = prizes.slice(startIndex, startIndex + itemsPerPage);

    return paginated.map(p => [
      p.year,
      p.category,
      p.prizeAmount || '—',
      (p.laureates && p.laureates.length > 0)
        ? p.laureates.map(l => (l.firstname || '') + ' ' + (l.surname || '')).join(', ')
        : '—',
      p.motivation || '—'
    ]);
  }
};

export default nobelService;