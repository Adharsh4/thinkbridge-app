import React, { useCallback, useEffect, useState } from 'react'
import "./ShowProducts.css";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import * as actions from "../store/actions"
import Loader from "react-loader-spinner"

function ShowProducts(props) {

    const [email, setEmail] = useState(localStorage.getItem("email"))
    const [pageNumber, setPageNumber] = useState([]);
    const [selected, setSelected] = useState("mobiles")
    const [paginationItems, setPaginationItems] = useState([]);
    const [items, setItems] = useState([]);
    const [category, setCategory] = useState(localStorage.getItem("category"))

    useEffect(() => {
        // console.log("aaa");
        props.getAllProducts(email);
        if(category){
            setSelected(category)
        }
    }, [])

    // useEffect(() => {
    //     if(props.errorMessage === "Password not match"){
    //         props.history.push("/");
    //     }
    // }, [props.errorMessage])


    useEffect(() => {
        const tempItems = props.products.filter(product => product.category === selected)
        // console.log(tempItems.length);
        let number = parseInt((tempItems.length-1)/6) + 1;
        let temp = [];
        for(let i=1;i<=number;i++){
            temp.push(i);
        }
        setPageNumber(temp) 
        setItems(tempItems)
        setPaginationItems(tempItems)
    }, [props.products])

    const addProductHandler = useCallback((e) => {
        e.preventDefault();
        localStorage.removeItem("productId")
        props.history.push("/inventry")
    })

    const editProductHandler = useCallback((e, product_id) => {
        e.preventDefault();
        localStorage.setItem("productId", product_id)
        props.history.push("/inventry")
    })

    const categoryHandler = useCallback((e, type) => {
        e.preventDefault();
        localStorage.setItem("category", type)
        const tempItems = props.products.filter(product => product.category === type)
        setItems(tempItems)
        setPaginationItems(tempItems)
        setSelected(type);
    }, [props.products])

    const nextPageHandler = useCallback((e, pageNumber) => {
        e.preventDefault();
        // console.log(pageNumber);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        // setPageNumber(pageNumber);
        let temp = paginationItems.slice((pageNumber-1) * 6, ((pageNumber-1) * 6)+7)
        setItems(temp);
    }, [paginationItems])

    return (
        props.isLoading ? <div className="loading"><h3>Please wait...</h3><Loader type = "Oval" color="#00BFFF" height={30} width={30}/></div> : (<div>
            <div className=" center-row">
                {props.products.length === 0 ? 
                <div className="">
                    <h1>No Products Added into Inventry</h1>
                </div>:
                <div className="">
                    <h1>Products in Inventry</h1>
                </div>}
                <div className="">
                    <button className="btn btn-success" onClick={addProductHandler}>Add product</button>
                </div>
            </div>
            <div className="row fixed-width">
                <ul class="nav justify-content-center nav-tabs padding-zero">
                    <li class="nav-item">
                        <a class={`nav-link category-selector ${selected === "mobiles" ? 'active' : ''}`} onClick={(e) => categoryHandler(e, "mobiles")}>Mobiles</a>
                    </li>
                    <li class="nav-item">
                        <a class={`nav-link category-selector ${selected === "laptops" ? 'active' : ''}`} onClick={(e) => categoryHandler(e, "laptops")}>Laptops</a>
                    </li>
                    <li class="nav-item">
                        <a class={`nav-link category-selector ${selected === "monitors" ? 'active' : ''}`} onClick={(e) => categoryHandler(e, "monitors")}>Monitors</a>
                    </li>
                    <li class="nav-item">
                        <a class={`nav-link category-selector ${selected === "earphones" ? 'active' : ''}`} onClick={(e) => categoryHandler(e, "earphones")}>Earphones</a>
                    </li>
                </ul>
            </div>
            <div className="row custom-row row-cols-1 row-cols-md-3 g-4">
                {items.length !== 0 ? items.slice(0,3).map((product, index) => {
                    return (
                        <div className="col-md-12 col-lg-12 col-sm-12 style-col" key={product.id}>
                            <div className="card h-100">
                                <img src={product.image} className="card-img-top" alt="..." />
                                <div className="card-body text-center">
                                    <h5 className="card-title">Name: {product.name}</h5>
                                    <h5 className="card-text">Price: {product.price}</h5>
                                    <h5>Rating: 
                                    <span className="hint-star star">
                                        
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star-o" aria-hidden="true"></i>
                                    </span></h5>
                                    <h5 className="card-text">Description: {product.description}</h5>    
                                    <button className="btn btn-primary edit-btn" onClick={(e) => editProductHandler(e, product.id)}>Edit Item</button>
                                </div>
                                
                            </div>
                        </div>
                    )
                }) : <h3 className="col-md-10">No Products Added yet</h3>}
            </div>
            <div className="row custom-row row-cols-1 row-cols-md-3 g-4">
                {items.length !== 0 && items.slice(3,6).map((product, index) => {
                    return (
                        <div className="col style-col" key={product.id}>
                            <div className="card h-100">
                                <img src={product.image} className="card-img-top" alt="..." />
                                <div className="card-body text-center">
                                    <h5 className="card-title">Name: {product.name}</h5>
                                    <h5 className="card-text">Price: {product.price}</h5>
                                    <h5>Rating: 
                                    <span className="hint-star star">
                                        
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star-o" aria-hidden="true"></i>
                                    </span></h5>
                                    <h5 className="card-text">Description: {product.description}</h5>    
                                    <button className="btn btn-primary edit-btn"  onClick={(e) => editProductHandler(e, product.id)}>Edit Item</button>
                                </div>
                                
                            </div>
                        </div>
                    )
                }) }
            </div>
            {paginationItems.length > 6 ? <div className="text-center">{pageNumber.map(number => <button className="style-pagination" onClick={(e) => nextPageHandler(e, number)}>{number}</button>)}</div> : null}
        </div>)
    )
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
        isLoading: state.isLoading,
        errorMessage: state.errorMessage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllProducts: (email) => dispatch(actions.getAllProducts(email)),
        // editProduct : (product_id, email) => dispatch(actions.editProduct(product_id, email))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShowProducts));
