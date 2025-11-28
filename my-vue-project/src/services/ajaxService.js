import axios from 'axios';

class ajaxService {
  constructor(baseURL = '') {
    this.client = axios.create({
      baseURL: baseURL,
      timeout: 10000,
    });
  }

  get(url) {
    return this.client.get(url);
  }
}

export default ajaxService;