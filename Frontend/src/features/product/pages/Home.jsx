import { useEffect, useState } from "react";
import { useProduct } from "../hook/useProduct";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  const { handleGetAllProducts } = useProduct();
  const products = useSelector((state) => state.product.products);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await handleGetAllProducts();
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fff8f6] flex justify-center items-center font-playfair text-primary text-2xl animate-pulse">
        Unfolding Heritage...
      </div>
    );
  }

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


      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1589363423719-7561f22e707e?q=80&w=2000&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-80"
            alt="Handloom Texture"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fff8f6] via-transparent to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="max-w-2xl space-y-8 animate-in fade-in slide-in-from-left-10 duration-1000">
            <span className="text-[10px] font-bold text-[#566338] uppercase tracking-[0.4em]">Handcrafted in India</span>
            <h2 className="text-6xl md:text-8xl font-playfair text-[#570000] leading-[1.1]">
              Heritage <br />
              <span className="italic">Reimagined</span>
            </h2>
            <p className="text-lg font-light text-[#5a413d] leading-relaxed italic">
              Celebrating the slow-fashion movement through the <br />
              artisanal imperfections of handloom and block printing.
            </p>
            <button className="bg-[#570000] text-white px-10 py-5 rounded-full font-playfair text-lg tracking-widest hover:bg-[#800000] transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-primary/20">
              DISCOVER CRAFT
            </button>
          </div>
        </div>
      </section>

      {/* Collection Grid */}
      <main className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
            <span className="text-[10px] font-bold text-[#566338] uppercase tracking-[0.4em]">The Atelier</span>
            <h3 className="text-4xl font-playfair text-[#570000]">Curated Creations</h3>
          </div>
          <div className="flex space-x-4">
            <button className="text-[10px] font-bold uppercase tracking-widest text-[#570000] border-b border-[#570000] pb-1">All Pieces</button>
            <button className="text-[10px] font-bold uppercase tracking-widest text-[#5a413d] hover:text-[#570000] transition-colors pb-1">Silk</button>
            <button className="text-[10px] font-bold uppercase tracking-widest text-[#5a413d] hover:text-[#570000] transition-colors pb-1">Cotton</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {products.map((product) => (
            <div 
              key={product._id} 
              className="group cursor-pointer"
              onClick={() => navigate(`/product/${product._id}/detail`)}
            >
              <div className="aspect-[3/4] rounded-3xl overflow-hidden mb-6 relative shadow-sm hover:shadow-2xl transition-all duration-700">
                <img 
                  src={product.images?.[0]?.url || "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=800&auto=format&fit=crop"} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  alt={product.title}
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-6 left-6 right-6 translate-y-18 group-hover:translate-y-0 transition-transform duration-500">
                  <button className="w-full bg-white/90 backdrop-blur-md text-[#570000] py-3 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                    View Details
                  </button>
                </div>
              </div>
              <div className="space-y-2 px-2">
                <h4 className="font-playfair text-xl text-[#261816] group-hover:text-[#570000] transition-colors">
                  {product.title}
                </h4>
                <div className="flex justify-between items-center">
                  <p className="text-[10px] text-[#566338] font-bold uppercase tracking-widest">
                    {product.seller?.businessName || "Artisan Craft"}
                  </p>
                  <p className="text-sm font-bold text-[#570000]">
                    {product.price.currency} {product.price.amount}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Artisan Mission Section */}
      <section className="bg-[#ffe9e6] py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div className="w-full lg:w-1/2 relative">
            <div className="aspect-square rounded-full overflow-hidden border-8 border-white/40 shadow-2xl animate-spin-slow">
              <img 
                src="https://images.unsplash.com/photo-1724139139873-57572c120322?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                className="w-full h-full object-cover"
                alt="Lady wearing artisanal suit"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-white p-10 rounded-3xl shadow-xl max-w-[250px] hidden md:block">
              <span className="material-symbols-outlined text-[#c7a15a] text-4xl mb-4">star_rate</span>
              <p className="text-xs italic leading-relaxed text-[#5a413d]">
                "Every thread tells a story of generations, woven with patience and pride."
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 space-y-10">
            <span className="text-[10px] font-bold text-[#566338] uppercase tracking-[0.4em]">Our Philosophy</span>
            <h3 className="text-5xl md:text-6xl font-playfair text-[#570000] leading-tight">
              Honoring the <br />
              <span className="italic text-[#c7a15a]">Slow Loom</span>
            </h3>
            <p className="text-lg font-light text-[#5a413d] leading-relaxed">
              Vastraa is more than a boutique; it's a digital heirloom. We connect the world directly to Indian artisans, bypassing industrial noise to bring you hand-crafted textiles that age with grace.
            </p>
            <div className="flex space-x-12 pt-4">
              <div className="text-center">
                <h5 className="text-3xl font-playfair text-[#570000]">500+</h5>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#566338]">Master Weavers</p>
              </div>
              <div className="text-center">
                <h5 className="text-3xl font-playfair text-[#570000]">20+</h5>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#566338]">Heritage Clusters</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#261816] text-[#fff8f6] py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="space-y-8 col-span-1 md:col-span-1">
            <h1 className="text-2xl font-playfair font-bold tracking-[0.2em] uppercase">
              Vastraa
            </h1>
            <p className="text-xs font-light leading-relaxed opacity-60">
              Preserving the artisanal heritage of Indian textiles through digital excellence.
            </p>
          </div>
          <div className="space-y-6">
            <h6 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c7a15a]">Shop</h6>
            <ul className="space-y-3 text-xs font-light opacity-80">
              <li><a href="#" className="hover:text-white">Silk Sarees</a></li>
              <li><a href="#" className="hover:text-white">Cotton Handlooms</a></li>
              <li><a href="#" className="hover:text-white">Block Prints</a></li>
              <li><a href="#" className="hover:text-white">Exclusives</a></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h6 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c7a15a]">Heritage</h6>
            <ul className="space-y-3 text-xs font-light opacity-80">
              <li><a href="#" className="hover:text-white">Our Story</a></li>
              <li><a href="#" className="hover:text-white">Artisan Network</a></li>
              <li><a href="#" className="hover:text-white">Sustainable Loom</a></li>
            </ul>
          </div>
          <div className="space-y-8">
            <h6 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c7a15a]">Newsletter</h6>
            <div className="relative">
              <input 
                placeholder="Enter email for craft updates"
                className="w-full bg-transparent border-b border-white/20 py-2 text-xs outline-none focus:border-[#c7a15a] transition-colors"
              />
              <button className="absolute right-0 bottom-2 text-xs font-bold uppercase tracking-widest text-[#c7a15a]">Join</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] opacity-40 uppercase tracking-widest">© 2026 Vastraa Heritage. All rights reserved.</p>
          <div className="flex space-x-8 opacity-40">
            <span className="text-[10px] uppercase tracking-widest cursor-pointer hover:opacity-100">Instagram</span>
            <span className="text-[10px] uppercase tracking-widest cursor-pointer hover:opacity-100">Pinterest</span>
          </div>
        </div>
      </footer>

      {/* Custom Styles for Slow Spin */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 60s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;
