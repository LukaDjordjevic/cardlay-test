import React, { Component } from 'react'
import { Table, Select, Input } from 'antd'
import { expenses, categories } from '../expenses'

class ExpensesTable extends Component {
  constructor(props) {
    super(props)

    const savedExpenses = localStorage.expenseRecords ? JSON.parse(localStorage.expenseRecords) : null

    const dataSource = savedExpenses || expenses.map((item) => {
      const newItem = { ...item }
      newItem.status = item.status.stage
      return newItem
    })

    let sortInfo = localStorage.getItem('sortInfo')
    this.lastPage = localStorage.getItem('lastPage')

    sortInfo = sortInfo ? JSON.parse(localStorage.getItem('sortInfo')) : {}
    this.lastPage = this.lastPage ? JSON.parse(this.lastPage) : 1

    this.state = {
      dataSource,
      currentPage: this.lastPage,
      sortInfo,
    }

    this.handleChange = this.handleChange.bind(this)
    // this.onChangeRecord = this.onChangeRecord.bind(this)
  }

  onChangeRecord(column, value, id, element) {
    console.log(column, value, id, element, this)
    const { dataSource } = this.state
    const expenseRecord = dataSource.find((record) => record.id === id)
    expenseRecord[column] = value
    dataSource.findIndex((record) => record.id === id)
    const updatedExpenses = dataSource.map((record) => ({ ...record }))
    updatedExpenses[dataSource.findIndex((record) => record.id === id)] = expenseRecord
    this.setState({ dataSource: updatedExpenses })
    localStorage.expenseRecords = JSON.stringify(updatedExpenses)
    if (element) element.blur()
  }

  handleChange(pagination, _, sorter) {
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
        render: (text) => {
          const date = new Date(text)
          console.log('date', date)
          return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
        },
      },
      {
        title: 'MERCHANT',
        dataIndex: 'merchant',
        sorter: (a, b) => a.merchant.localeCompare(b.merchant),
        sortOrder: sortInfo.columnKey === 'merchant' && sortInfo.order,
        render: (text, record) => (
          <Input defaultValue={text} style={{ width: '140px' }} onPressEnter={(e) => this.onChangeRecord('merchant', e.target.value, record.id, e.target)} />
        ),
      },
      {
        title: 'CATEGORY',
        dataIndex: 'categoryName',
        sorter: (a, b) => a.categoryName.localeCompare(b.categoryName),
        sortOrder: sortInfo.columnKey === 'categoryName' && sortInfo.order,
        render: (text, record) => {
          const options = categories.map((category) => <Option key={category} value={category}>{category}</Option>)
          return (
            <Select defaultValue={text} style={{ width: 180 }} onChange={(value) => this.onChangeRecord('categoryName', value, record.id)}>
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
        render: (text, record) => (
          <Input defaultValue={text} style={{ width: '80px' }} onPressEnter={(e) => this.onChangeRecord('amount', e.target.value, record.id, e.target)} />
        ),
      },
      {
        title: 'CURRENCY',
        dataIndex: 'currency',
        render: (text, record) => (
          <Input defaultValue={text} style={{ width: '60px' }} onPressEnter={(e) => this.onChangeRecord('currency', e.target.value, record.id, e.target)} />
        ),
      },
      {
        title: 'STATUS',
        dataIndex: 'status',
      },
    ]
    return (
      <div>
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
