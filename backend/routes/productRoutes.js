import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router();
import Product from '../models/productModel.js'
//toate rutele de aici sunt pe /api/products

router.get('/', asyncHandler(async (req, res) => {
    const products = await Product.find({})

    res.send(products)
}))

router.get('/:id', asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }

}))

export default router