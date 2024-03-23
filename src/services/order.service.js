import axios from "axios";

class OrderService {
  constructor() {
    // Create a new instance of axios with a custom configuration
    this.api = axios.create({
      baseURL: import.meta.env.VITE_SERVER_URL,
      // We set our API's base URL so that all requests use the same base URL
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  addCakeToCart = (cakeId) => {
    console.log("service->addCake", cakeId);

    return this.api.post(`/order/addcake/${cakeId}`);
  };

  //list cart
  getCartDetails = () => {
    return this.api.get(`/order/cart`);
  };

  closeOrder = (orderId, totalCost) => {
    return this.api.put(`/order/${orderId}/close`, { totalCost });
  };

  getPreviousOrders = () => {
    console.log("service->get orders ");
    return this.api.get(`/order/list`);
  };
}

// Create one instance object
const orderService = new OrderService();

export default orderService;
