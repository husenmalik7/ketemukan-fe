import BASE_URL from '../config';

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

async function fetchWithToken(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}

async function getAllLocations() {
  const response = await fetch(`${BASE_URL}/locations`);
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data.locations };
}

export { fetchWithToken, getAllLocations };
