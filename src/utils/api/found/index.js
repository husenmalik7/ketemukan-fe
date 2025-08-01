import BASE_URL from '../../config';
import { fetchWithToken } from '../index';
import { toast } from 'react-toastify';

async function getFoundItems(title, location, category) {
  let titleParams = title;
  let locationParams = location;
  let categoryParams = category;

  if (titleParams === null) titleParams = '';
  if (locationParams === null) locationParams = '';
  if (categoryParams === null) categoryParams = '';

  const condition = `?title=${encodeURIComponent(titleParams)}&location=${locationParams}&category=${categoryParams}`;

  const response = await fetch(`${BASE_URL}/founds${condition}`);
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

async function addFoundItem(
  title,
  shortDesc,
  description,
  foundDate,
  categoryId,
  locationId,
  longitude,
  latitude
) {
  const response = await fetchWithToken(`${BASE_URL}/founds`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      shortDesc,
      description,
      foundDate,
      categoryId,
      locationId,
      longitude,
      latitude,
    }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function editFoundItem(
  foundId,
  title,
  shortDesc,
  description,
  foundDate,
  status,
  longitude,
  latitude,
  categoryId,
  locationId
) {
  const response = await fetchWithToken(`${BASE_URL}/founds/${foundId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      shortDesc,
      description,
      foundDate,
      status,
      longitude,
      latitude,
      categoryId,
      locationId,
    }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function deleteFoundItem(foundId) {
  const response = await fetchWithToken(`${BASE_URL}/founds/${foundId}`, {
    method: 'DELETE',
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function editFoundPicture(foundId, picture) {
  const formData = new FormData();
  formData.append('picture', picture);

  const response = await fetchWithToken(`${BASE_URL}/founds/${foundId}/picture`, {
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
  getFoundItems,
  getFoundItemDetail,
  addFoundComment,
  addFoundItem,
  deleteFoundItem,
  editFoundPicture,
  editFoundItem,
};
