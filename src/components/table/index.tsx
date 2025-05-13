
import type { FC } from "react"


interface ITableProps {
  headers?: string[]
  data: object[]
}

export const Table: FC<ITableProps> = ({ headers, data }) => {

  return (
    <div className="rounded-xl bg-white border border-gray-100 text-sm overflow-x-auto">
      <table className="table-auto w-full">
        {headers &&
          <thead >
            <tr className="border-b border-gray-100 text-gray-600">
              {headers.map((header, index) => (
                <th key={index} className="p-4 text-left">{header}</th>
              ))}
            </tr>
          </thead>
        }
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50 border-b border-gray-100">
              {Object.values(item).map((value, index) => (
                <td key={index} className="p-4">{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
