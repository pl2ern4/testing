import Enzyme, { shallow } from 'enzyme';
import React from 'react';
import App from '../App';
import Adapter from 'enzyme-adapter-react-16';

import mockJson from '../mock/data.json';
Enzyme.configure({ adapter: new Adapter() });

/**
 * configuration can be move to config file if unit testing files are more 
 */

describe('renders learn react link', () => {

  let component;
  beforeEach(()=>{
    component=undefined;
  });

  it('should not render anything',()=>{
    component=shallow(<App/>);
    expect(component).toEqual({})
  });

  it('should render',()=>{
    const mockFn = jest.fn();
    React.useState = jest.fn().mockImplementation(()=>[mockJson, mockFn])
    component=shallow(<App/>);
    expect(component.find('.row').length).toEqual(1)
  });
});
