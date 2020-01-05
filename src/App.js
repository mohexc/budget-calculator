import React, { useState, useEffect } from 'react';
import Alert from './components/Alert';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import uuid from 'uuid/v4';
import './App.css';
// import { MdDelete } from 'react-icons/md';


// const initialExpenses = [
//   { id: uuid(), charge: 'rent', amount: 1600 },
//   { id: uuid(), charge: 'car payment', amount: 400 },
//   { id: uuid(), charge: 'credit card bill', amount: 1200 },
// ]

const initialExpenses = localStorage.getItem('expenses')
  ? JSON.parse(localStorage.getItem('expenses'))
  : []

const App = () => {
  // ********** state value **********
  // all expenses, add expense
  const [expenses, setExpenses] = useState(initialExpenses)
  // single expense
  const [charge, setCharge] = useState("")
  // single amount
  const [amount, setAmount] = useState('')
  // alert
  const [alert, setAlert] = useState({ show: false })
  // edite
  const [edit, setEdite] = useState(false)
  // edit item
  const [id, setId] = useState(0)
  // ********** functionality **********
  useEffect(() => {
    console.log('we called useEffect')
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  // ********** functionality **********
  const handleCharge = e => setCharge(e.target.value)

  const handleAmount = e => setAmount(e.target.value)

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text })
    setTimeout(() => setAlert({ show: false }), 3000)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (charge !== "" && amount > 0) {
      if (edit) {
        let tempExp = expenses.map(item => item.id === id ? { ...item, charge, amount } : item)
        setExpenses(tempExp)
        setEdite(false)
        handleAlert({ type: "success", text: "รายการได้ถูกแก้ไขแล้ว" })
      }
      else {
        const singleExpense = { id: uuid(), charge, amount }
        setExpenses([...expenses, singleExpense])
        handleAlert({ type: 'success', text: 'รายการได้ถูกเพิ่มแล้ว' })
      }
      setCharge('')
      setAmount('')
    } else { handleAlert({ type: 'danger', text: `รายการไม่อาจว่าง และจำนวนไม่อาจเป็นศูนย์` }) }
  }

  // @clear all items
  const clearItems = () => {
    setExpenses([])
    handleAlert({ type: "danger", text: "ทุกรายการ ถูกลบแล้ว" })
  }

  // @ handle edite
  const handleDelete = (id) => {
    let tempExp = expenses.filter(item => item.id !== id)
    setExpenses(tempExp);
    handleAlert({ type: "danger", text: "รายการถูกลบแล้ว" })
  }

  // @ handle delete
  const handleEdite = (id) => {
    let expense = expenses.find(item => item.id === id)
    let { charge, amount } = expense
    setCharge(charge)
    setAmount(amount)
    setEdite(true)
    setId(id)
  }




  return (
    <>
      { alert.show && <Alert type={ alert.type } text={ alert.text } /> }
      <h1>เครื่องคำนวนงบประมาณ</h1>
      <main className="App">
        <ExpenseForm
          charge={ charge }
          amount={ amount }
          handleCharge={ handleCharge }
          handleAmount={ handleAmount }
          handleSubmit={ handleSubmit }
        />
        <ExpenseList
          expenses={ expenses }
          handleDelete={ handleDelete }
          handleEdite={ handleEdite }
          clearItems={ clearItems }
        />
      </main>
      <h1>
        ผลรวมรายจ่าย: <span className="total"> { expenses.reduce((acc, curr) => acc += parseInt(curr.amount), 0) } บาท</span>
      </h1>
    </>

  );
}

export default App;
