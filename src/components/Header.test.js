
import React from 'react';
import Header from "./Header"
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
describe('<Header /> unit test', () => {
    // const mockStore = createStore(reducer, applyMiddleware(thunk));
    const getWrapper = () => mount(
    //   <Provider store={mockStore}>
          <BrowserRouter>
            <Header/>
        </BrowserRouter>
    //   </Provider>
    );
    const container = getWrapper();

    // it('should match the snapshot', () => {
    //     expect(container.html()).toMatchSnapshot();
    // });

    it('should have an search field', () => {
        expect(container.find('input[type="text"]').length).toEqual(1);
    });

    it('check image present', () => {
        const image = container.find('.header__logo')
        image.simulate('click');
      });

      it('check header text present', () => {
        const headerText = container.find('.header__optionLineTwo').at(0)
        headerText.simulate('click');
      });

      it('check header text present', () => {
        const headerText = container.find('.header__optionLineTwo').at(1)
        headerText.simulate('click');
      });
  
  });
