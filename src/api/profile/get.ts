// Deprecated: true
import { Auth } from 'aws-amplify'

const url = `https://pzm80umfn2.execute-api.us-east-1.amazonaws.com/dev/profile/`
const method = 'GET'

export const get = async () => {
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
    throw new Error('Could not get profile')
  }

  const json = await response.json()
  return json
}
