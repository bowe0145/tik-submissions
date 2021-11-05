import { Auth } from 'aws-amplify'

const url = `https://pzm80umfn2.execute-api.us-east-1.amazonaws.com/dev/days/`
const method = 'GET'

export const get = async (date: Date) => {
  // Get the user's token from aws-amplify
  const token = await Auth.currentSession()

  // Add the date timestamp to the url
  let updatedUrl = url + +date

  const response = await fetch(updatedUrl, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token.getIdToken().getJwtToken()}`
    }
  })

  if (response.status !== 200) {
    throw new Error('Could not get days')
  }

  const json = await response.json()
  return json
}

export const getAll = async () => {
  // Get the user's token from aws-amplify
  const token = await Auth.currentSession()

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token.getIdToken().getJwtToken()}`
    }
  })

  if (response.status !== 200) {
    throw new Error('Could not get days')
  }

  const json = await response.json()
  return json
}
