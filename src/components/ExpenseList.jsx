import React from 'react'
import Item from './ExpenseItem';
import { MdDelete } from "react-icons/md"


const ExpenseList = ({ expenses, handleDelete, handleEdite, clearItems }) => {
  return (
    <>
      <ul className="list">
        { expenses.map((expense) => (
          <Item
            key={ expense.id }
            expense={ expense }
            handleDelete={ handleDelete }
            handleEdite={ handleEdite }
          />)) }
      </ul>
      { expenses.length > 0 && (<button className="btn" onClick={ clearItems }>clear expenses <MdDelete className="btn-icon" /></button>) }
    </>
  )
}

export default ExpenseList
