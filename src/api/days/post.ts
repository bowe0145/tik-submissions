import { Auth } from 'aws-amplify'

const url = `https://pzm80umfn2.execute-api.us-east-1.amazonaws.com/dev/days`
const method = 'POST'

export const post = async (body: any) => {
  const token = await Auth.currentSession()
  const idToken = token.getIdToken().getJwtToken()

  const headers = {
    Authorization: idToken,
    'Content-Type': 'application/json'
  }

  console.log(`post body`, body)

  const response = await fetch(url, {
    method,
    headers,
    body: JSON.stringify(body)
  })

  return response.json()
}

// export const post = async (body: any) => {
//   const token = await Auth.currentSession()
//   const headers = {
//     'Content-Type': 'application/json',
//     Authorization: `${token.getIdToken().getJwtToken()}`
//   }

//   const response = await fetch(url, {
//     method,
//     headers,
//     body: JSON.stringify(body)
//   })

//   return response.json()
// }
