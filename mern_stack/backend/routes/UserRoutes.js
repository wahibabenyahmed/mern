const express = require("express");
const { createUser, loginUserCtrl, getallUser, getaUser, deleteaUser, updatedUser, blockUser, unblockUser,
     handleRefreshToken, logout, updatePassword, forgotPasswordToken, resetPassword,loginAdmin, getWishlist,
     saveAddress, userCart, getUserCart, emptyCart, applyCoupon, createOrder, getOrders, updateOrderStatus, 
     getAllOrders, getOrderByUserId } = require("../controllers/User");
const { authMiddleware, isAdmin } = require("../middleWare/authMiddleware");
const userRouter = express.Router();

userRouter.post("/register", createUser );
userRouter.post("/forgot-password-token", forgotPasswordToken);
userRouter.put("/reset-password/:token", resetPassword);
userRouter.put("/order/update-order/:id",authMiddleware,isAdmin,updateOrderStatus);
userRouter.put("/password", authMiddleware, updatePassword);
userRouter.post("/login", loginUserCtrl);
userRouter.post("/admin-login", loginAdmin);
userRouter.post("/cart", authMiddleware, userCart);
userRouter.post("/cart/applycoupon", authMiddleware, applyCoupon);
userRouter.post("/cart/cash-order", authMiddleware, createOrder);
userRouter.get("/all-users", getallUser);
userRouter.get("/get-orders", authMiddleware, getOrders);
userRouter.get("/getallorders", authMiddleware,getAllOrders);
userRouter.get("/getallorders/:id", authMiddleware,getOrderByUserId);
userRouter.get("/refresh", handleRefreshToken);
userRouter.get("/logout", logout);
userRouter.get("/wishlist", authMiddleware, getWishlist);
userRouter.get("/cart", authMiddleware, getUserCart);
userRouter.get("/singleUser", authMiddleware,getaUser);
userRouter.delete("/empty-cart", authMiddleware, emptyCart);
userRouter.delete("/:id", deleteaUser);
userRouter.put("/edit-user", authMiddleware, updatedUser);
userRouter.put("/save-address", authMiddleware, saveAddress);
userRouter.put("/block-user/:id", blockUser);
userRouter.put("/unblock-user/:id", unblockUser);

module.exports = userRouter;
