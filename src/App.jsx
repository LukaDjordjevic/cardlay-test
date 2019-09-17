import React from 'react'
import 'antd/dist/antd.css'
import ExpensesTable from './containers/ExpensesTable'
import './App.css'

function App() {
  return (
    <div className="App">
      <div className="content">
        <div className="header">
          <img src="./assets/cardlay.png" alt="" width="100px" height="100px" />
        </div>
        <div className="title"><p className="title-text">Expenses</p></div>
        <ExpensesTable />
      </div>
    </div>
  )
}

export default App
