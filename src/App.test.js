import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import App from './App'
import ApproveDecline from './components/ApproveDecline'
import ExpensesTable from './containers/ExpensesTable'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('renders correctly', () => {
  const tree = renderer.create(<ApproveDecline approved id="1234" updateRecord={() => {}} />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly', () => {
  const tree = renderer.create(<ExpensesTable />).toJSON()
  expect(tree).toMatchSnapshot()
})
