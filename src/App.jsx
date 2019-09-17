import React from 'react'
import 'antd/dist/antd.css'
import ExpensesTable from './containers/ExpensesTable'
import cardlayLogo from './assets/cardlay.png'
import './App.css'

function App() {
  return (
    <div className="App">
      <div className="content">
        <div className="header">
          <img src={cardlayLogo} alt="" />
        </div>
        <div className="title"><p className="title-text">Expenses</p></div>
        <ExpensesTable />
      </div>
    </div>
  )
}

export default App
