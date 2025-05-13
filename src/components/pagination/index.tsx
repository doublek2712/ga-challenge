import { ChevronLeft, ChevronRight } from "lucide-react"
import type { FC } from "react"

import './styles.css'

const PageArrow = ({ direction, currentPage, onClick, isDisabled = false }:
  {
    direction: 'left' | 'right',
    currentPage: number,
    onClick?: (page: number) => void,
    isDisabled?: boolean
  }) => {
  return (
    <button
      className="page-arrow w-8 h-8 flex items-center justify-center border border-gray-200 rounded-sm 
      hover:cursor-pointer hover:bg-gray-100 disabled:cursor-not-allowed disabled:bg-gray-50"
      onClick={() => onClick && onClick(currentPage + (direction === 'left' ? -1 : 1))}
      disabled={isDisabled}
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
    <button
      className={`w-8 h-8 flex items-center justify-center border rounded-sm hover:cursor-pointer disabled:cursor-not-allowed 
        ${active ? 'border-purple-500 bg-purple-500/10 text-purple-500' : ' border-gray-200 hover:bg-gray-100'} `}
      disabled={active}
      onClick={() => onClick && onClick(pageNumber)}>
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
    <ul className="flex gap-4 py-2 px-4 rounded-xl bg-white w-fit text-md">
      <li className="flex items-center gap-2">
        <label className="text-gray-500" htmlFor="goto-page">Go to:</label>
        <input
          className="rounded-md hover:outline-2 hover:outline-offset-2 hover:outline-purple-500 
          focus:outline-2 focus:outline-offset-2 focus:outline-purple-500"
          id='goto-page'
          type='text'
          size={3}
          value={currentPage} />
      </li>
      <li>
        <PageArrow direction="left" currentPage={currentPage} onClick={onPageChange} isDisabled={currentPage === 1} />
      </li>
      {totalPages <= 5 ?
        <>
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index}>
              <PageButton pageNumber={index + 1} active={currentPage === index + 1} />
            </li>
          ))}
        </>
        :
        <>
          {currentPage <= 3 ?
            <>
              {Array.from({ length: 3 }, (_, index) => (
                <li key={index}>
                  <PageButton pageNumber={index + 1} onClick={onPageChange} active={currentPage === index + 1} />
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
                  <PageButton pageNumber={totalPages - (2 - index)} onClick={onPageChange} active={currentPage === totalPages - (2 - index)} />
                </li>
              ))}
            </>


          }
        </>
      }
      <li>
        <PageArrow direction="right" currentPage={currentPage} onClick={onPageChange} isDisabled={currentPage === totalPages} />
      </li>
      <li className="flex items-center gap-2">
        <label className="text-gray-500" htmlFor="pageSize">Page size:</label>
        <select
          className="px-3 rounded-md border border-gray-300 text-gray-700 bg-white 
          hover:cursor-pointer 
          focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
          name="pageSize"
          id="pageSize"
          value={pageSize}
          onChange={(e) => onPageSizeChange && onPageSizeChange(Number(e.target.value))}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </li>
    </ul>
  )
}
