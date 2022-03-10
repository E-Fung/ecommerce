const axios = require('axios');

const productURL = 'https://fakestoreapi.com/products';

const populateProducts = async () => {
  let tempProductList = await axios.get(productURL);

  tempProductList.data.forEach(async (product) => {
    try {
      await addProduct(product);
    } catch {
      (err) => console.log(err);
    }
  });
};

const addProduct = async (data) => {
  return axios.post('http://localhost:5000/product', data);
};

module.exports = populateProducts;
