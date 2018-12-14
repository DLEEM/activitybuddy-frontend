import React from 'react';
import ReactDOM from 'react-dom';
import Register from '../pages/Users/Register';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

test('register when button is clicked', () => {
  const register = mount(<Register />)
  register.find('button').simulate('submit')
})
