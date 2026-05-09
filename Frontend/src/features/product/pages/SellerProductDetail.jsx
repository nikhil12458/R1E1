import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { useProduct } from "../hook/useProduct";
import { useSelector } from "react-redux";

const SellerProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { handleGetProductById, handleAddProductVariant, handleDeleteProductVariant, handleUpdateProductVariant } = useProduct();

  const product = useSelector((state) => state.product.selectedProduct);
  const [loading, setLoading] = useState(!product);
  const [error, setError] = useState("");

  // Variant Form State
  const [variantForm, setVariantForm] = useState({
    priceAmount: "",
    priceCurrency: "INR",
    stock: "",
    attributes: {}, // Dynamic attributes Map
  });
  const [newAttr, setNewAttr] = useState({ key: "", value: "" });
  const [variantImages, setVariantImages] = useState([]);
  const [variantLoading, setVariantLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [editingVariantId, setEditingVariantId] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await handleGetProductById(productId);
        setVariantForm((prev) => ({
          ...prev,
          priceAmount: data.price.amount,
          priceCurrency: data.price.currency,
        }));
      } catch (err) {
        setError("Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleVariantChange = (e) => {
    const { name, value } = e.target;
    setVariantForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAttribute = () => {
    if (!newAttr.key || !newAttr.value) return;
    setVariantForm((prev) => ({
      ...prev,
      attributes: { ...prev.attributes, [newAttr.key]: newAttr.value },
    }));
    setNewAttr({ key: "", value: "" });
  };

  const handleRemoveAttribute = (key) => {
    const updatedAttrs = { ...variantForm.attributes };
    delete updatedAttrs[key];
    setVariantForm((prev) => ({ ...prev, attributes: updatedAttrs }));
  };

  const handleEditClick = (variant) => {
    setEditingVariantId(variant._id);
    setVariantForm({
      priceAmount: variant.price.amount,
      priceCurrency: variant.price.currency,
      stock: variant.stock,
      attributes: variant.attributes || {},
    });
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingVariantId(null);
    setVariantForm({
      priceAmount: product.price.amount,
      priceCurrency: product.price.currency,
      stock: "",
      attributes: {},
    });
    setNewAttr({ key: "", value: "" });
    setVariantImages([]);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 4) {
      alert("You can only upload up to 4 images for a variant");
      return;
    }
    setVariantImages(files);
  };

  const handleVariantSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(variantForm.attributes).length === 0) {
      alert("Please add at least one attribute (e.g., Color or Size)");
      return;
    }
    setVariantLoading(true);
    try {
      let result;
      if (editingVariantId) {
        // Update mode
        result = await handleUpdateProductVariant(productId, editingVariantId, {
          priceAmount: variantForm.priceAmount,
          priceCurrency: variantForm.priceCurrency,
          stock: variantForm.stock,
          attributes: JSON.stringify(variantForm.attributes)
        });
      } else {
        // Create mode
        const formData = new FormData();
        formData.append("priceAmount", variantForm.priceAmount);
        formData.append("priceCurrency", variantForm.priceCurrency);
        formData.append("stock", variantForm.stock);
        formData.append("attributes", JSON.stringify(variantForm.attributes));
        variantImages.forEach((img) => {
          formData.append("variantImages", img);
        });
        result = await handleAddProductVariant(productId, formData);
      }

      if (result.success) {
        setVariantForm({
          priceAmount: result.product.price.amount,
          priceCurrency: result.product.price.currency,
          stock: "",
          attributes: {},
        });
        setNewAttr({ key: "", value: "" });
        setVariantImages([]);
        setEditingVariantId(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        alert(editingVariantId ? "Variant updated successfully" : "Variant added successfully");
      }
    } catch (err) {
      alert(editingVariantId ? "Failed to update variant" : "Failed to add variant");
    } finally {
      setVariantLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-surface font-playfair text-primary text-2xl animate-pulse">
        Entering the Atelier...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen bg-surface font-montserrat text-error">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface">
      {/* Google Fonts & Material Symbols */}
      <link href="https://fonts.googleapis.com" rel="preconnect" />
      <link crossOrigin="" href="https://fonts.gstatic.com" rel="preconnect" />
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      {/* Header */}
      <header className="w-full bg-surface border-b border-outline-variant/30 sticky top-0 z-50 backdrop-blur-md bg-white/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="text-primary hover:opacity-70 transition-opacity flex items-center space-x-2"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            <span className="text-xs font-bold tracking-widest uppercase">
              Return
            </span>
          </button>
          <h1 className="text-xl md:text-2xl font-playfair font-bold text-primary tracking-widest uppercase">
            Product Refinement
          </h1>
          <div className="w-20"></div> {/* Spacer */}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Side: Product Core Narrative (Edit) */}
          <div className="w-full lg:w-3/5 space-y-10">
            <section className="bg-white/40 p-8 rounded-3xl border border-outline-variant/10 shadow-sm backdrop-blur-sm">
              <div className="flex items-center space-x-4 mb-8">
                <span className="material-symbols-outlined text-primary text-3xl">
                  auto_stories
                </span>
                <h2 className="text-3xl font-playfair text-primary">
                  Artisan&apos;s Narrative
                </h2>
              </div>

              <div className="space-y-8">
                {/* Title */}
                <div className="group relative">
                  <label className="text-[10px] text-on-surface-variant uppercase tracking-[0.3em] font-semibold mb-2 block opacity-70 group-focus-within:opacity-100 group-focus-within:text-primary transition-all">
                    Creation Title
                  </label>
                  <input
                    type="text"
                    value={product.title}
                    readOnly
                    className="w-full bg-transparent border-b border-outline-variant/40 py-2 font-playfair text-2xl text-on-surface focus:border-primary outline-none transition-colors"
                  />
                </div>

                {/* Description */}
                <div className="group relative">
                  <label className="text-[10px] text-on-surface-variant uppercase tracking-[0.3em] font-semibold mb-2 block opacity-70 group-focus-within:opacity-100 group-focus-within:text-primary transition-all">
                    Heritage Description
                  </label>
                  <textarea
                    value={product.description}
                    readOnly
                    rows={4}
                    className="w-full bg-transparent border-b border-outline-variant/40 py-2 font-montserrat text-sm text-on-surface focus:border-primary outline-none transition-colors resize-none leading-relaxed italic"
                  />
                </div>

                {/* Base Price */}
                <div className="flex gap-8">
                  <div className="flex-1 group">
                    <label className="text-[10px] text-on-surface-variant uppercase tracking-[0.3em] font-semibold mb-2 block opacity-70 transition-all">
                      Base Valuation
                    </label>
                    <div className="flex items-center space-x-2 border-b border-outline-variant/40 py-2">
                      <span className="text-primary font-bold">
                        {product.price.currency}
                      </span>
                      <span className="text-xl font-playfair">
                        {product.price.amount}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    {/* Placeholder for status */}
                    <label className="text-[10px] text-on-surface-variant uppercase tracking-[0.3em] font-semibold mb-2 block opacity-70">
                      Market Status
                    </label>
                    <div className="flex items-center space-x-2 py-2">
                      <span className="w-2 h-2 rounded-full bg-secondary"></span>
                      <span className="text-xs font-bold uppercase tracking-widest text-secondary">
                        Active Listing
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Gallery Preview */}
            <section className="space-y-6">
              <h3 className="text-xl font-playfair text-primary italic">
                Heritage Visuals
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {product.images.map((img, i) => (
                  <div
                    key={i}
                    className="aspect-[3/4] rounded-2xl overflow-hidden border border-outline-variant/10 shadow-sm group relative"
                  >
                    <img
                      src={img.url}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      alt="heritage"
                    />
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Side: Variant Atelier */}
          <div className="w-full lg:w-2/5 space-y-10">
            <section className="bg-primary-container/10 p-8 rounded-3xl border border-primary/5 shadow-inner">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <span className="material-symbols-outlined text-primary text-3xl">
                    {editingVariantId ? "edit_note" : "palette"}
                  </span>
                  <h2 className="text-2xl font-playfair text-primary tracking-tight">
                    {editingVariantId ? "Refine Variant" : "Variant Atelier"}
                  </h2>
                </div>
                {editingVariantId && (
                  <button 
                    onClick={handleCancelEdit}
                    className="text-[10px] font-bold text-error uppercase tracking-widest hover:opacity-70 transition-opacity"
                  >
                    Discard Refinement
                  </button>
                )}
              </div>

              <form onSubmit={handleVariantSubmit} className="space-y-8">
                {/* Dynamic Attribute Builder */}
                <div className="space-y-4">
                  <label className="text-[10px] text-on-surface-variant uppercase tracking-[0.3em] font-semibold block">
                    Artisan Attributes (e.g. Color, Size, Fabric)
                  </label>
                  
                  {/* Active Attributes Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {Object.entries(variantForm.attributes).map(([key, val]) => (
                      <div key={key} className="bg-primary/5 border border-primary/20 px-3 py-1 rounded-full flex items-center space-x-2 animate-in fade-in zoom-in duration-300">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{key}: {val}</span>
                        <button 
                          type="button"
                          onClick={() => handleRemoveAttribute(key)}
                          className="material-symbols-outlined text-xs text-primary hover:text-error transition-colors"
                        >
                          close
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <input 
                      placeholder="Property (e.g. Color)"
                      value={newAttr.key}
                      onChange={(e) => setNewAttr({ ...newAttr, key: e.target.value })}
                      className="flex-1 bg-transparent border-b border-outline-variant/40 py-2 font-montserrat text-xs text-on-surface focus:border-primary outline-none transition-colors"
                    />
                    <input 
                      placeholder="Value (e.g. Indigo)"
                      value={newAttr.value}
                      onChange={(e) => setNewAttr({ ...newAttr, value: e.target.value })}
                      className="flex-1 bg-transparent border-b border-outline-variant/40 py-2 font-montserrat text-xs text-on-surface focus:border-primary outline-none transition-colors"
                    />
                    <button 
                      type="button"
                      onClick={handleAddAttribute}
                      className="material-symbols-outlined text-primary hover:scale-110 transition-transform"
                    >
                      add_circle
                    </button>
                  </div>
                </div>

                {/* Variant Stock & Price */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="group relative">
                    <label className="text-[10px] text-on-surface-variant uppercase tracking-[0.3em] font-semibold mb-2 block transition-all">
                      Atelier Stock
                    </label>
                    <input
                      name="stock"
                      type="number"
                      placeholder="0"
                      value={variantForm.stock}
                      onChange={handleVariantChange}
                      className="w-full bg-transparent border-b border-outline-variant/40 py-2 font-montserrat text-sm text-on-surface focus:border-primary outline-none transition-colors"
                    />
                  </div>
                  <div className="group relative">
                    <label className="text-[10px] text-on-surface-variant uppercase tracking-[0.3em] font-semibold mb-2 block transition-all">
                      Variant Price ({variantForm.priceCurrency})
                    </label>
                    <input
                      name="priceAmount"
                      type="number"
                      value={variantForm.priceAmount}
                      onChange={handleVariantChange}
                      className="w-full bg-transparent border-b border-outline-variant/40 py-2 font-montserrat text-sm text-on-surface focus:border-primary outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Variant Image Upload */}
                <div className="space-y-4">
                  <label className="text-[10px] text-on-surface-variant uppercase tracking-[0.3em] font-semibold block">
                    Variant Visuals (Limit 4)
                  </label>
                  <div
                    onClick={() => fileInputRef.current.click()}
                    className="h-32 border-2 border-dashed border-outline-variant/30 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-all bg-white/50"
                  >
                    <input
                      type="file"
                      multiple
                      hidden
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                    <span className="material-symbols-outlined text-primary/40 text-4xl mb-1">
                      add_photo_alternate
                    </span>
                    <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
                      {variantImages.length > 0
                        ? `${variantImages.length} images selected`
                        : "Select Shade Visuals"}
                    </p>
                  </div>
                  {variantImages.length > 0 && (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {variantImages.map((img, i) => (
                        <div
                          key={i}
                          className="w-12 h-16 rounded-lg overflow-hidden border border-outline-variant/20 flex-shrink-0"
                        >
                          <img
                            src={URL.createObjectURL(img)}
                            className="w-full h-full object-cover"
                            alt="preview"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={variantLoading}
                  className="w-full bg-primary text-on-primary py-4 rounded-full font-playfair text-lg tracking-widest hover:bg-primary-container transition-all active:scale-95 disabled:opacity-50"
                >
                  {variantLoading ? (editingVariantId ? "UPDATING..." : "CRAFTING...") : (editingVariantId ? "UPDATE CRAFT" : "CREATE VARIANT")}
                </button>
              </form>
            </section>

            {/* Existing Variants List */}
            <section className="space-y-6">
              <h3 className="text-xl font-playfair text-primary italic">
                Atelier Collection
              </h3>
              <div className="space-y-4">
                {product.variants.length === 0 ? (
                  <p className="text-sm font-montserrat text-on-surface-variant italic opacity-60 text-center py-10 border border-dashed border-outline-variant/20 rounded-3xl">
                    No shades crafted yet.
                  </p>
                ) : (
                  product.variants.map((variant) => (
                    <div
                      key={variant._id}
                      className="flex items-center bg-white p-4 rounded-2xl border border-outline-variant/10 shadow-sm group hover:shadow-md transition-all"
                    >
                      <div className="w-16 h-20 rounded-xl overflow-hidden mr-4">
                        <img
                          src={
                            variant.images?.[0]?.url ||
                            "https://images.unsplash.com/photo-1621419777150-136195c807b5?q=80&w=200&auto=format&fit=crop"
                          }
                          className="w-full h-full object-cover"
                          alt="v"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap gap-1 mb-1">
                          {Object.entries(variant.attributes || {}).map(([k, v]) => (
                            <span key={k} className="text-[8px] bg-secondary/10 text-secondary px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">
                              {k}: {v}
                            </span>
                          ))}
                        </div>
                        <p className="text-xs text-on-surface-variant font-light">
                          Stock: {variant.stock} | {variant.price.currency}{" "}
                          {variant.price.amount}
                        </p>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <button
                          onClick={() => handleEditClick(variant)}
                          className="material-symbols-outlined text-outline hover:text-primary transition-colors text-xl"
                        >
                          edit
                        </button>
                        <button
                          onClick={() => {
                            handleDeleteProductVariant(product._id, variant._id);
                          }}
                          className="material-symbols-outlined text-outline hover:text-error transition-colors text-xl"
                        >
                          delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer Motif */}
      <footer className="py-20 flex flex-col items-center opacity-20 select-none">
        <div className="flex items-center space-x-4">
          <span className="w-12 h-[0.5px] bg-on-surface"></span>
          <span className="material-symbols-outlined text-xl">
            filter_vintage
          </span>
          <span className="w-12 h-[0.5px] bg-on-surface"></span>
        </div>
      </footer>
    </div>
  );
};

export default SellerProductDetail;
