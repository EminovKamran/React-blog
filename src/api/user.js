export async function fetchSignUp(body) {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(body),
  };
  const response = await fetch('https://blog.kata.academy/api/users', options);
  const json = await response.json();
  return json;
}

export async function fetchSignIn(body) {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(
    'https://blog.kata.academy/api/users/login',
    options,
  );
  const json = await response.json();
  return json;
}

export async function fetchEditProfile(body, token) {
  const options = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(body),
  };
  const response = await fetch('https://blog.kata.academy/api/user', options);
  const json = await response.json();
  return json;
}
