import React from 'react'

// Style
import './css/Pagination.css'

function paginationNumbers(total, show, current){
  let limit = 7
  const pages = Math.ceil(total / show, 1)
  limit = (pages <= limit) ? pages : limit
  const range = Math.floor(limit / 2, 1)
  let end = (current > range) ? current + range : limit
  end = (end >= pages) ? pages : end

  let start = (current > range) ? current - range : 1
  start = (end === pages) ? ((end - limit) + 1) : start

  const result = []

  for(;start <= end ; start++){
    result.push(start)
  }

  return result
}

const Pagination = (props) => {
  const {currentPage, onPageChange, total, show} = props
  const pages = paginationNumbers(total, show, parseInt(currentPage))
  const pagesCount = Math.ceil(total / show, 1)

  if(pages.length <= 1) return false


  return (
    <nav aria-label="..." className="pagination-container">
      <ul className="pagination">

      <li className={'page-item '+((currentPage == 1) ? 'disabled' : '')}>
        <a className="page-link" href="#/"  tabIndex="-1" onClick={(e) => onPageChange(e,currentPage - 1)} >Previous</a>
      </li>

      {pages.map(page => {
        let active = (page == currentPage) ? 'active' : ''
        return(
          <li className={'page-item '+active} key={'pagin'+page}>
            <a className="page-link" href="#/" onClick={(e) => onPageChange(e,page)}>
              {page}
            </a>
          </li>
        )
      })}

      <li className={'page-item '+((currentPage == pagesCount) ? 'disabled' : '')}>
        <a className="page-link" href="#" onClick={(e) => onPageChange(e, parseInt(currentPage) + 1)}>Next</a>
      </li>

      </ul>
    </nav>
  )
}
export default Pagination
