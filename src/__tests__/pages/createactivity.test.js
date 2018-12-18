import React from 'react'
import CreateActivity from '../../pages/Activities/CreateActivity'
import renderer from 'react-test-renderer'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

const newActivity = { name: "Drawing" }

test('renders the create activity correctly', () => {
  const json = renderer
    .create(<CreateActivity activity={newActivity} /> )
    .toJSON()
  expect(json).toMatchSnapshot()
})

test('the title should display if it is a state', () => {
  const wrapper = shallow(<CreateActivity activity={newActivity} />)
  const activityShallow = wrapper.find('.ActivityNew')
  expect(activityShallow.find('.title')).toBeDefined()
})

// console.log('should have title', activitiyShallow.debug())
