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
  getOrderDetails = () => {
    return this.api.get(`/order/cart`);
  };

  closeOrder = (orderId) => {
    return this.api.put(`/order/${orderId}/close`);
  };

  //checkout
  //remove from cart

  //   getCakeDetails = (cakeId) => {
  //     return this.api.get(`/cakes/${cakeId}`);
  //   };

  //   editCakeDetails = (
  //     cakeId,
  //     { name, description, price, preperationTime, imageUrl }
  //   ) => {
  //     return this.api.put(`/cakes/${cakeId}`, {
  //       name,
  //       description,
  //       price,
  //       preperationTime,
  //       imageUrl,
  //     });
  //   };

  //   deleteCake = (cakeId) => {
  //     return this.api.delete(`/cakes/${cakeId}`);
  //   };
}

// Create one instance object
const orderService = new OrderService();

export default orderService;
