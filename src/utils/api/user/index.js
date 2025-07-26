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

async function getMyAchievements() {
  const response = await fetchWithToken(`${BASE_URL}/my/achievements`);
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data.myAchievements };
}

async function editProfile(fullname, locationId) {
  const response = await fetchWithToken(`${BASE_URL}/users`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fullname, locationId }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

export { getMyItems, getMyAchievements, editProfile };
