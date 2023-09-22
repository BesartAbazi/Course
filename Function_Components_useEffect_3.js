// ==== Shop.js ====
import React, { useState, useEffect } from 'react';
import { get } from './mockBackend/fetch';

export default function Shop() {
    const [categories, setCategories] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [items, setItems] = useState({});

    useEffect(() => {
        get('/categories').then((response) => {
            setCategories(response.data);
        });
    }, []);

    useEffect(() => {
        if (selectedCategory && !items[selectedCategory]) {
            get(`/items?category=${selectedCategory}`).then((response) => {
                setItems((prev) => ({ ...prev, [selectedCategory]: response.data }));
            });
        }
    }, [selectedCategory, items]);

    if (!categories) {
        return <p>Loading..</p>;
    }

    return (
        <div className='App'>
            <h1>Clothes 'n Things</h1>
            <nav>
                {categories.map((category) => (
                    <button key={category} onClick={() => setSelectedCategory(category)}>
                        {category}
                    </button>
                ))}
            </nav>
            <h2>{selectedCategory}</h2>
            <ul>
                {!items[selectedCategory]
                    ? null
                    : items[selectedCategory].map((item) => <li key={item}>{item}</li>)}
            </ul>
        </div>
    );
}




// ==== fetch.js ====
import DATA from "./data";

export function get(endpoint) {
    const delay = Math.floor(Math.random() * 1000) + 500;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!DATA.hasOwnProperty(endpoint)) {
                const validEndpoints = Object.keys(DATA)
                    .map((endpoint) => ` - "${endpoint}"`)
                    .join("\n ");
                reject(
                    `"${endpoint}" is an invalid endpoint. Try getting data from: \n ${validEndpoints}`
                );
            }

            const response = { status: 200, data: DATA[endpoint] };

            resolve(response);
        }, delay);
    });
}




// ==== data.js ====
export default {
    "/categories": ["Shirts", "Pants", "Shoes", "Accessories"],
    "/items?category=Shirts": ["T-Shirts", "Casual", "Formal"],
    "/items?category=Pants": ["Long Pants", "Sweat Pants", "Shorts", "Swimwear"],
    "/items?category=Shoes": ["Athletic", "Professional", "Casual", "Walking"],
    "/items?category=Accessories": ["Hats", "Wallets", "Belts"]
};
