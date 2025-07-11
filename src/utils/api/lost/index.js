import BASE_URL from '../../config';

async function getLostItems() {
  const response = await fetch(`${BASE_URL}/losts`);
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data.losts };
}

async function getLostItemDetail(lostId) {
  const response = await fetch(`${BASE_URL}/losts/${lostId}`);
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data.lostDetail };
}

export { getLostItems, getLostItemDetail };
