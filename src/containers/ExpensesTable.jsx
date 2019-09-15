import React, { Component } from 'react'
import { Table, Select } from 'antd'
import { expenses, categories } from '../expenses'

class ExpensesTable extends Component {
  constructor(props) {
    super(props)

    let dataSource = expenses.map((item) => {
      const newItem = { ...item }
      newItem.status = item.status.stage
      return newItem
    })

    let sortInfo = localStorage.getItem('sortInfo')
    this.lastPage = localStorage.getItem('lastPage')

    sortInfo = sortInfo ? JSON.parse(localStorage.getItem('sortInfo')) : {}
    this.lastPage = this.lastPage ? JSON.parse(this.lastPage) : 1
    console.log('lastPage from lStorage', this.lastPage)

    this.state = {
      dataSource,
      currentPage: this.lastPage,
      sortInfo,
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(pagination, filters, sorter) {
    // const { currentPage } = this.state
    console.log(pagination)
    this.setState({ sortInfo: sorter, currentPage: pagination.current })
    localStorage.setItem('sortInfo', JSON.stringify(sorter))
    localStorage.setItem('lastPage', JSON.stringify(pagination.current))
  }

  render() {
    console.log('render')
    const { dataSource, sortInfo, currentPage } = this.state
    const { Option } = Select
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
        render: (text, record, index) => {
          console.log(text, record, index)
          const options = categories.map((category) => <Option key={category} value={category}>{category}</Option>)
          return (
            <Select defaultValue={text} style={{ width: 180 }}>
              {options}
            </Select>
          )
        },
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
    return (
      <div>
        Something
        {currentPage}
        <Table
          rowKey="id"
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 10, current: currentPage }}
          onChange={this.handleChange}

        />
      </div>
    )
  }
}

export default ExpensesTable
