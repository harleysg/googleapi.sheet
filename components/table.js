
export default function Table({data}) {
  if (data.body || data.header) {
    return (
      <div className='c-table_wrapper'>
        <table className='c-table'>
          <thead>
            <tr>
              {data.header.map((th) => (
                <th key={th}>{th}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.body.map((row) => (
              <tr key={row}>
                {row.map((td) => (
                  <td key={td}>{td}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  } else {
    return (
      <></>
    )
  }
}