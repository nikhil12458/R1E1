import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";

export async function createProduct(req, res) {
  const { title, description, priceAmount, priceCurrency } = req.body;

  const seller = req.user;

  const images = await Promise.all(
    req.files.map(async (file) => {
      return await uploadFile({
        buffer: file.buffer,
        fileName: file.originalname,
      });
    }),
  );

  const product = await productModel.create({
    title,
    description,
    price: {
      amount: priceAmount,
      currency: priceCurrency || "INR",
    },
    images,
    seller: seller._id,
  });

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    product,
  });
}

export async function getSellerProducts(req, res) {
  const seller = req.user;

  const products = await productModel.find({
    seller: seller._id,
  });

  res.status(200).json({
    success: true,
    message: "Products fetched successfully",
    products,
  });
}

export async function getAllProductsAdmin(req, res) {
  const products = await productModel
    .find({})
    .populate("seller", "fullname email contact company images");

  if (!products) {
    return res.status(404).json({
      success: false,
      message: "Products not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Products fetched successfully",
    products,
  });
}

export async function getAllProducts(req, res) {
  const products = await productModel.find({});

  if (!products) {
    return res.status(404).json({
      success: false,
      message: "Products not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Products fetched successfully",
    products,
  });
}

export async function getProductDetail(req, res) {
  const { id } = req.params;

  const product = await productModel.findById(id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Product fetched successfully",
    product,
  });
}

export async function addProductVariant(req, res) {
  const { productId } = req.params;

  const product = await productModel.findOne({
    _id: productId,
    seller: req.user._id,
  });

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  const files = req.files;
  const images = [];
  if (files || files.length !== 0) {
    (
      await Promise.all(
        files.map(async (file) => {
          const image = await uploadFile({
            buffer: file.buffer,
            fileName: file.originalname,
          });
          return image;
        }),
      )
    ).map((image) => images.push(image));
  }

  const price = req.body.priceAmount;
  const stock = req.body.stock;
  const attributes = JSON.parse(req.body.attributes || "{}");

  product.variants.push({
    images,
    price: {
      amount: price || product.price.amount,
      currency: req.body.priceCurrency || product.price.currency,
    },
    stock,
    attributes,
  });

  await product.save();

  return res.status(200).json({
    message: "Product variant added successfully",
    success: true,
    product,
  });
}

export async function deleteProductVariant(req, res) {
  const { productId, variantId } = req.params;

  const product = req.product;

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  const variant = product.variants.id(variantId);
  variant.remove();

  await product.save();

  return res.status(200).json({
    success: true,
    message: "Product variant deleted successfully",
    product,
  });
}

export async function deleteProduct(req, res) {
  const product = req.product;

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "You are not authorized to delete this product",
    });
  }

  await product.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Product deleted successfully",
    deletedProduct: product,
  });
}
