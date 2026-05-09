import { useEffect } from "react";
import { useProduct } from "../hook/useProduct";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router";

const Dashboard = () => {
  const { handleGetSellerProducts, handleDeleteProduct } = useProduct();
  const navigate = useNavigate();
  const products = useSelector((state) => state.product.sellerProducts);
  const user = useSelector((state) => state.auth.user);

  const handleDelete = async (productId) => {
    await handleDeleteProduct(productId);
  };

  useEffect(() => {
    handleGetSellerProducts();
  }, []);

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

      {/* Navigation Header */}
      <header className="w-full bg-surface border-b border-outline-variant/30 sticky top-0 z-50 backdrop-blur-md bg-white/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="material-symbols-outlined text-primary text-2xl">
              dashboard_customize
            </span>
            <h1 className="text-xl md:text-2xl font-playfair font-bold text-primary tracking-widest uppercase">
              Artisan Dashboard
            </h1>
          </div>
          <div className="flex items-center space-x-6">
            <div className="hidden md:block text-right">
              <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest">
                Logged in as
              </p>
              <p className="text-sm font-playfair italic text-primary">
                {user?.fullname || "Artisan"}
              </p>
            </div>
            <button
              onClick={() => navigate("/seller/create-product")}
              className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-playfair text-sm tracking-widest hover:bg-primary-container transition-all flex items-center space-x-2 shadow-md active:scale-95"
            >
              <span className="material-symbols-outlined text-sm">
                add_circle
              </span>
              <span>NEW CREATION</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-12">
        {/* Welcome Section */}
        <section className="relative overflow-hidden rounded-3xl bg-primary-container/10 p-8 md:p-12 border border-primary/5">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <span className="material-symbols-outlined text-[200px] text-primary rotate-12">
              filter_vintage
            </span>
          </div>
          <div className="relative z-10 space-y-4">
            <h2 className="text-4xl md:text-5xl font-playfair text-primary">
              Welcome to your Atelier,{" "}
              <span className="italic">{user?.fullname?.split(" ")[0]}</span>
            </h2>
            <p className="text-on-surface-variant font-light text-lg max-w-2xl leading-relaxed">
              Your digital space to showcase the heritage of your craft. Manage
              your masterpieces, track their journey, and connect with
              collectors of fine textiles.
            </p>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            {
              label: "Total Creations",
              value: products?.length || 0,
              icon: "inventory_2",
              color: "text-primary",
            },
            {
              label: "Active Listings",
              value: products?.length || 0,
              icon: "check_circle",
              color: "text-secondary",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl border border-outline-variant/20 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`material-symbols-outlined ${stat.color} text-3xl opacity-80 group-hover:scale-110 transition-transform`}
                >
                  {stat.icon}
                </span>
                <span className="text-4xl font-playfair text-on-surface">
                  {stat.value}
                </span>
              </div>
              <p className="text-[11px] uppercase tracking-[0.3em] font-semibold text-on-surface-variant">
                {stat.label}
              </p>
            </div>
          ))}
        </section>

        {/* Inventory Section */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-outline-variant/20 pb-6">
            <div className="space-y-2">
              <h3 className="text-3xl font-playfair text-primary">
                Your Masterpieces
              </h3>
              <p className="text-on-surface-variant font-light">
                A curated collection of your heritage textiles.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search collections..."
                  className="bg-white border border-outline-variant/30 rounded-full pl-10 pr-4 py-2 text-sm font-montserrat focus:border-primary focus:ring-0 outline-none w-64 transition-all"
                />
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-sm">
                  search
                </span>
              </div>
              <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">
                filter_list
              </button>
            </div>
          </div>

          {products?.length === 0 ? (
            <div className="py-24 text-center space-y-6 bg-white rounded-3xl border-2 border-dashed border-outline-variant/30">
              <span className="material-symbols-outlined text-primary/20 text-8xl">
                texture
              </span>
              <div className="space-y-2">
                <h4 className="text-2xl font-playfair text-on-surface">
                  No creations found in your atelier
                </h4>
                <p className="text-on-surface-variant font-light">
                  Begin your journey by adding your first heritage piece.
                </p>
              </div>
              <button
                onClick={() => navigate("/seller/create-product")}
                className="bg-primary text-on-primary px-8 py-3 rounded-full font-playfair tracking-widest hover:shadow-lg transition-all active:scale-95"
              >
                CREATE FIRST PRODUCT
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="group bg-white rounded-2xl overflow-hidden border border-outline-variant/10 shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={
                        product.images?.[0]?.url ||
                        "https://images.unsplash.com/photo-1621419777150-136195c807b5?q=80&w=600&auto=format&fit=crop"
                      }
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-primary tracking-widest uppercase shadow-sm">
                      {product.price?.currency}{" "}
                      {product.price?.amount?.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="space-y-1">
                      <p className="text-[10px] text-secondary font-bold uppercase tracking-widest">
                        Heritage Weave
                      </p>
                      <h4 className="text-xl font-playfair text-on-surface group-hover:text-primary transition-colors truncate">
                        {product.title}
                      </h4>
                    </div>
                    <p className="text-on-surface-variant font-light text-sm line-clamp-2 italic leading-relaxed">
                      &quot;{product.description}&quot;
                    </p>
                    <div className="pt-4 flex items-center justify-between border-t border-outline-variant/10">
                      <div className="flex items-center space-x-2 text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">
                        <span className="w-2 h-2 rounded-full bg-secondary"></span>
                        <span>Active listing</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => {
                            navigate(`/seller/product/${product._id}/detail`);
                          }}
                          className="material-symbols-outlined text-outline hover:text-primary transition-colors text-lg"
                        >
                          edit
                        </button>
                        <button
                          onClick={() => {
                            handleDelete(product._id);
                          }}
                          className="material-symbols-outlined text-outline hover:text-error transition-colors text-lg"
                        >
                          delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Decorative Footer motif */}
      <footer className="py-20 flex flex-col items-center opacity-20 select-none">
        <p className="text-[10px] tracking-[0.5em] font-light text-on-surface uppercase mb-4">
          Vastraa Heirloom Traditions
        </p>
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

export default Dashboard;
