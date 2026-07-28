const Order = require("../model/Order.js");
const sendEmail = require("../utils/sendMail.js");

// Create new order
const createOrder = async (req, res) => {
    try {
        const { items, totalAmount, address, paymentId } = req.body;
        if (!items || items.length === 0 || !totalAmount || !address ) {
            return res.status(400).json({ message: 'Invalid order data' });
        }
        else {
            const order = new Order({
                user: req.user._id,
                items,
                totalAmount,
                address,
                paymentId,
            });
            await order.save();
            const message = `Dear ${req.user.name}, \n\nThank you for your order! Your order has been successfully created with the following details:\n\nOrder Id: ${order._id}\nTotal Amount: $${totalAmount}\nShipping Address: ${address}\n\nWe will notify you once your order is shipped.\n\nBest regards, \nShopNest Team`;
            await sendEmail(req.user.email, message);
            res.status(201).json({ message: 'Order created successfully', order });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const myOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate('items.productId', 'name price');
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('userId', 'id name');
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export {
    createOrder,
    myOrders,
    getOrders
}