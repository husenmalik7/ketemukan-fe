import BASE_URL from '../../config';
import { fetchWithToken } from '../index';

async function getMyItems() {
  const response = await fetchWithToken(`${BASE_URL}/my/items`);
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data.myItems };
}

export { getMyItems };
