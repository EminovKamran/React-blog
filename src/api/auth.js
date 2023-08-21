// eslint-disable-next-line import/prefer-default-export
export function fetchSignUp(body) {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(body),
  };
  fetch('https://blog.kata.academy/api/users', options)
    .then((response) => response.json())
    .then((json) => console.log(json));
}

export function fetchSignIn(body) {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(body),
  };
  fetch('https://blog.kata.academy/api/users/login', options)
    .then((response) => response.json())
    .then((json) => console.log(json));
  console.log(body);
}
