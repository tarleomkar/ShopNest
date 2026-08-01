import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import connectDB from "./config/db.js";
import User from "./model/User.js";
import Product from "./model/Product.js";
import Order from "./model/Order.js";

dotenv.config();

const seed = async () => {
  try {
    await connectDB();

    await Promise.all([
      User.deleteMany(),
      Product.deleteMany(),
      Order.deleteMany(),
    ]);

    const adminPassword = await bcrypt.hash("Admin@123", 10);
    const userPassword = await bcrypt.hash("User@123", 10);

    const users = await User.insertMany([
      {
        name: "Admin User",
        email: "admin@shopnest.com",
        password: adminPassword,
        role: "admin",
        verified: true,
      },
      {
        name: "Demo User",
        email: "user@shopnest.com",
        password: userPassword,
      },
    ]);

    const products = await Product.insertMany([
      {
        name: "Wireless Headphones",
        description: "Comfortable noise-cancelling headphones with long battery life.",
        price: 89.99,
        category: "Electronics",
        stock: 45,
        imageUrl: [
          "https://example.com/images/headphones-1.jpg",
          "https://example.com/images/headphones-2.jpg",
        ],
      },
      {
        name: "Classic Leather Wallet",
        description: "Handcrafted leather wallet with multiple card slots and coin pocket.",
        price: 39.99,
        category: "Accessories",
        stock: 100,
        imageUrl: ["https://example.com/images/wallet.jpg"],
      },
      {
        name: "Smart Fitness Watch",
        description: "Track workouts, heart rate, and sleep with this smart fitness watch.",
        price: 129.99,
        category: "Wearables",
        stock: 30,
        imageUrl: ["https://example.com/images/watch.jpg"],
      },
    ]);

    const order = await Order.create({
      user: users[1]._id,
      items: [
        {
          productId: products[0]._id,
          qty: 2,
          price: products[0].price,
        },
      ],
      totalAmount: products[0].price * 2,
      address: {
        fullName: "Demo User",
        street: "123 Market Street",
        city: "Cityville",
        postalCode: "12345",
        country: "Countryland",
      },
      paymentId: "PAYMENT123456",
      status: "pending",
    });

    console.log("Seeded data successfully:");
    console.log(`  Users created: ${users.length}`);
    console.log(`  Products created: ${products.length}`);
    console.log(`  Orders created: 1 (ID: ${order._id})`);

    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
};

seed();
