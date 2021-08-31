
import React from 'react';
import Inventry from "./Inventry"
import Enzyme, {shallow, mount} from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import {BrowserRouter} from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux';
import reducer from "../store/reducer"
import thunk from 'redux-thunk';

Enzyme.configure({adapter: new EnzymeAdapter()})


describe('<Inventry /> unit test', () => {
    const mockStore = createStore(reducer, applyMiddleware(thunk));
    const getWrapper = () => mount(
      <Provider store={mockStore}>
          <BrowserRouter>
            <Inventry/>
        </BrowserRouter>
      </Provider>
    );
    const container = getWrapper();

    it('should match the snapshot', () => {
        expect(container.html()).toMatchSnapshot();
    });

    it('should have an name field', () => {
        expect(container.find('input[type="text"]').length).toEqual(4);
    });

    it('should have proper props for name field', () => {
        const nameField = container.find('input[type="text"]').at(0)
        nameField.simulate('change', {target: {value: 'mobile'}})
        expect(container.find('#name').props().value).toEqual('mobile')
    });

    it('should have proper props for description field', () => {
        const descriptionField = container.find('input[type="text"]').at(1)
        descriptionField.simulate('change', {target: {value: 'Good Mobile'}})
        expect(container.find('#description').props().value).toEqual('Good Mobile')
    });

    it('should have proper props for price field', () => {
        const priceField = container.find('input[type="text"]').at(2)
        priceField.simulate('change', {target: {value: '20000'}})
        expect(container.find('#price').props().value).toEqual('20000')
    });

    it('should have proper props for category field', () => {
        const categoryField = container.find('input[type="text"]').at(3)
        categoryField.simulate('change', {target: {value: 'mobile'}})
        expect(container.find('#category').props().value).toEqual('mobile')
    });

    it('should be able to click the Add product button', () => {
        const addProductButton = container.find('button')
        addProductButton.simulate('click')
    });
  
  });

