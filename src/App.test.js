
import React from 'react';
import App from "./App"
import Enzyme, {shallow, mount} from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import {BrowserRouter} from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux';
import reducer from "./store/reducer"
import thunk from 'redux-thunk';

Enzyme.configure({adapter: new EnzymeAdapter()})

describe('<App /> unit test', () => {
    const mockStore = createStore(reducer, applyMiddleware(thunk));
    const getWrapper = () => mount(
      <Provider store={mockStore}>
          <BrowserRouter>
            <App/>
        </BrowserRouter>
      </Provider>
    );
    const container = getWrapper();

    it('should match the snapshot', () => {
        expect(container.html()).toMatchSnapshot();
    });

  
  });
