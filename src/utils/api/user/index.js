import BASE_URL from '../../config';
import { fetchWithToken } from '../index';
import { toast } from 'react-toastify';

async function getMyItems(queryParams) {
  const params = queryParams ? `?title=${encodeURIComponent(queryParams)}` : '';

  const response = await fetchWithToken(`${BASE_URL}/my/items${params}`);
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

async function editProfilePicture(picture) {
  const formData = new FormData();
  formData.append('picture', picture);

  const response = await fetchWithToken(`${BASE_URL}/users/picture`, {
    method: 'POST',
    body: formData,
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    toast.error(responseJson.message);
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function getHome() {
  const response = await fetch(`${BASE_URL}/home`);
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data.home };
}

export { getMyItems, getMyAchievements, editProfile, editProfilePicture, getHome };
