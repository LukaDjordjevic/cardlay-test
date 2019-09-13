import React, { Component } from 'react'
import { Table } from 'antd'
import { expenses } from '../expenses'

class ExpensesTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentPage: 1,
    }

    this.dataSource = expenses.map((item) => {
      const newItem = { ...item }
      newItem.status = item.status.stage
      return newItem
    })

    this.columns = [
      {
        title: 'DATE',
        dataIndex: 'date',
      },
      {
        title: 'MERCHANT',
        dataIndex: 'merchant',
      },
      {
        title: 'CATEGORY',
        dataIndex: 'categoryName',
      },
      {
        title: 'AMOUNT',
        dataIndex: 'amount',
      },
      {
        title: 'CURRENCY',
        dataIndex: 'currency',
      },
      {
        title: 'STATUS',
        dataIndex: 'status',
      },
    ]
  }

  render() {
    const { currentPage } = this.state
    return (
      <div>
        Something
        {currentPage}
        <Table
          rowKey="id"
          dataSource={this.dataSource}
          columns={this.columns}
          pagination={{ pageSize: 10 }}
        />
      </div>
    )
  }
}

export default ExpensesTable
