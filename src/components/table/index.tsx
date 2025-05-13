
import type { FC } from "react"


interface ITableProps {
  headers?: string[]
  data: object[]
}

export const Table: FC<ITableProps> = ({ headers, data }) => {

  return (
    <div>
      <table>
        {headers &&
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
        }
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {Object.values(item).map((value, index) => (
                <td key={index}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
