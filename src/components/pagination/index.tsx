import { ChevronLeft, ChevronRight } from "lucide-react"
import type { FC } from "react"

const PageArrow = ({ direction, currentPage, onClick, isDisable = false }:
  {
    direction: 'left' | 'right',
    currentPage: number,
    onClick?: (page: number) => void,
    isDisable?: boolean
  }) => {
  return (
    <button
      onClick={() => onClick && onClick(currentPage + (direction === 'left' ? -1 : 1))}
      disabled={isDisable}
    >
      {direction === 'left' ? <ChevronLeft /> : <ChevronRight />}
    </button>
  )
}

const PageButton = ({ pageNumber, active = false, onClick }:
  {
    pageNumber: number,
    active?: boolean,
    onClick?: (page: number) => void
  }) => {
  return (
    <button disabled={active} onClick={() => onClick && onClick(pageNumber)}>
      {pageNumber}
    </button>
  )
}

interface IPaginationProps {
  pageSize: number
  currentPage: number
  totalPages: number
  onPageChange?: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
}

export const Pagination: FC<IPaginationProps> = ({ pageSize, currentPage, totalPages, onPageChange, onPageSizeChange }) => {

  return (
    <ul className="flex gap-2">
      <li>
        <label>Go to:</label>
        <input type='text' size={3} value={currentPage} />
      </li>
      <li>
        <PageArrow direction="left" currentPage={currentPage} onClick={onPageChange} />
      </li>
      {totalPages <= 5 ?
        <>
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index}>
              <PageButton pageNumber={index + 1} />
            </li>
          ))}
        </>
        :
        <>
          {currentPage <= 3 ?
            <>
              {Array.from({ length: 3 }, (_, index) => (
                <li key={index}>
                  <PageButton pageNumber={index + 1} onClick={onPageChange} />
                </li>
              ))}
            </>
            :
            <>
              <li>
                <PageButton pageNumber={1} onClick={onPageChange} />
              </li>
              <li>...</li>
            </>
          }
          {currentPage > 3 && currentPage < totalPages - 2 &&
            <li>
              <PageButton pageNumber={currentPage} active onClick={onPageChange} />
            </li>
          }
          {currentPage < totalPages - 2 ?
            <>
              <li>...</li>
              <li>
                <PageButton pageNumber={totalPages} onClick={onPageChange} />
              </li>
            </>
            :
            <>
              {Array.from({ length: 3 }, (_, index) => (
                <li key={index}>
                  <PageButton pageNumber={totalPages - (2 - index)} onClick={onPageChange} />
                </li>
              ))}
            </>


          }
        </>
      }
      <li>
        <PageArrow direction="right" currentPage={currentPage} onClick={onPageChange} />
      </li>
      <li>
        <label htmlFor="pageSize">Page size:</label>
        <select name="pageSize" id="pageSize" value={pageSize} onChange={(e) => onPageSizeChange && onPageSizeChange(Number(e.target.value))}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </li>
    </ul>
  )
}
