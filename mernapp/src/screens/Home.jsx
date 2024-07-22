import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Carousal from '../components/Carousal';

export default function Home() {
    const [search, setSearch] = useState('');
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);

    // Function to fetch the data
    const loadData = async () => {
        try {
            let response = await fetch("http://localhost:5000/api/foodData", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            response = await response.json();
            setFoodItem(response[0]);
            setFoodCat(response[1]);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>
            <div><Navbar /></div>
            <div>
                <div>
                    <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                        <div className="carousel-inner" id="carousel">
                            <div className="carousel-caption" style={{ zIndex: "10" }}>
                                <div className="d-flex justify-content-center">
                                    <input
                                        className="form-control me-2"
                                        type="search"
                                        placeholder="Search"
                                        aria-label="Search"
                                        value={search}
                                        onChange={(e) => { setSearch(e.target.value); }}
                                    />
                                </div>
                            </div>
                            <div className="carousel-item active">
                                <img src="https://source.unsplash.com/random/900×700/?burger" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src="https://source.unsplash.com/random/900×700/?pastry" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src="https://source.unsplash.com/random/900×700/?momo" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className='container'>
                { // Categorizing the items under its respective category
                    foodCat.length > 0 ? foodCat.map((data) => { // here data represents each element in the food category
                        return (
                            <div key={data._id} className='row mb-3'>
                                <div className='fs-3 m-3'>{data.CategoryName}</div>
                                <hr />
                                {
                                    foodItem.length > 0 ? foodItem
                                        .filter((item) => item.CategoryName === data.CategoryName && item.name && item.name.toLowerCase().includes(search.toLowerCase()))
                                        .map((filteredItem) => {
                                            return (
                                                <div key={filteredItem._id} className='col-12 col-md-6 col-lg-4'>
                                                    <Card
                                                        foodItem = {filteredItem}
                                                        options={filteredItem.options[0]}
                                                        
                                                    />
                                                </div>
                                            );
                                        })
                                        : <div>No such data</div>
                                }
                            </div>
                        );
                    }) : ""
                }
            </div>
            <div><Footer /></div>
        </div>
    );
}
