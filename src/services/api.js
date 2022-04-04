const URL_INI = 'https://economia.awesomeapi.com.br/json/all';

export default async function fetchAPICurrencies() {
  try {
    const url = `${URL_INI}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    throw new Error('You must provide an url');
  }
}
