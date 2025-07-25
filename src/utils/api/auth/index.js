import BASE_URL from '../../config';
import { fetchWithToken } from '../index';
import { toast } from 'react-toastify';

async function register({ username, password, fullname, locationId }) {
  const response = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password, fullname, locationId }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    toast.error(responseJson.message);
    return { error: true };
  }

  return { error: false };
}

async function login({ username, password }) {
  const response = await fetch(`${BASE_URL}/authentications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    toast.error(responseJson.message);
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

function putAccessToken(accessToken) {
  return localStorage.setItem('accessToken', accessToken);
}

async function getUserLogged() {
  const response = await fetchWithToken(`${BASE_URL}/users`);
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data.userDetail };
}

export { register, login, putAccessToken, getUserLogged };
