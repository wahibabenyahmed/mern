const express = require("express");
const { createCoupon, getAllCoupons, updateCoupon, getCoupon, deleteCoupon } = require("../controllers/Coupon");
const { isAdmin, authMiddleware } = require("../middleWare/authMiddleware");
const couponRouter = express.Router();

couponRouter.post("/create",authMiddleware,isAdmin, createCoupon);
couponRouter.get("/",authMiddleware,isAdmin, getAllCoupons);
couponRouter.get("/:id",authMiddleware,isAdmin, getCoupon);
couponRouter.put("/update/:id",authMiddleware,isAdmin, updateCoupon);
couponRouter.delete("/:id",authMiddleware,isAdmin, deleteCoupon);

module.exports = couponRouter;
