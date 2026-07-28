import Order from "../model/Order.js";

const createOrder = async (req, res) => {
    try {
        const { items, address, paymentId, totalAmount } = req.body;

        if (!req.user?._id) {
            return res.status(401).json({ message: "Not authorized" });
        }

        if (!items?.length || !address || !paymentId || totalAmount === undefined) {
            return res.status(400).json({ message: "Missing required order fields" });
        }

        const order = await Order.create({
            user: req.user._id,
            items,
            address,
            paymentId,
            totalAmount,
            status: "pending",
        });

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate("user", "name email");
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (req.user.role !== "admin" && order.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Access denied" });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (!status) {
            return res.status(400).json({ message: "Status is required" });
        }

        order.status = status;
        await order.save();
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { createOrder, getOrders, getMyOrders, getOrderById, updateOrderStatus };