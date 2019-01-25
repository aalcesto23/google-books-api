const API_KEY = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY
const API_HOST = 'https://www.googleapis.com/books/v1/volumes'
const MAX_RESULTS = '40'

export async function search(query) {
  let response = {}
  await (await (fetch(`${API_HOST}?q=${query}&maxResults=${MAX_RESULTS}&key=${API_KEY}`)
    .then(res => {
      response = res.json()
    })
    .catch(err => {
      console.log('Error performing search: ', err)
    })
  ))

  return response
}