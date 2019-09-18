import React, { Component } from 'react'
import { Table, Select, Input } from 'antd'
import { expenses, categories } from '../expenses'
import ApproveDecline from '../components/ApproveDecline'
import merchant0 from '../assets/merchants/merchant0.png'
import merchant1 from '../assets/merchants/merchant1.png'
import merchant2 from '../assets/merchants/merchant2.png'
import merchant3 from '../assets/merchants/merchant3.png'
import merchant4 from '../assets/merchants/merchant4.png'
import merchant5 from '../assets/merchants/merchant5.png'
import merchant6 from '../assets/merchants/merchant6.png'
import merchant7 from '../assets/merchants/merchant7.png'
import merchant8 from '../assets/merchants/merchant8.png'
import merchant9 from '../assets/merchants/merchant9.png'
import merchant10 from '../assets/merchants/merchant10.png'

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
    let currentPage = localStorage.getItem('currentPage')

    sortInfo = sortInfo ? JSON.parse(localStorage.getItem('sortInfo')) : {}
    currentPage = currentPage ? JSON.parse(currentPage) : 1

    this.state = {
      dataSource,
      currentPage,
      sortInfo,
      activeCell: { column: null, index: null },
    }
    this.merchantLogos = [
      <img src={merchant0} alt="" width="40px" height="40px" />,
      <img src={merchant1} alt="" width="40px" height="40px" />,
      <img src={merchant2} alt="" width="40px" height="40px" />,
      <img src={merchant3} alt="" width="40px" height="40px" />,
      <img src={merchant4} alt="" width="40px" height="40px" />,
      <img src={merchant5} alt="" width="40px" height="40px" />,
      <img src={merchant6} alt="" width="40px" height="40px" />,
      <img src={merchant7} alt="" width="40px" height="40px" />,
      <img src={merchant8} alt="" width="40px" height="40px" />,
      <img src={merchant9} alt="" width="40px" height="40px" />,
      <img src={merchant10} alt="" width="40px" height="40px" />,
    ]

    this.handleChange = this.handleChange.bind(this)
    this.updateRecord = this.updateRecord.bind(this)
  }

  componentDidMount() {
  }

  updateRecord(column, value, id, element, originalValue) {
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
    localStorage.setItem('currentPage', JSON.stringify(pagination.current))
  }

  render() {
    console.log('render')
    const { dataSource, sortInfo, currentPage, activeCell } = this.state
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
        render: (text, record, index) => {
          if (activeCell.column === 'merchant' && activeCell.index === index) {
            return (
              <div className="flex-row">
                {this.merchantLogos[index]}
                <Input
                  ref={(e) => { this[`merchant${index}`] = e }}
                  defaultValue={text}
                  style={{ width: '140px' }}
                  onPressEnter={(e) => this.updateRecord('merchant', e.target.value, record.id, this[`merchant${index}`])}
                />
              </div>
            )
          }
          return (
            <div className="flex-row">
              {this.merchantLogos[index]}
              <div className="default-cell" style={{ width: '140px' }} onMouseEnter={() => { this.setState({ activeCell: { column: 'merchant', index } }) }}>{text}</div>
            </div>
          )
        },
      },
      {
        title: 'CATEGORY',
        dataIndex: 'categoryName',
        sorter: (a, b) => a.categoryName.localeCompare(b.categoryName),
        sortOrder: sortInfo.columnKey === 'categoryName' && sortInfo.order,
        render: (text, record, index) => {
          const options = categories.map((category) => <Option key={category} value={category}>{category}</Option>)
          if (activeCell.column === 'categoryName' && activeCell.index === index) {
            return (
              <Select
                defaultValue={text}
                style={{ width: 180 }}
                onMouseEnter={() => { this.setState({ activeCell: { column: 'categoryName', index } }) }}
                // onMouseLeave={() => this.setState({ activeCell: { column: null, index: null } })}
                onChange={(value) => this.updateRecord('categoryName', value, record.id)}
              >
                {options}
              </Select>
            )
          }
          return <div className="default-cell" style={{ width: '180px' }} onMouseEnter={() => { this.setState({ activeCell: { column: 'categoryName', index } }) }}>{text}</div>
        },
      },
      {
        title: 'AMOUNT',
        dataIndex: 'amount',
        sorter: (a, b) => a.amount - b.amount,
        sortOrder: sortInfo.columnKey === 'amount' && sortInfo.order,
        render: (text, record, index) => {
          if (activeCell.column === 'amount' && activeCell.index === index) {
            return (
              <Input
                className="bold-text"
                ref={(e) => { this[`amount${index}`] = e }}
                defaultValue={text}
                style={{ width: '80px' }}
                onPressEnter={(e) => this.updateRecord('amount', e.target.value, record.id, this[`amount${index}`], text)}
              />
            )
          }
          return <div className="bold-cell" style={{ width: '80px' }} onMouseEnter={() => { this.setState({ activeCell: { column: 'amount', index } }) }}>{text}</div>
        },
      },
      {
        title: 'CURRENCY',
        dataIndex: 'currency',
        render: (text, record, index) => {
          if (activeCell.column === 'currency' && activeCell.index === index) {
            return (
              <Input
                className="bold-text"
                ref={(e) => { this[`currency${index}`] = e }}
                defaultValue={text}
                style={{ width: '60px' }}
                onPressEnter={(e) => this.updateRecord('currency', e.target.value, record.id, this[`currency${index}`])}
              />
            )
          }
          return <div className="bold-cell" onMouseEnter={() => { this.setState({ activeCell: { column: 'currency', index } }) }}>{text}</div>
        },
      },
      {
        title: 'STATUS',
        dataIndex: 'status',
        render: (text, record, index) => (
          record.status === 'Submitted' ? <ApproveDecline id={record.id} approved={record.approved} updateRecord={this.updateRecord} /> : text
        ),
      },
    ]
    return (
      <div className="table" onMouseLeave={() => this.setState({ activeCell: { column: null, index: null } })}>
        <Table
          rowKey="id"
          rowClassName={(record, index) => { if (index % 2 === 0) return 'light-row'; return 'dark-row' }}
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
