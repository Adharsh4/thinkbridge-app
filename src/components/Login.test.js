
import React from 'react';
import Login from "./Login"
import Enzyme, {shallow, mount} from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import {BrowserRouter} from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux';
import reducer from "../store/reducer"
import thunk from 'redux-thunk';

Enzyme.configure({adapter: new EnzymeAdapter()})


// const mockStore = createStore(reducer, {
//     products: [],
//     isLoading: false
// });
describe('<Login /> unit test', () => {
    const mockStore = createStore(reducer, applyMiddleware(thunk));
    const getWrapper = () => mount(
      <Provider store={mockStore}>
          <BrowserRouter>
            <Login/>
        </BrowserRouter>
      </Provider>
    );
    const container = getWrapper();

    it('should match the snapshot', () => {
        expect(container.html()).toMatchSnapshot();
    });

    it('should have an email field', () => {
        expect(container.find('input[type="email"]').length).toEqual(1);
    });

    it('should have an password field', () => {
        expect(container.find('input[type="password"]').length).toEqual(1);
    });

    it('can click the button for singin and register', () => {
      const button = container.find('button.login__signInButton')
      button.simulate('click');
    });

    // it('can click the button for singin and register', () => {
    //   const button = container.find('button.custom-button')
    //   button.simulate('click');
    // });

   

    it('should have proper props for email field', () => {
        const emailField = container.find('input[type="email"]')
        emailField.simulate('change', {target: {value: 'aa@gmail.com'}})
        expect(container.find('#email').props().value).toEqual('aa@gmail.com')
    });

    it('should have proper props for password field', () => {
        const passwordField = container.find('input[type="password"]')
        passwordField.simulate('change', {target: {value: 'aa1998'}})
        expect(container.find('#password').props().value).toEqual('aa1998')
    });


    it('can click the button for singin and register', () => {
        const button = container.find('button.login__signInButton')
        console.log(button.debug())
        button.simulate('click');
      });

      it('can click the button for singin and register', () => {
        const button = container.find('button.custom-button')
        console.log(button.debug())
        button.simulate('click');
      });
      it('can click the button for singin and register', () => {
        const button = container.find('button.custom-button')
        console.log(button.debug())
        button.simulate('click');
      });

      it('should have proper props for email field', () => {
        const emailField = container.find('input[type="email"]')
        emailField.simulate('change', {target: {value: 'aaaa@gmail.com'}})
        // expect(container.find('#email').props().value).toEqual('aa@gmail.com')
    });

    it('should have proper props for password field', () => {
        const passwordField = container.find('input[type="password"]')
        passwordField.simulate('change', {target: {value: 'aaaa1998'}})
        // expect(container.find('#password').props().value).toEqual('aa1998')
    });

      it('can click the button for singin and register', () => {
        const button = container.find('button.login__RegisterButton')
        console.log(button.debug())
        button.simulate('click');
      });

    //   it('can click the button for singin and register', () => {
    //     const button = container.find('button.login__signInButton').at(1)
    //     button.simulate('click');
    //   });

  
  });
