import { useNavigate, useParams } from "react-router";
import { useProduct } from "../hook/useProduct";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProductDetail = () => {
  const { handleGetProductById } = useProduct();
  const { productId } = useParams();
  const product = useSelector((state) => state.product.selectedProduct);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await handleGetProductById(productId);
        if (data && data.images?.length > 0) {
          setActiveImage(data.images[0].url);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fff8f6] flex justify-center items-center font-playfair text-[#570000] text-2xl animate-pulse">
        Unveiling Craft...
      </div>
    );
  }

  if (!product) return null;

  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
    if (variant.images?.length > 0) {
      setActiveImage(variant.images[0].url);
    }
  };

  // Combine all images for the navigator
  const allImages = [
    ...(product.images || []).map(img => img.url),
    ...(product.variants || []).flatMap(v => (v.images || []).map(img => img.url))
  ];
  
  // Filter unique images
  const uniqueImages = Array.from(new Set(allImages));

  const handleNavigate = (direction) => {
    const currentIndex = uniqueImages.indexOf(activeImage);
    let nextIndex;
    if (direction === "next") {
      nextIndex = (currentIndex + 1) % uniqueImages.length;
    } else {
      nextIndex = (currentIndex - 1 + uniqueImages.length) % uniqueImages.length;
    }
    setActiveImage(uniqueImages[nextIndex]);
  };

  return (
    <div className="min-h-screen bg-[#fff8f6] font-montserrat text-[#261816]">
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

      <main className="max-w-7xl mx-auto px-6 py-12 lg:py-24">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Side: Image Gallery */}
          <div className="w-full lg:w-3/5 flex flex-col md:flex-row gap-6">
            {/* Vertical Thumbnails (Shifted to Left) */}
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto md:max-h-[600px] no-scrollbar md:w-24 flex-shrink-0 order-first">
              {uniqueImages.map((url, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(url)}
                  className={`flex-shrink-0 w-20 h-28 md:w-full md:h-32 rounded-2xl overflow-hidden border-2 transition-all ${
                    activeImage === url ? "border-[#570000] scale-95" : "border-transparent opacity-60"
                  }`}
                >
                  <img src={url} className="w-full h-full object-cover" alt={`thumb-${idx}`} />
                </button>
              ))}
            </div>

            {/* Main Image Showcase */}
            <div className="relative flex-1 aspect-[4/5] rounded-[2rem] overflow-hidden bg-white shadow-sm border border-[#8e706c]/5 group">
              <img
                src={activeImage || product.images?.[0]?.url}
                className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                alt={product.title}
              />
              
              {/* Navigation Arrows */}
              <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => handleNavigate("prev")}
                  className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#570000] shadow-lg hover:bg-white transition-all active:scale-90"
                >
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button 
                  onClick={() => handleNavigate("next")}
                  className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#570000] shadow-lg hover:bg-white transition-all active:scale-90"
                >
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>

              {/* Progress Indicator */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/20 backdrop-blur-sm px-4 py-1 rounded-full text-[10px] text-white font-bold tracking-widest uppercase">
                {uniqueImages.indexOf(activeImage) + 1} / {uniqueImages.length}
              </div>
            </div>
          </div>

          {/* Right Side: Product Details */}
          <div className="w-full lg:w-2/5 space-y-10">
            <header className="space-y-4">
              <span className="text-[10px] font-bold text-[#566338] uppercase tracking-[0.4em]">
                {product.seller?.businessName || "Artisan Craft"}
              </span>
              <h1 className="text-5xl lg:text-6xl font-playfair text-[#570000] leading-tight">
                {product.title}
              </h1>
              <div className="flex items-center space-x-4">
                <p className="text-2xl font-bold text-[#570000]">
                  {selectedVariant ? selectedVariant.price.currency : product.price.currency}{" "}
                  {selectedVariant ? selectedVariant.price.amount : product.price.amount}
                </p>
                {selectedVariant && (
                   <span className="text-[10px] bg-[#566338]/10 text-[#566338] px-3 py-1 rounded-full font-bold uppercase tracking-widest">
                     In Stock: {selectedVariant.stock}
                   </span>
                )}
              </div>
            </header>

            <div className="space-y-6">
              <h3 className="text-[10px] font-bold text-[#5a413d] uppercase tracking-[0.3em]">The Narrative</h3>
              <p className="text-base font-light text-[#5a413d] leading-relaxed italic">
                {product.description}
              </p>
            </div>

            {/* Variant Selection */}
            <div className="space-y-10">
              <div className="space-y-6">
                <h3 className="text-[10px] font-bold text-[#5a413d] uppercase tracking-[0.3em]">Select Variation</h3>
                <div className="flex flex-wrap gap-4">
                  {product.variants.map((variant) => {
                    const label = Object.entries(variant.attributes)
                      .map(([k, v]) => `${v}`)
                      .join(" / ");
                    
                    const isSelected = selectedVariant?._id === variant._id;

                    return (
                      <button
                        key={variant._id}
                        onClick={() => handleVariantSelect(variant)}
                        className={`px-6 py-3 rounded-full text-xs font-semibold tracking-widest transition-all border ${
                          isSelected
                            ? "bg-[#570000] text-white border-[#570000] shadow-lg shadow-primary/20 scale-105"
                            : "bg-white text-[#5a413d] border-[#8e706c]/20 hover:border-[#570000]"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Add to Cart Section */}
              <div className="pt-8 space-y-6 border-t border-[#8e706c]/10">
                {!selectedVariant && (
                  <p className="text-[10px] text-[#ba1a1a] font-bold uppercase tracking-widest flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">info</span>
                    Please select a variation to add to your collection
                  </p>
                )}
                
                <div className="flex items-center gap-3">
                  <button
                    disabled={!selectedVariant}
                    className="flex-[2] h-14 bg-[#570000] text-white rounded-full font-montserrat text-[10px] font-bold tracking-[0.2em] hover:bg-[#800000] transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-20 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-primary/20 flex items-center justify-center gap-3"
                  >
                    <span className="material-symbols-outlined text-xl">shopping_bag</span>
                    ADD TO CART
                  </button>
                  <button 
                    disabled={!selectedVariant}
                    onClick={() => {
                      if (selectedVariant?.images?.[0]?.url) {
                        navigate("/ai-tryon", { 
                          state: { 
                            garmentUrl: selectedVariant.images[0].url 
                          } 
                        });
                      }
                    }}
                    className="flex-[2] h-14 border border-[#570000] text-[#570000] rounded-full font-montserrat text-[10px] font-bold tracking-[0.2em] hover:bg-[#570000] hover:text-white transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-20 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
                  >
                    <span className="material-symbols-outlined text-xl">flare</span>
                    VIRTUAL TRY-ON
                  </button>
                  <button className="flex-shrink-0 w-14 h-14 rounded-full border border-[#8e706c]/20 flex items-center justify-center text-[#570000] hover:bg-[#570000] hover:text-white transition-all active:scale-90 shadow-sm">
                    <span className="material-symbols-outlined">favorite</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="flex items-center gap-3 text-[10px] text-[#5a413d] font-bold uppercase tracking-widest">
                    <span className="material-symbols-outlined text-[#c7a15a]">workspace_premium</span>
                    Authentic Heritage
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-[#5a413d] font-bold uppercase tracking-widest">
                    <span className="material-symbols-outlined text-[#c7a15a]">eco</span>
                    Sustainable Loom
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Artisan Details Overlay (Optional) */}
      <footer className="bg-[#ffe9e6]/50 py-12 border-t border-[#8e706c]/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-full bg-[#570000] flex items-center justify-center text-white font-playfair">V</div>
             <div>
               <p className="text-[10px] font-bold text-[#566338] uppercase tracking-widest">Crafted By</p>
               <p className="text-sm font-playfair text-[#570000]">Vastraa Heritage Atelier</p>
             </div>
           </div>
           <div className="flex gap-10">
              <div className="text-center">
                <p className="text-[10px] font-bold text-[#5a413d] uppercase tracking-widest opacity-60">Ships In</p>
                <p className="text-xs font-semibold">5-7 Working Days</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-bold text-[#5a413d] uppercase tracking-widest opacity-60">Returns</p>
                <p className="text-xs font-semibold">10 Day Policy</p>
              </div>
           </div>
        </div>
      </footer>
      {/* Custom Styles */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 60s linear infinite;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default ProductDetail;
