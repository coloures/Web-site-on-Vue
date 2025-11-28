import AjaxService from './AjaxService.js';

const apiClient = new AjaxService('https://api.nobelprize.org/v1');

class NobelService {
  fetchLaureates() {
    return apiClient.get('/laureate.json')
      .then(response => response.data.laureates || [])
      .catch(error => {
        console.error('Error fetching laureates:', error);
        return [];
      });
  }

  fetchPrizes() {
    return apiClient.get('/prize.json')
      .then(response => response.data.prizes || [])
      .catch(error => {
        console.error('Error fetching prizes:', error);
        return [];
      });
  }

  filterLaureates(laureates, filters) {
    return laureates.filter(laureate => {
      const fullName = (laureate.firstname || '') + ' ' + (laureate.surname || '');
      const matchesName = !filters.search || 
        fullName.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCategory = !filters.category || 
        (laureate.prizes && laureate.prizes.some(p => p.category === filters.category));
      const matchesYear = !filters.year || 
        (laureate.prizes && laureate.prizes.some(p => String(p.year).includes(filters.year)));
      
      return matchesName && matchesCategory && matchesYear;
    });
  }

  filterPrizes(prizes, filters) {
    return prizes.filter(prize => {
      const matchesCategory = !filters.category || prize.category === filters.category;
      const matchesYear = !filters.year || String(prize.year).includes(filters.year);
      const matchesSearch = !filters.search || 
        (prize.laureates && prize.laureates.some(l => {
          const fullName = (l.firstname || '') + ' ' + (l.surname || '');
          return fullName.toLowerCase().includes(filters.search.toLowerCase());
        }));
      const motivationText = (prize.motivation || prize.overallMotivation || '').toLowerCase();
      const matchesMotivation = !filters.motivationSearch || 
        motivationText.includes(filters.motivationSearch.toLowerCase());

      return matchesCategory && matchesYear && matchesSearch && matchesMotivation;
    });
  }
}

export default new NobelService();