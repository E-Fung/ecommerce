import axios from 'axios';

export const getProductsByName = async (name: string) => {
  let { data } = await axios.get(`http://localhost:5000/productByName?name=${name}`).then((resp) => resp);
  return data;
};
