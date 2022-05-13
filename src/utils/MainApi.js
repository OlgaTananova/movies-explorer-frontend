// const baseUrl = 'https://api.movie-explorerbyolga.nomoredomains.work';
const baseUrl = 'http://localhost:3000'
const headers = {
  "Content-Type": "application/json",
}

const checkResponse = ((response)=>{
  if (response.ok) {
    return response.json();
  }
  return response.text().then((text) => {
    const error = JSON.parse(text)
    throw new Error(error.message)
  })
})

export const signUp = ((name, email, password)=>{
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      "name": name,
      "password" : password,
      "email": email
    })
  })
    .then((res)=> {
      return checkResponse(res)
    })
})

export const signIn = ((email, password)=> {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      "password": password,
      "email": email
    }),
    credentials: 'include'
  })
    .then((res) => {
    return checkResponse(res);
    })
})

export const verifyUser = () => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: 'include'
  })
    .then((res) => {
      return checkResponse(res);
    })
}

export const logOut = () => {
  return fetch(`${baseUrl}/signout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: 'include'
  })
    .then((res) => {
      return checkResponse(res);
    })
}
