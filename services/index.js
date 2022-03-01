
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

function TableFactory(values) {
  const table = {};
  
  if (values) {
    table.header = values[0];
    table.body = values.slice(1);
  }

  return table
}

const getNameToEmail = (name = '@fake.com') =>
  `${name.split('', 1)[0].toUpperCase()}${name.slice(1).split('@', 1)[0]}`

export {
  sheetGet,
  sheetPost,
  TableFactory,
  getNameToEmail
}