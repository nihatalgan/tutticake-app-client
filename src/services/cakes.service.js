import axios from 'axios';

class CakesService {
  constructor() {
    // Create a new instance of axios with a custom configuration
    this.api = axios.create({
      baseURL: import.meta.env.VITE_SERVER_URL
      // We set our API's base URL so that all requests use the same base URL
    });

      // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use(config => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem('authToken');

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  addCake = ({ name, description }) => {
    return this.api.post('/cakes', { name, description });
  };

  getCakeDetails = (cakeId) => {
    return this.api.get(`/cakes/${cakeId}`);
  };

  editCakeDetails = (cakeId, data) => {
    return this.api.put(`/cakes/${cakeId}`, data);
  };

  deleteCake = (cakeId) => {
    return this.api.delete(`/cakes/${cakeId}`);
  };
}

// Create one instance object
const cakesService = new CakesService();

export default cakesService;