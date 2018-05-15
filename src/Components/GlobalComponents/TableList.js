import React from 'react'

// Components
import Pagination from './Pagination'
import Loading from './Loading'

import { CSSTransitionGroup } from 'react-transition-group'

// Style
import './css/TableList.css'

function showing(total, current_page, display_count){

  const start = (current_page === 1) ? current_page : ((current_page * display_count) - display_count)
  const minus = (total - ((current_page - 1) * display_count))
  const end = (minus > display_count) ? (current_page * display_count) : total

  let result = ''
  result += 'Showing '
  result += (start > total) ? total : start + 1
  result += ' to '+end
  result += ' of '
  result += total+' entries'
  return result
}

const TableList = (props) => (
  <div>

    {!props.loading &&
      <CSSTransitionGroup
  transitionName="example"
  transitionAppear={true}
  transitionAppearTimeout={500}
  transitionEnter={false}
  transitionLeave={false}>

    </CSSTransitionGroup>}

    <div className="table-list-container">
      {(props.loading || props.update) && <Loading error={props.onError} /> }
      <table className="table table-list">
        <thead>
          <tr>
            {props.columns.map((column, key) => {
              return (<th
                        key={'column'+key}
                        onClick={() => props.onSorting(column.params)}>
                        {column.title}
                      </th>)
            })}
          </tr>
        </thead>

        <tbody>
          {(props.total === 0 && !props.loading) &&
          <tr>
            <td colSpan={props.columns.length}>
              <div className="alert alert-danger">No Result</div>
            </td>
          </tr>}

          {props.children}

        </tbody>
      </table>
    </div>
    {!props.loading &&
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-6">
          <span className="showing-entries">
          {showing(props.total, props.page, props.rowShowing)}
          </span>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6">
          <Pagination
            onPageChange={props.onPageChange}
            total={props.total}
            show={props.rowShowing}
            currentPage={props.page} />
        </div>
      </div>
    }

  </div>
)
export default TableList
