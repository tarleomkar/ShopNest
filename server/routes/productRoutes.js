import express from "express";
import multer from "multer";
import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/productController.js";

const upload = multer({ dest: "uploads/" });
const router = express.Router();

<<<<<<< HEAD
router.route("/")
    .get(getProducts)
    .post(protect,
        admin,
        upload.single("image"),
        createProduct
    );
router.route("/:id")
    .get(getProductById)
    .put(
        protect,
        admin,
        upload.single("image"),
        updateProduct
    )
    .delete(protect, admin, deleteProduct);
=======
router.route("/").get(getProducts).post(protect, admin, upload.single("image"), createProduct);
router.route("/:id").get(getProductById).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct);
>>>>>>> eb7dadf (feat: product code for post and get with cloudinary setup)

export default router;
