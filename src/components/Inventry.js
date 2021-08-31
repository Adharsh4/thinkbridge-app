import React, { useState, useEffect } from "react";
// import { useStateValue } from "../utility/StateProvider";
import "./Inventry.css";
import {connect} from 'react-redux';
import { withRouter } from "react-router-dom";
import FileBase64 from 'react-file-base64';
import * as actions from "../store/actions"
import Loader from "react-loader-spinner"

function Inventry(props) {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("mobiles")
    const [image, setImage] = useState("")
    const [email, setEmail] = useState(localStorage.getItem("email"))
    const [productId, setProductId]  = useState(localStorage.getItem("productId"));
    // const [isLoadingTemp, setIsLoadingTemp] = useState(false);

    useEffect(() => {
        if(productId && props.products.length === 0){
            props.getAllProducts(email)
        }else{
            props.changeIsLoading();
        }
    }, [])

    useEffect(() => {
        if(productId && props.products.length !== 0){
            let temp = props.products.filter((product) => product.id === productId)
            setName(temp[0].name);
            setDescription(temp[0].description);
            setPrice(temp[0].price);
            setCategory(temp[0].category);
            setImage(temp[0].image);
        }
    }, [props.products])

    const deleteProductHandler = (e) => {
        e.preventDefault();
        const isConfirm = window.confirm("Please comfirm")
        if(isConfirm){
            props.deleteProduct(productId, email);
            props.history.push("/showProducts")
        }
    }

    const addProductHandlerInInventry = (e, type) => {
        e.preventDefault();
        if(name.trim() === "" || description.trim() === "" || price.trim() === ""){
            const errorMessage = "Please fill all fields"
            props.setErrorMessage(errorMessage)
            alert(errorMessage);
            return;
        }
        if(image.trim() === ""){
            const errorMessage = "Please upload image in small size"
            props.setErrorMessage(errorMessage)
            alert(errorMessage);
            return;
        }
        if(isNaN(price)){
            const errorMessage = "Please enter valid price"
            props.setErrorMessage(errorMessage)
            alert(errorMessage);
            return;
        }
        const product = {
            name,
            description,
            price,
            category,
            image
        }
        if(type === "update"){
            props.updateProduct({
                product, 
                email: email,
                productId: productId
            })    
        }else{
            props.addProduct({
                product, 
                email: email
            })    
        }
        if(!props.isLoading){
            props.history.push("/showProducts")
        }
    }
    

    return (
        props.isLoading ? <div className="loading"><h3>Please wait...</h3><Loader type = "Oval" color="#00BFFF" height={30} width={30}/></div> :
        <div className="Inventry" data-test="component-Inventry">
            <div className="row">
                <div className="col-md-3">
                    <label htmlFor="name"><strong>Product Name</strong></label>
                </div>
                <div className="col-md-8">
                    <input type="text" className="inputField" value={name} onChange={(e) => setName(e.target.value)} placeholder="Product Name" id="name" name="name"/>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3">
                    <label htmlFor="description"><strong>Product Description</strong></label>
                </div>
                <div className="col-md-8">
                    <input type="text" className="inputField" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Product Description" id="description" name="description"/>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3">
                    <label htmlFor="price"><strong>Product Price</strong></label>
                </div>
                <div className="col-md-8">
                    <input type="text" className="inputField" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Product Price" id="price" name="price"/>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3">
                    <label htmlFor="category"><strong>Product Category</strong></label>
                </div>
                <div className="col-md-8">
                    <select class="form-select" onChange={(e) => setCategory(e.target.value)}>
                        <option value="mobiles" defaultValue>Mobiles</option>
                        <option value="laptops">Laptops</option>
                        <option value="monitors">Monitors</option>
                        <option value="earphones">Earphones</option>
                    </select>
                    {/* <input type="text" className="inputField" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Product Category" id="category" name="category"/> */}
                </div>
            </div>
            {/* <pre>{JSON.stringify(item, null, '\t')}</pre> */}
            <div className="row">
                <div className="col-md-3">
                    <label htmlFor="image"><strong>Product Image</strong></label>
                </div>
                <div className="col-md-4">
                <FileBase64
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) => setImage( base64 )}
                    />
                </div>
                {/* {image && <div className="col-md-4">
                    <img src={image} alt="sample Image" className="previewImage"></img>
                </div>} */}
            </div>
            {image && 
                <div className="image-preview">
                    <img src={image} alt="sample Image" className="previewImage"></img>
                </div>
            }
            {productId ? <div className="update-buttons">
                {/* <div className="col-md-3"> */}
                    <button className="btn btn-primary" onClick={deleteProductHandler}>Delete Product</button>
                {/* </div> */}
                {/* <div className="offset-md-1 col-md-3"> */}
                    <button className="btn btn-primary" onClick={(e) => addProductHandlerInInventry(e, "update")}>Update Product</button>
                {/* </div> */}
            </div> : 
                <div className="add-product-button">
                    <button className="btn btn-primary" onClick={(e) => addProductHandlerInInventry(e, "add")}>Add Product</button>
                </div>
            }
            
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.isLoading,
        products: state.products,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addProduct: (productObject) => dispatch(actions.addProduct(productObject)),
        updateProduct: (productObject) => dispatch(actions.updateProduct(productObject)),
        deleteProduct : (product_id, email) => dispatch(actions.deleteProduct(product_id, email)),
        getAllProducts: (email) => dispatch(actions.getAllProducts(email)),
        changeIsLoading: () => dispatch(actions.changeIsLoading()),
        setErrorMessage: (message) => dispatch(actions.setErrorMessage(message))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Inventry));
