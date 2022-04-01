const URL_INI = 'https://economia.awesomeapi.com.br/json/all';

export async function fetchAPICurrencies() {
  try {
    const url = `${URL_INI}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error('You must provide an url');
  }
}

export async function getProductsFromCategoryAndQuery(categoryId = '', query = '') {
  try {
    console.log(categoryId);
    console.log(query);
    // const url = `${URL_INI}search?category=${categoryId}&q=${query}`;
    // const result = await fetch(url);
    // const data = await result.json();
    // return data;
  } catch (err) {
    throw new Error('You must provide an url');
  }
}
