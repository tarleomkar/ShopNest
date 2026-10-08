import Order from "../model/Order.js";
import sendEmail from "../utils/sendMail.js";

// Create new order
const createOrder = async (req, res) => {
    try {
        const { items, totalAmount, address, paymentId } = req.body;
        if (!items || items.length === 0 || !totalAmount || !address || !paymentId) {
            return res.status(400).json({ message: 'Invalid order data' });
        }

        const normalizedItems = items.map((item) => ({
            productId: item.productId,
            qty: item.qty,
            price: item.price,
        }));

        const order = new Order({
            user: req.user._id,
            items: normalizedItems,
            totalAmount,
            address,
            paymentId,
        });
        await order.save();

        try {
            const message = `Dear ${req.user.name},\n\nThank you for your order!\n\nOrder Id: ${order._id}\nTotal Amount: ₹${totalAmount}\n\nBest regards,\nShopNest Team`;
            await sendEmail(req.user.email, 'Order created successfully', message);
        } catch (emailError) {
            console.error('Order email failed:', emailError);
        }

        res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'id name');
        res.status(200).json(orders);
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

const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body
        const order = await Order.findById(req.params.id);
        if (order) {
            order.status = status;
            await order.save();
            res.status(200).json({ message: 'Order status updated', order });
        }
        else {
            res.status(404).json({ message: 'Order not found!' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

export {
    createOrder,
    getOrders,
    myOrders,
    updateOrderStatus
}