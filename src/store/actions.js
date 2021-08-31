import axios from 'axios';

import * as actionTypes from "./actionTypes";

const startFetching = () => {
    return {
        type: actionTypes.START_FETCHING
    }
}

const stopFetching = () => {
    return {
        type: actionTypes.STOP_FETCHING
    }
}

export const addProduct = (productObject) => {
    return (dispatch) => {
        dispatch(startFetching());
        axios.post("https://thinkbridge.herokuapp.com/addProduct", productObject).then(data => {
            if(data){
                dispatch(stopFetching());
                dispatch(getAllProducts(productObject.email));
            }
        }).catch(err => {
            dispatch(setErrorMessage(err.response.data.message))
                alert(err.response.data.message);
        })

    }
}

export const updateProduct = (productObject) => {
    return (dispatch) => {
        dispatch(startFetching());
        axios.put("https://thinkbridge.herokuapp.com/updateProduct", productObject).then(data => {
            if(data){
                dispatch(getAllProducts(productObject.email));
            }
        }).catch(err => {
            dispatch(setErrorMessage(err.response.data.message))
            alert(err.response.data.message);
        })

    }
}

export const saveAllProducts = (products) => {
    return {
        type: actionTypes.SAVE_PRODUCTS,
        products: products
    }
}

export const getAllProducts = (email) => {
    return (dispatch) => {
        // console.log("Aaaaaaaaaaaaaaa");
        dispatch(startFetching());
        axios.get(`https://thinkbridge.herokuapp.com/getAllProducts?email=${email}`).then(data => {
            if(data !== null){
                dispatch(saveAllProducts(data.data));
                dispatch(stopFetching());
            }
        }).catch(err => {
            dispatch(setErrorMessage(err.response.data.message))
                alert(err.response.data.message);
        })

    }
}

export const setErrorMessage = (message) => {
    return {
        type: actionTypes.SET_ERRORMESSAGE,
        message: message
    }
}

export const singinOrRegisterUser = (postObject) => {
    return (dispatch) => {
        dispatch(startFetching());
        if(postObject.type === "singin"){
            localStorage.setItem("email", postObject.email)
            axios.post("https://thinkbridge.herokuapp.com/singin", {
                email: postObject.email,
                password: postObject.password
            }).then((data) => {
                // console.log("bbb",data);
                dispatch(stopFetching());
                postObject.history.push("/showProducts")
            }).catch((err) => {
                // console.log("aaa", err);
                dispatch(setErrorMessage(err.response.data.message))
                localStorage.removeItem("email")
                alert(err.response.data.message);
                postObject.history.push("/")
            })
        }else{
            axios.post("https://thinkbridge.herokuapp.com/register", {
                emailId: postObject.email,
                password: postObject.password
            }).then((data) => {
                dispatch(stopFetching());
                alert("Registered Successfully, Please Login")
                postObject.history.push("/")
            }).catch((err) => {
                dispatch(setErrorMessage(err.response.data.message))
                alert(err.response.data.message);
            })
        }
    }
}

export const changeIsLoading = () => {
    return{
        type: actionTypes.CHANGE_ISLOADING,
    }
}

export const changeIsLoadingToTrue = () => {
    return{
        type: actionTypes.CHANGE_ISLOADINGTOTRUE
    }
}

export const saveSingleProduct = (product) => {
    return{
        type: actionTypes.SAVE_SINGLEPRODUCT,
        product: product
    }
}

export const deleteProduct = (product_id, email) => {
    return (dispatch) => {
        dispatch(startFetching());
        axios.delete(`https://thinkbridge.herokuapp.com/deleteProduct?productid=${product_id}&email=${email}`).then((data) => {
            if(data){
                dispatch(getAllProducts(email));
            }
        }).catch((err) => {
            dispatch(setErrorMessage(err.response.data.message))
            alert(err.response.data.message);
        })
    }
}