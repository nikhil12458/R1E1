import { useState } from "react";
import { useAuth } from "../hook/useAuth";
import { Link, useNavigate } from "react-router";

const FIELDS = [
  { id: "fullname", label: "Full Name", type: "text", placeholder: "e.g. Anjali Desai", icon: "person" },
  { id: "email", label: "Email Address", type: "email", placeholder: "anjali@example.com", icon: "mail" },
  { id: "contact", label: "Phone Number", type: "tel", placeholder: "+91 98765 43210", icon: "call" },
  { id: "password", label: "Password", type: "password", placeholder: "••••••••", icon: "lock" },
];

const Register = () => {
  const { handleRegister } = useAuth();
  const navigate = useNavigate();

  const [values, setValues] = useState({ fullname: "", email: "", contact: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = (vals) => {
    const errs = {};
    if (!vals.fullname.trim()) errs.fullname = "Required";
    if (!vals.email.includes("@")) errs.email = "Invalid email";
    if (!vals.contact.trim()) errs.contact = "Required";
    if (vals.password.length < 8) errs.password = "Min 8 chars";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(values);
    if (Object.keys(errs).length > 0) return setErrors(errs);
    
    setLoading(true);
    try {
      await handleRegister(values);
      navigate("/");
    } catch (err) {
      setErrors({ global: err?.response?.data?.message || "Registration failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface font-montserrat flex relative">
      {/* Google Fonts & Material Symbols */}
      <link href="https://fonts.googleapis.com" rel="preconnect"/>
      <link crossOrigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500&family=Playfair+Display:wght@400;500;600&display=swap" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>

      {/* Left Side: Sticky Image (Hidden on mobile) */}
      <div className="hidden lg:block w-1/2 h-screen sticky top-0 overflow-hidden shadow-[4px_0_24px_rgba(87,0,0,0.05)] z-10">
        <img 
          alt="Vastraa Heritage Wear" 
          className="absolute inset-0 w-full h-full object-cover object-top"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA15PaOB33ZZq25BQffFsdKoEFaTRRPQ7dtRxC9nGiwxEfoM_jt0JmcmRxNAw4NrsMpFhOxe2PM7Bnj6uS7OagjVW_-y4ZsTRLuoFqO69MFVM4eC60TwpsOaQ7fgvlXV2TMhkX64kxYsyXXip8BdUHX93A9amsG0oqZToMRg0Z5ifvPI0Fvg5rby67dYzhkIHMo126IEGDO3wslnx1E7bfjkvuf6_cwXbHKXpT3G92c3SFe_0CkZD7ZfM4IDie27VgH3zw8dRBM0pRi"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface/20 via-transparent to-transparent"></div>
      </div>

      {/* Right Side: Form Content */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-4 py-8 md:px-12 lg:px-24 bg-transparent z-20 overflow-y-auto">
        
        {/* Mobile Header (Only visible when side image is hidden) */}
        <div className="lg:hidden mb-8 text-center">
          <h2 className="text-2xl font-playfair text-primary tracking-widest font-semibold">VASTRAA</h2>
          <div className="w-12 h-[1px] bg-outline-variant mx-auto mt-2 opacity-60"></div>
        </div>

        <div className="w-full max-w-lg bg-[#fffcfb] border border-outline-variant/30 md:border-outline-variant/40 rounded-2xl p-6 md:p-10 lg:p-14 shadow-sm md:shadow-[inset_0_0_40px_rgba(142,112,108,0.03),0_8px_32px_rgba(87,0,0,0.03)]">
          
          {/* Form Header */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-display-lg font-playfair text-primary mb-3 md:mb-4 font-normal tracking-[0.05em]">Begin</h1>
            <p className="text-sm md:text-body-md text-on-surface-variant font-light tracking-wide px-4">Your journey into heritage textiles.</p>
          </div>

          {/* Decorative Divider */}
          <div className="hidden md:flex justify-center mb-10 md:mb-12 opacity-60 text-outline">
            <svg fill="none" height="16" viewBox="0 0 120 16" width="120" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 8 L55 8 M65 8 L110 8" stroke="currentColor" strokeWidth="0.5"></path>
              <path d="M60 4 L64 8 L60 12 L56 8 Z" fill="currentColor"></path>
            </svg>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-8 md:space-y-10 w-full">
            {FIELDS.map(field => (
              <div key={field.id} className="relative group">
                <label className="text-[10px] md:text-sm text-on-surface-variant mb-1.5 md:mb-2 block font-light tracking-[0.2em] transition-colors group-focus-within:text-primary">
                  {field.label.toUpperCase()}
                </label>
                <div className="flex items-center border-b border-outline-variant/60 pb-1.5 md:pb-2 group-focus-within:border-primary transition-colors">
                  <span className="material-symbols-outlined text-outline-variant/70 mr-3 md:mr-4 group-focus-within:text-primary font-light text-xl md:text-2xl transition-colors">
                    {field.icon}
                  </span>
                  <input
                    type={field.type}
                    name={field.id}
                    placeholder={field.placeholder}
                    className="w-full bg-transparent border-none p-0 text-sm md:text-body-md text-on-surface font-light placeholder:text-outline/30 focus:ring-0 outline-none"
                    value={values[field.id]}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
                {errors[field.id] && (
                  <span className="text-[10px] text-error absolute mt-1 font-medium">
                    {errors[field.id]}
                  </span>
                )}
              </div>
            ))}

            <div className="pt-6 md:pt-8">
              <button 
                type="submit" 
                className="w-full bg-primary/95 text-on-primary py-3.5 md:py-4 px-8 rounded-lg text-sm md:text-body-md font-light tracking-widest hover:bg-primary transition-all duration-300 flex items-center justify-center shadow-sm active:scale-[0.98] disabled:opacity-70"
                disabled={loading}
              >
                {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
              </button>
            </div>

            <div className="text-center mt-6 md:mt-8">
              <p className="text-sm md:text-body-md text-on-surface-variant font-light">
                Already have an account? 
                <Link to="/login" className="text-primary font-normal border-b border-outline-variant/50 hover:border-primary pb-0.5 transition-colors ml-1 inline-block">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
