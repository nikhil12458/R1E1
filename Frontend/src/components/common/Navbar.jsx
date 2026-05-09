import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  return (
    <nav className="w-full bg-[#fff8f6]/80 backdrop-blur-md sticky top-0 z-50 border-b border-[#8e706c]/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand Identity - Left */}
        <div 
          onClick={() => navigate("/")} 
          className="cursor-pointer"
        >
          <h1 className="text-2xl font-playfair font-bold text-[#570000] tracking-[0.2em] uppercase">
            Vastraa
          </h1>
          <p className="text-[8px] font-bold text-[#566338] uppercase tracking-[0.3em] -mt-1 ml-1">
            Heritage Atelier
          </p>
        </div>

        {/* User Info & Cart - Right */}
        <div className="flex items-center space-x-8">
          {user && (
            <div className="hidden md:flex flex-col items-end border-r border-[#8e706c]/20 pr-8">
              <span className="text-[10px] font-bold text-[#566338] uppercase tracking-widest opacity-60">
                Welcome
              </span>
              <span className="text-xs font-playfair text-[#570000] font-bold">
                {user.businessName || user.fullName || "Artisan"}
              </span>
            </div>
          )}

          <div className="flex items-center space-x-6">
            <div className="relative group cursor-pointer">
              <span className="material-symbols-outlined text-[#570000] text-2xl group-hover:scale-110 transition-transform">
                shopping_bag
              </span>
              <span className="absolute -top-2 -right-2 bg-[#570000] text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                0
              </span>
            </div>
            
            <button 
              onClick={() => navigate(user?.role === "seller" ? "/seller/dashboard" : "/login")}
              className="flex items-center space-x-2 group"
            >
              <span className="material-symbols-outlined text-[#570000] text-2xl group-hover:scale-110 transition-transform">
                person
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
