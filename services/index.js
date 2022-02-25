
const fetchSheet = (options = {}) => fetch('/api/sheet', options)
  .then((res) => res.json())
  .then((data) => data)

const sheetPost = (body = {}) => fetchSheet({
  method: 'POST',
  body: JSON.stringify({ ...body }),
  headers: {
    'Content-Type': 'application/json'
  }
})

const sheetGet = () => fetchSheet({
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})

export {
  sheetGet,
  sheetPost
}