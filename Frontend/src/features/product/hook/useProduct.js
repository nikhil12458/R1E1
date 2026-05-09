import { useDispatch } from "react-redux";
import {
  createProduct,
  getAllProducts,
  getProductById,
  getSellerProducts,
  deleteProduct,
  addProductVariant,
  deleteProductVariant,
  updateProductVariant,
} from "../service/product.api";
import {
  setProducts,
  setSellerProducts,
  removeSellerProduct,
  setSelectedProduct,
} from "../state/product.slice";

export const useProduct = () => {
  const dispatch = useDispatch();

  async function handleCreateProduct(formData) {
    const data = await createProduct(formData);
    return data.product;
  }

  async function handleGetSellerProducts() {
    const data = await getSellerProducts();
    dispatch(setSellerProducts(data.products));
    return data.products;
  }

  async function handleGetAllProducts() {
    const data = await getAllProducts();
    dispatch(setProducts(data.products));
  }

  async function handleGetProductById(productId) {
    const data = await getProductById(productId);
    dispatch(setSelectedProduct(data.product));
    return data.product;
  }

  async function handleDeleteProduct(productId) {
    const data = await deleteProduct(productId);
    dispatch(removeSellerProduct(productId));
    return data.product;
  }

  async function handleAddProductVariant(productId, formData) {
    const data = await addProductVariant(productId, formData);
    if (data.success) {
      dispatch(setSelectedProduct(data.product));
    }
    return data;
  }

  async function handleDeleteProductVariant(productId, variantId) {
    const data = await deleteProductVariant(productId, variantId);
    if (data.success) {
      dispatch(setSelectedProduct(data.product));
    }
    return data;
  }

  async function handleUpdateProductVariant(productId, variantId, formData) {
    const data = await updateProductVariant(productId, variantId, formData);
    if (data.success) {
      dispatch(setSelectedProduct(data.product));
    }
    return data;
  }

  return {
    handleCreateProduct,
    handleGetSellerProducts,
    handleGetAllProducts,
    handleGetProductById,
    handleDeleteProduct,
    handleAddProductVariant,
    handleDeleteProductVariant,
    handleUpdateProductVariant,
  };
};
