import React from 'react'
import ReactDOM from 'react-dom'
import { create } from 'react-test-renderer'
import App from './App'
import ApproveDecline from './components/ApproveDecline'
import ExpensesTable from './containers/ExpensesTable'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})

describe('ExpensesTable', () => {
  it('renders correctly', () => {
    const tree = create(<ExpensesTable />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders between 1 and 10 table rows', () => {
    const component = create(<ExpensesTable />)
    const instance = component.getInstance()
    const root = component.root
    instance.setState({ currentPage: 1 })
    const rowsNum = root.findAllByType('tr').length
    expect(rowsNum).toBeGreaterThan(1) // Includes table header row
    expect(rowsNum).toBeLessThan(12)
  })
})

describe('ApproveDecline', () => {
  const props = { id: '', updateRecord: () => {} }
  it('renders correctly', () => {
    const component = create(<ApproveDecline { ...props } />).toJSON()
    expect(component).toMatchSnapshot()
  })
  it('it shows correct text in buttons', () => {
    let component = create(<ApproveDecline approved { ...props } />)
    let { root } = component
    let button1 = root.findAllByType('button')[0]
    let button2 = root.findAllByType('button')[1]
    expect(button1.props.children).toBe('Approved')
    expect(button2.props.children).toBe('Decline')
    component = create(<ApproveDecline approved={undefined} { ...props } />)
    root = component.root
    button1 = root.findAllByType('button')[0]
    button2 = root.findAllByType('button')[1]
    expect(button1.props.children).toBe('Approve')
    expect(button2.props.children).toBe('Decline')
    component = create(<ApproveDecline approved={false} { ...props } />)
    root = component.root
    button1 = root.findAllByType('button')[0]
    button2 = root.findAllByType('button')[1]
    expect(button1.props.children).toBe('Approve')
    expect(button2.props.children).toBe('Declined')
  })
})
