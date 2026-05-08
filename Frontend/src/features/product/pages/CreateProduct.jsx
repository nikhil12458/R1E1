import { useState, useRef } from "react";
import { useProduct } from "../hook/useProduct";
import { useNavigate } from "react-router";

const CURRENCIES = ["INR", "USD", "EUR", "GBP"];
const MAX_IMAGES = 5;

const CreateProduct = () => {
  const { handleCreateProduct } = useProduct();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [values, setValues] = useState({
    title: "",
    description: "",
    priceAmount: "",
    priceCurrency: "INR",
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > MAX_IMAGES) {
      setError(`You can only upload up to ${MAX_IMAGES} images.`);
      return;
    }
    setError("");
    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.title || !values.description || !values.priceAmount) {
      setError("Please fill in all required fields.");
      return;
    }
    if (images.length === 0) {
      setError("Please upload at least one image.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("priceAmount", values.priceAmount);
      formData.append("priceCurrency", values.priceCurrency);
      images.forEach((image) => {
        formData.append("images", image);
      });

      await handleCreateProduct(formData);
      navigate("/"); // Or wherever you want to redirect
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen">
      {/* Google Fonts & Material Symbols */}
      <link href="https://fonts.googleapis.com" rel="preconnect" />
      <link crossOrigin="" href="https://fonts.gstatic.com" rel="preconnect" />
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      {/* TopAppBar */}
      <header className="w-full top-0 sticky z-50 bg-surface shadow-sm shadow-primary/10">
        <div className="flex justify-between items-center px-4 md:px-8 py-4 max-w-7xl mx-auto">
          <button className="text-primary transition-opacity active:opacity-80">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <h1 className="font-playfair text-xl md:text-2xl font-bold text-primary tracking-widest uppercase">
            Vastraa Atelier
          </h1>
          <button className="text-primary transition-opacity active:opacity-80">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto pb-32">
        <form onSubmit={handleSubmit}>
          {/* Image Upload Section */}
          <section className="px-4 md:px-8 pt-8">
            <div
              onClick={() => fileInputRef.current.click()}
              className="relative group aspect-[16/7] rounded-xl overflow-hidden bg-surface-container-low shadow-sm border-2 border-dashed border-outline-variant flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
            >
              <input
                type="file"
                multiple
                hidden
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
              />
              <span className="material-symbols-outlined text-primary text-[48px] mb-2">
                add_photo_alternate
              </span>
              <h2 className="font-playfair text-xl text-primary mb-1">
                Upload Masterpiece Visuals
              </h2>
              <p className="font-montserrat text-sm text-on-surface-variant italic">
                {images.length > 0 ? `${images.length} images selected` : "Capture the soul of your creation (Max 5)"}
              </p>

              {images.length > 0 && (
                <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto pb-2">
                  {images.map((img, index) => (
                    <div key={index} className="relative w-20 h-24 flex-shrink-0 rounded-lg overflow-hidden border border-white/20 shadow-md">
                      <img
                        src={URL.createObjectURL(img)}
                        className="w-full h-full object-cover"
                        alt="preview"
                      />
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); removeImage(index); }}
                        className="absolute top-1 right-1 bg-primary/80 text-white rounded-full p-0.5 hover:bg-primary"
                      >
                        <span className="material-symbols-outlined text-xs">close</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Decorative Divider */}
          <div className="flex justify-center py-10 opacity-30">
            <svg
              className="text-primary/40 fill-current"
              fill="none"
              height="20"
              viewBox="0 0 200 20"
              width="200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 10C20 10 30 0 50 0C70 0 80 10 100 10C120 10 130 0 150 0C170 0 180 10 200 10V11C180 11 170 20 150 20C130 20 120 11 100 11C80 11 70 20 50 20C30 20 20 11 0 11V10Z"></path>
            </svg>
          </div>

          <div className="px-4 md:px-8 space-y-12">
            {/* Core Details Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <h3 className="font-playfair text-2xl text-primary flex items-center gap-3">
                  <span className="material-symbols-outlined">edit_note</span>
                  Artisan&apos;s Narrative
                </h3>
                <div className="space-y-6">
                  <div className="relative group">
                    <label className="block text-xs font-montserrat font-semibold text-on-surface-variant tracking-widest mb-2 group-focus-within:text-primary transition-colors uppercase">
                      Product Name
                    </label>
                    <input
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-outline-variant focus:border-primary focus:ring-0 transition-colors py-3 text-lg font-montserrat placeholder:italic placeholder:opacity-30 outline-none"
                      placeholder="e.g., Hand-Block Printed Chanderi Saree"
                      type="text"
                    />
                  </div>
                  <div className="relative group">
                    <label className="block text-xs font-montserrat font-semibold text-on-surface-variant tracking-widest mb-2 group-focus-within:text-primary transition-colors uppercase">
                      Story & Description
                    </label>
                    <textarea
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-outline-variant focus:border-primary focus:ring-0 transition-colors py-3 text-base font-montserrat resize-none min-h-[120px] outline-none"
                      placeholder="Tell the story of the weave, the artisan's journey, and the heritage behind this piece..."
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <h3 className="font-playfair text-2xl text-primary flex items-center gap-3">
                  <span className="material-symbols-outlined">payments</span>
                  Valuation
                </h3>
                <div className="p-8 bg-surface-container-low rounded-2xl border border-primary/5 shadow-[inset_0_0_40px_rgba(87,0,0,0.02)] flex flex-col gap-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-montserrat font-semibold text-on-surface-variant tracking-widest uppercase">
                        Price
                      </label>
                      <div className="flex items-center gap-2 border-b border-outline-variant focus-within:border-primary transition-colors py-2">
                        <span className="text-primary font-bold">{values.priceCurrency === 'INR' ? '₹' : '$'}</span>
                        <input
                          name="priceAmount"
                          value={values.priceAmount}
                          onChange={handleChange}
                          className="w-full bg-transparent border-none p-0 text-xl font-bold font-montserrat focus:ring-0 outline-none"
                          placeholder="24,500"
                          type="number"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-montserrat font-semibold text-on-surface-variant tracking-widest uppercase">
                        Currency
                      </label>
                      <select
                        name="priceCurrency"
                        value={values.priceCurrency}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-outline-variant py-2.5 text-base font-montserrat focus:border-primary focus:ring-0 outline-none appearance-none"
                      >
                        {CURRENCIES.map((cur) => (
                          <option key={cur} value={cur}>{cur}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="p-4 bg-white/40 rounded-lg border border-primary/5 italic text-sm text-on-surface-variant leading-relaxed">
                    &quot;Fair pricing ensures our weavers are honored for their craft. The heritage premium is built into your valuation.&quot;
                  </div>
                </div>
              </div>
            </section>

            {/* Error Message */}
            {error && (
              <div className="bg-error-container text-on-error-container p-4 rounded-xl text-center font-montserrat text-sm border border-error/20">
                {error}
              </div>
            )}

            {/* Final Action */}
            <section className="pt-12 flex flex-col items-center gap-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-[400px] py-5 bg-primary text-on-primary rounded-xl font-playfair text-xl shadow-lg shadow-primary/20 hover:bg-primary-container transition-all active:scale-95 disabled:opacity-70 disabled:active:scale-100 uppercase tracking-widest"
              >
                {loading ? "Publishing Creation..." : "Publish to Boutique"}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="font-montserrat text-sm text-on-surface-variant hover:text-primary transition-colors tracking-widest uppercase"
              >
                Cancel & Return
              </button>
            </section>
          </div>
        </form>
      </main>

      {/* Bottom Navigation (Consistent with Stitch Design) */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 bg-surface-container shadow-[0_-4px_24px_rgba(87,0,0,0.08)] rounded-t-2xl md:hidden">
        <button className="flex flex-col items-center text-on-surface-variant opacity-60">
          <span className="material-symbols-outlined">storefront</span>
          <span className="text-[10px] font-semibold uppercase tracking-tighter">Atelier</span>
        </button>
        <button className="flex flex-col items-center text-primary">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add_circle</span>
          <span className="text-[10px] font-semibold uppercase tracking-tighter">Creation</span>
        </button>
        <button className="flex flex-col items-center text-on-surface-variant opacity-60">
          <span className="material-symbols-outlined">inventory_2</span>
          <span className="text-[10px] font-semibold uppercase tracking-tighter">Inventory</span>
        </button>
        <button className="flex flex-col items-center text-on-surface-variant opacity-60">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-semibold uppercase tracking-tighter">Profile</span>
        </button>
      </nav>
    </div>
  );
};

export default CreateProduct;
