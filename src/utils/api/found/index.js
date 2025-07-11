import BASE_URL from '../../config';

async function getFoundItems() {
  const response = await fetch(`${BASE_URL}/founds`);
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data.founds };
}

export { getFoundItems };
