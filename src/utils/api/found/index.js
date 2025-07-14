import BASE_URL from '../../config';
import { fetchWithToken } from '../index';

async function getFoundItems() {
  const response = await fetch(`${BASE_URL}/founds`);
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data.founds };
}

async function getFoundItemDetail(foundId) {
  const response = await fetch(`${BASE_URL}/founds/${foundId}`);
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data.foundDetail };
}

async function addFoundComment({ id, comment }) {
  const response = await fetchWithToken(`${BASE_URL}/founds/${id}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ comment }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function addFoundItem(title, shortDesc, description, foundDate) {
  const response = await fetchWithToken(`${BASE_URL}/founds`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, shortDesc, description, foundDate }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

export { getFoundItems, getFoundItemDetail, addFoundComment, addFoundItem };
