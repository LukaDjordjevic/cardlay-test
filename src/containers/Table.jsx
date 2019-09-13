import React, { Component } from 'react'
import { Table } from 'antd'

class ExpensesTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentPage: 1,
    }
  }

  render() {
    const { currentPage } = this.state
    return (
      <p>
        Something
        {currentPage}
      </p>
    )
  }
}

export default ExpensesTable
