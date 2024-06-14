import React, { useEffect } from 'react'
import { MdOutlineKeyboardDoubleArrowLeft } from 'react-icons/md'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md'

export default function Pagination({
  page,
  setPage,
  total,
  showRecord,
  setShowRecord,
  totalPages,
  allState,
}) {
  const lastPage = totalPages
  const pagesToShow = 3
  const generatePages = () => {
    const pages = []
    if (lastPage <= pagesToShow) {
      for (let i = 1; i <= lastPage; i++) {
        pages.push(i)
      }
    } else {
      if (page <= pagesToShow - 1) {
        for (let i = 1; i <= pagesToShow; i++) {
          pages.push(i)
        }
      } else if (page >= lastPage - pagesToShow + 1) {
        for (let i = lastPage - pagesToShow + 1; i <= lastPage; i++) {
          pages.push(i)
        }
      } else {
        for (let i = page - 1; i <= page + 1; i++) {
          pages.push(i)
        }
      }
      if (pages[0] !== 1) {
        pages.unshift('...')
      }
      if (pages[pages.length - 1] !== lastPage) {
        pages.push('...')
      }
    }
    return pages
  }

  // useEffect(() => {
  //   setPage(2)
  // }, [showRecord])

  return (
    <div className="row d-flex justify-content-center mt-3">
      <div className="col-12 d-flex flex-wrap justify-content-center align-items-center ">
        <div className="text-sm me-4">
          {isNaN(Math.min((page - 1) * showRecord + 1, total))
            ? '0'
            : Math.min((page - 1) * showRecord + 1, total)}{' '}
          - {isNaN(Math.min(page * showRecord, total)) ? '0' : Math.min(page * showRecord, total)}{' '}
          of {isNaN(total) ? 0 : total}
        </div>
        <div className="d-flex gap-3">
          <span style={{cursor:"pointer"}}>
            <MdOutlineKeyboardDoubleArrowLeft
              onClick={() => {
                setPage(1)
              }}
              className="cursor-pointer"
              size={25}
            />
          </span >
          <span style={{cursor:"pointer"}}>
            <MdOutlineKeyboardArrowLeft
              size={25}
              className={`cursor-pointer${page === 1 ? 'disabled-button' : ''}`}
              onClick={() => {
                if (page > 1) {
                  setPage(page - 1)
                }
              }}
              disabled={page === 1}
            />
          </span>
          {generatePages()?.map((pageNumber, index) => (
            <button
              key={index}
              className={`${
                page === pageNumber ? 'bg-primary text-white' : 'text-gray-900'
              } btn btn-sm rounded-pill mx-1`}
              onClick={() => {
                if (typeof pageNumber === 'number') {
                  setPage(pageNumber)
                }
              }}
            >
              {pageNumber}
            </button>
          ))}
          <span style={{cursor:"pointer"}}>
            <MdOutlineKeyboardArrowRight
              onClick={() => {
                if (page < lastPage) {
                  setPage(page + 1)
                }
              }}
              disabled={page === lastPage}
              className="cursor-pointer"
              size={25}
            />
          </span>
          <span style={{cursor:"pointer"}}>
            <MdOutlineKeyboardDoubleArrowRight
              onClick={() => {
                setPage(totalPages)
              }}
              className="cursor-pointer"
              size={25}
            />
          </span>
        </div>
      </div>
    </div>
  )
}
