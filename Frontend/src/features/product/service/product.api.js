import axios from "axios";

const productApiInstance = axios.create({
  baseURL: "/api/products",
  withCredentials: true,
});

export async function createProduct(formData) {
  const response = await productApiInstance.post("/create", formData);

  return response.data;
}

export async function getSellerProducts() {
  const response = await productApiInstance.get("/seller");
  return response.data;
}

export async function getAllProducts() {
  const response = await productApiInstance.get("/");

  return response.data;
}

export async function getProductById(productId) {
  const response = await productApiInstance.get(`/detail/${productId}`);
  return response.data;
}
export async function deleteProduct(productId) {
  const response = await productApiInstance.delete(`/${productId}/delete`);
  return response.data;
}

export async function addProductVariant(productId, formData) {
  const response = await productApiInstance.post(
    `/${productId}/variants`,
    formData,
  );
  return response.data;
}

export async function deleteProductVariant(productId, variantId) {
  const response = await productApiInstance.delete(
    `/${productId}/variants/${variantId}/delete`,
  );
  return response.data;
}

export async function updateProductVariant(productId, variantId, formData) {
  const response = await productApiInstance.patch(
    `/${productId}/variants/${variantId}/update`,
    formData,
  );
  return response.data;
}
