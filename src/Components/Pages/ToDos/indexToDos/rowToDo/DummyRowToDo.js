// Main Packages
import React from 'react';

// Style
import './rowToDo.css'

export function DummyRowToDo () {
  var result = [];
  for (var i = 0; i < 5; i++) {
    result.push(
      <tr key={'dummy'+i}>

        <td>
          <span style={{background: '#ccc', display: 'inline-block', width: '70%', height: '10px', borderRadius: '5px'}}></span>
        </td>

        <td>
          <span style={{background: '#ccc', display: 'inline-block', width: '70%', height: '10px', borderRadius: '5px'}}></span>
        </td>

        <td>
          <span style={{background: '#ccc', display: 'inline-block', width: '70%', height: '10px', borderRadius: '5px'}}></span>
        </td>

        <td>
          <span style={{background: '#ccc', display: 'inline-block', width: '70%', height: '10px', borderRadius: '5px'}}></span>
        </td>

        <td>
          <span style={{background: '#ccc', display: 'inline-block', width: '70%', height: '10px', borderRadius: '5px'}}></span>
        </td>
        
      </tr>
    )
  }

  return result
}
