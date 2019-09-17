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
    let lastPage = localStorage.getItem('lastPage')

    sortInfo = sortInfo ? JSON.parse(localStorage.getItem('sortInfo')) : {}
    lastPage = lastPage ? JSON.parse(lastPage) : 1

    this.state = {
      dataSource,
      currentPage: lastPage,
      sortInfo,
    }

    this.handleChange = this.handleChange.bind(this)
    // this.onChangeRecord = this.onChangeRecord.bind(this)
  }

  componentDidMount() {
  }

  onChangeRecord(column, value, id, element, originalValue) {
    console.log(column, value, id, element, originalValue)
    let allowUpdate = true
    switch (column) {
      case 'amount':
        allowUpdate = /^\d+(\.\d+)?$/.test(value)
        break
      default:
    }
    const { dataSource } = this.state
    const expenseRecord = dataSource.find((record) => record.id === id)
    const newValue = allowUpdate ? value : originalValue
    expenseRecord[column] = newValue
    if (element) element.setState({ value: newValue }) // Update input field
    dataSource.findIndex((record) => record.id === id)
    const updatedExpenses = dataSource.map((record) => ({ ...record })) // Copy records from state
    updatedExpenses[dataSource.findIndex((record) => record.id === id)] = expenseRecord // Update with new value
    this.setState({ dataSource: updatedExpenses })
    localStorage.expenseRecords = JSON.stringify(updatedExpenses) // Save to local storage
    if (element) element.blur() // Defocus input element
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
          return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
        },
      },
      {
        title: 'MERCHANT',
        dataIndex: 'merchant',
        sorter: (a, b) => a.merchant.localeCompare(b.merchant),
        sortOrder: sortInfo.columnKey === 'merchant' && sortInfo.order,
        render: (text, record, index) => (
          <Input ref={(e) => { this[`merchant${index}`] = e }} defaultValue={text} style={{ width: '140px' }} onPressEnter={(e) => this.onChangeRecord('merchant', e.target.value, record.id, this[`merchant${index}`])} />
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
        render: (text, record, index) => (
          <Input ref={(e) => { this[`amount${index}`] = e }} defaultValue={text} style={{ width: '80px' }} onPressEnter={(e) => this.onChangeRecord('amount', e.target.value, record.id, this[`amount${index}`], text)} />
        ),
      },
      {
        title: 'CURRENCY',
        dataIndex: 'currency',
        render: (text, record, index) => (
          <Input ref={(e) => { this[`currency${index}`] = e }} defaultValue={text} style={{ width: '60px' }} onPressEnter={(e) => this.onChangeRecord('currency', e.target.value, record.id, this[`currency${index}`])} />
        ),
      },
      {
        title: 'STATUS',
        dataIndex: 'status',
      },
    ]
    return (
      <div className="table">
        <Table
          rowKey="id"
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 10, current: currentPage, style: { display: 'flex', justifyContent: 'center', float: 'none' } }}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

export default ExpensesTable
