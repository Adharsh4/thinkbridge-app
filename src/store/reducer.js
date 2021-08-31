import * as actionTypes from './actionTypes';

const initialState = {
    products: [],
    isLoading: true,
    errorMessage: ""
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.START_FETCHING:
            return {
                ...state,
                isLoading: true,
                errorMessage: ""
            }
        case actionTypes.STOP_FETCHING:
            return {
                ...state,
                isLoading: false,
                errorMessage: ""
            }
        case actionTypes.SAVE_PRODUCTS:
            return {
                ...state,
                products: action.products,
                isLoading: false,
                selectedProduct: [],
                errorMessage: ""
            }
        case actionTypes.CHANGE_ISLOADING:
            return {
                ...state,
                isLoading: false,
                errorMessage: ""
            }
        case actionTypes.CHANGE_ISLOADINGTOTRUE:
            return {
                ...state,
                isLoading: true,
            }
        case actionTypes.SET_ERRORMESSAGE:
            return {
                ...state,
                errorMessage: action.message,
                isLoading: false
            }
        default:
            return state;
    }
}

export default reducer;