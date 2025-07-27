import BASE_URL from '../../config';
import { fetchWithToken } from '../index';
import { toast } from 'react-toastify';

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

async function addLostComment({ id, comment }) {
  const response = await fetchWithToken(`${BASE_URL}/losts/${id}/comments`, {
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

async function addLostItem(title, shortDesc, description, lostDate, categoryId, locationId) {
  const response = await fetchWithToken(`${BASE_URL}/losts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, shortDesc, description, lostDate, categoryId, locationId }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function deleteLostItem(lostId) {
  const response = await fetchWithToken(`${BASE_URL}/losts/${lostId}`, {
    method: 'DELETE',
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function editLostPicture(lostId, picture) {
  const formData = new FormData();
  formData.append('picture', picture);

  const response = await fetchWithToken(`${BASE_URL}/losts/${lostId}/picture`, {
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

export {
  getLostItems,
  getLostItemDetail,
  addLostComment,
  addLostItem,
  deleteLostItem,
  editLostPicture,
};
