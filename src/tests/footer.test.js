import React from 'react'
import Footer from '../sharedComponents/Footer'
import renderer from 'react-test-renderer'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

test('renders the footer correctly', () => {
    const json = renderer
        .create(<Footer />)
        .toJSON()
    expect(json).toMatchSnapshot()
})