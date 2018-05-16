// Main Packages
import React from 'react';
import { Link }           from 'react-router-dom'

// Material UI
import MenuItem from 'material-ui/MenuItem';
import IconMenu     from 'material-ui/IconMenu';
import IconButton   from 'material-ui/IconButton';

// Material UI Icons
import DeleteIcon         from 'material-ui/svg-icons/action/delete';
import ModeEditIcon       from 'material-ui/svg-icons/editor/mode-edit';
import MoreVertIcon       from 'material-ui/svg-icons/navigation/more-vert';
import dateFormat         from 'dateformat';
import RemoveRedEyeIcon   from 'material-ui/svg-icons/image/remove-red-eye';
import Toggle from 'material-ui/Toggle';

// Style
import './rowToDo.css'

import { CSSTransitionGroup } from 'react-transition-group'

const RowToDo = (props) => {
  const {todo, onDelete, onToggle} = props
  return (
    <CSSTransitionGroup
      component="tr"
transitionName="example"
transitionAppear={true}
transitionAppearTimeout={5000}
transitionEnter={false}
transitionLeave={false}>
      {/* ID */}
      <td>{todo.id}</td>
      <td>{todo.data}</td>
      <td>{dateFormat(new Date(todo.due_date),'ddd, d mmm yyyy h:MM TT')}</td>
      <td>{todo.priority}</td>
      <td>
        <Toggle
          defaultToggled={todo.is_completed}
          onToggle={() => onToggle(todo.id)}
          />
      </td>

      {/* Action */}
      <td>
        <IconMenu
           iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
           anchorOrigin={{horizontal: 'left', vertical: 'top'}}
           targetOrigin={{horizontal: 'left', vertical: 'top'}}
        >

        <Link to={'/todos/edit/'+todo.id} className="MenuItemBtn">
          <MenuItem primaryText="Edit" leftIcon={<ModeEditIcon />} />
        </Link>

        <MenuItem primaryText="Delete" leftIcon={<DeleteIcon />} onClick={(e) => onDelete(todo.id)} />

        </IconMenu>
      </td>
    </CSSTransitionGroup>
  )
}
export default RowToDo
