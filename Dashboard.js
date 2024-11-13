import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import './Dashboard.css';

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
        setProducts(storedProducts);

        const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
        setTransactions(storedTransactions);
    }, []);

    const calculateSoldStock = (product) => {
        return product.quantity < 20 ? 20 - product.quantity : 0;
    };

    const calculateTotalStockValue = () => {
        return products.reduce((total, product) => {
            return total + (product.price * product.quantity);
        }, 0).toFixed(2);
    };

    
    const calculateTotalAvailableProducts = () => {
        return products.reduce((total, product) => total + product.quantity, 0);
    };

    
    const chartData = products.map(product => ({
        name: product.name,
        quantity: product.quantity,
    }));

    return (
        <section>
            <h2>Dashboard</h2>
            <h3>Total Stock Value: M{calculateTotalStockValue()}</h3>
            <h3>Total Available Products: {calculateTotalAvailableProducts()}</h3> {/* Display total available products */}

            {/* Bar Chart for Product Quantities */}
            <h3>Product Quantity Overview</h3>
            <BarChart width={600} height={300} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="quantity" fill="#82ca9d" />
            </BarChart>

            {/* Image Gallery using div containers */}
            <h3>Product Images</h3>
            <div className="image-container">
                <img className="animated-image" src="a.jpg" alt=""/>
                <img className="animated-image" src="b.jpg" alt=""/>
                <img className="animated-image" src="c.jpg" alt=""/>
                <img className="animated-image" src="d.jpg" alt=""/>
                <img className="animated-image" src="e.jpg" alt=""/>
            </div>

            {/* Product Table */}
            <h3>Product Inventory</h3>
            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Stock Level</th>
                        <th>Sold Stock</th>
                        <th>Sold Products</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.quantity}</td>
                                <td>M{product.price.toFixed(2)}</td>
                                <td>{product.quantity < 5 ? "Low Stock" : "Available"}</td>
                                <td>{calculateSoldStock(product)}</td>
                                <td>{calculateSoldStock(product) > 0 ? "Yes" : "No"}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6}>No Products Available</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Transaction Table */}
            <h3>Transaction History</h3>
            <table>
                <thead>
                    <tr>
                        <th>Stock Name</th>
                        <th>Quantity Changed</th>
                        <th>Action</th>
                        <th>Date & Time</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.length > 0 ? (
                        transactions.map((transaction, index) => (
                            <tr key={index}>
                                <td>{transaction.productName}</td>
                                <td>{transaction.quantityChanged}</td>
                                <td>{transaction.action === 'add' ? "Added" : "Deducted"}</td>
                                <td>{transaction.date}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4}>No Transactions Available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
    );
};

export default Dashboard;