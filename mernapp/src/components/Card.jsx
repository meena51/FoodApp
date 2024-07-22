import React, { useEffect, useRef, useState } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
    const dispatch = useDispatchCart();
    let options = props.options;
    const data = useCart();
    const priceOptions = Object.keys(options);
    const priceRef = useRef();
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");
    const [logFlag, setLogFlag] = useState(false); // State to control logging

    const handleCart = async () => {
        const finalPrice = qty * parseInt(options[size]);
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size });
        setLogFlag(true); // Set the flag to true to trigger logging
    };

    const finalPrice = qty * parseInt(options[size] || 0);

    useEffect(() => {
        setSize(priceRef.current.value);
    }, []);

    useEffect(() => {
        if (logFlag) {
            console.log(data);
            setLogFlag(false); // Reset the flag after logging
        }
    }, [data, logFlag]); // Run effect when data or logFlag changes

    return (
        <div>
            <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
                <img className="card-img-top" src={props.foodItem.img} alt="Card image cap" style={{ height: "120px", objectFit: "fill" }} />
                <div className="card-body">
                    <h5 className="card-title fs-2">{props.foodItem.name}</h5>
                    <div className='container w-100'>
                        <select className='m-2 h-100 bg-success rounded' onChange={(e) => setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}
                        </select>
                        <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                            {priceOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                        <div className='d-inline fs-5'>
                            {finalPrice}/-
                        </div>
                    </div>
                    <hr />
                    <button className="btn btn-success justify-center ms-2" onClick={handleCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
}
