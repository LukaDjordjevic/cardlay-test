import React, { Component } from 'react'
import { Table } from 'antd'
import { expenses } from '../expenses'

class ExpensesTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentPage: 1,
      sortInfo: {},
    }

    this.dataSource = expenses.map((item) => {
      const newItem = { ...item }
      newItem.status = item.status.stage
      return newItem
    })

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(sorter) {
    this.setState({ sortInfo: sorter })
  }

  render() {
    const { sortInfo } = this.state
    const columns = [
      {
        title: 'DATE',
        dataIndex: 'date',
      },
      {
        title: 'MERCHANT',
        dataIndex: 'merchant',
        sorter: (a, b) => a.merchant.localeCompare(b.merchant),
        sortOrder: sortInfo.columnKey === 'merchant' && sortInfo.order,
      },
      {
        title: 'CATEGORY',
        dataIndex: 'categoryName',
        sorter: (a, b) => a.categoryName.localeCompare(b.categoryName),
        sortOrder: sortInfo.columnKey === 'categoryName' && sortInfo.order,
      },
      {
        title: 'AMOUNT',
        dataIndex: 'amount',
        sorter: (a, b) => a.amount - b.amount,
        sortOrder: sortInfo.columnKey === 'amount' && sortInfo.order,
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
    const { currentPage } = this.state
    return (
      <div>
        Something
        {currentPage}
        <Table
          rowKey="id"
          dataSource={this.dataSource}
          columns={columns}
          pagination={{ pageSize: 10 }}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

export default ExpensesTable
