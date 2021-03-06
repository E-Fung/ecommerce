const axios = require('axios');
const db = require('../db');

const productURL = 'https://fakestoreapi.com/products';

const populateProducts = async () => {
  db.sequelize.drop({ force: true });
  await db.sequelize.sync({ force: true });
  console.log('db synced');
  let tempProductList = await axios.get(productURL);

  tempProductList.data.forEach(async (product) => {
    const productParams = {
      name: product.title,
      price: product.price,
      photoUrl: product.image,
      category: product.category,
      description: product.description,
    };

    try {
      await addProduct(productParams);
    } catch {
      (err) => console.log(err);
    }
  });
};

const addProduct = async (data) => {
  await axios.post('https://neat-shell-349400.uc.r.appspot.com/product', data);
};

async function runSeed() {
  console.log('seeding...');
  try {
    await populateProducts();
    console.log('seeded');
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.sequelize.close();
    console.log('db connection closed');
  }
}

if (module === require.main) {
  runSeed();
}
