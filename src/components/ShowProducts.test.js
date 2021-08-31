
import React from 'react';
import ShowProducts from "./ShowProducts"
import Enzyme, {shallow, mount} from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import {BrowserRouter} from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux';
// import TestReducer from "../store/TestReducer"
import thunk from 'redux-thunk';
import reducer from '../store/reducer';
import {getAllProducts} from "../store/actions"

Enzyme.configure({adapter: new EnzymeAdapter()})


describe('<ShowProducts /> unit test', () => {
   

    const mockStore = createStore(reducer, applyMiddleware(thunk));

    
    const getWrapper = () => mount(
      <Provider store={mockStore}>
          <BrowserRouter>
            <ShowProducts/>
        </BrowserRouter>
      </Provider>
    );
    let container = getWrapper();

    it('should match the snapshot', () => {
        expect(container.html()).toMatchSnapshot();
    });

    it('should have custom row', () => {
      let store = mockStore
      store.dispatch(getAllProducts("aa@gmail.com"));
    })

    it('should have custom row', () => {
        let temp = container.find('[data-test="check"]');
        console.log(container.find('[data-test="check"]').length)
    })

    // it('can click the button for adding product', () => {
    //     let button = container.find('[data-test="check"]').at(1)
    //         button.simulate('click');
    // });
  
   

  });
