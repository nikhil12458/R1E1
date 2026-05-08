import { useState } from "react";
import { useAuth } from "../hook/useAuth";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const [values, setValues] = useState({ identity: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.identity || !values.password) {
      return setErrors({
        identity: !values.identity ? "Required" : "",
        password: !values.password ? "Required" : "",
      });
    }

    setLoading(true);
    try {
      // Determine if identity is an email or contact
      const isEmail = values.identity.includes("@");
      const loginData = {
        password: values.password,
        [isEmail ? "email" : "contact"]: values.identity,
      };

      await handleLogin(loginData);
      navigate("/");
    } catch (err) {
      setErrors({ global: err?.response?.data?.message || "Login failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface font-body-md text-on-surface selection:bg-primary selection:text-on-primary">
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

      <div className="flex h-screen w-full overflow-hidden">
        {/* Left Side: Hero Image Section */}
        <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-primary">
          <img
            alt="Graceful Indian woman in traditional attire"
            className="absolute inset-0 w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCz_2bqO_ydjXNdN7R4sGuM60PA6eHEN4w72CpY5MVA_IUNX09rg80a003qveLhAzHyJPZX4fczLJ1shpt8x2tX0_wsMfyAxGPXdYrKZ6pIMAFYqpU7jBB5RvfB_v7dM9dvFmIWSCJwLeQ2c0Ybi37-y1lyCqcj8dDf4FcET6bTkLvObjCPztYNe_4zDmVJhZ_EN3OnZy-s_gfpsNpJfuryzFPzqfC0gi8nsWCYNlQQlLS12cWcW6Ls9K3Cb2htKx0y12Nkc8eIwjL8"
          />
          <div className="absolute top-10 left-10 z-10">
            <span className="text-headline-lg font-headline-lg italic text-white drop-shadow-md">
              Vastraa
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
        </div>

        {/* Right Side: Login Form Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-surface relative px-6 md:px-12 lg:px-24 overflow-y-auto">
          <div className="w-full max-w-md z-10 flex flex-col items-center py-12 md:py-20">
            
            <div className="lg:hidden mb-12">
              <span className="text-3xl font-playfair italic text-primary tracking-widest">Vastraa</span>
            </div>

            <div className="w-full text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-playfair text-primary mb-4 font-medium tracking-tight">Welcome Back</h1>
              <div className="w-8 h-[1px] bg-primary/30 mx-auto mb-4"></div>
              <p className="text-body-md text-on-surface-variant font-light tracking-wide italic">
                Step back into the world of heritage textiles.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full space-y-12">
              <div className="relative group">
                <label
                  className="text-[10px] text-on-surface-variant uppercase tracking-[0.3em] block mb-2 font-medium opacity-70 group-focus-within:opacity-100 group-focus-within:text-primary transition-all"
                  htmlFor="identity"
                >
                  Account Identity
                </label>
                <div className="flex items-center border-b border-outline-variant/40 py-1 transition-all group-focus-within:border-primary">
                  <input
                    className="w-full bg-transparent border-none p-0 text-body-md text-on-surface font-light placeholder:text-on-surface-variant/20 focus:ring-0 outline-none"
                    id="identity"
                    name="identity"
                    placeholder="Email or Phone Number"
                    type="text"
                    value={values.identity}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  <span className="material-symbols-outlined text-outline-variant/50 text-xl font-light group-focus-within:text-primary transition-colors">
                    alternate_email
                  </span>
                </div>
                {errors.identity && (
                  <p className="text-[10px] text-error mt-2 font-medium uppercase tracking-wider">
                    {errors.identity}
                  </p>
                )}
              </div>

              <div className="relative group">
                <div className="flex justify-between items-center mb-2">
                  <label
                    className="text-[10px] text-on-surface-variant uppercase tracking-[0.3em] font-medium opacity-70 group-focus-within:opacity-100 group-focus-within:text-primary transition-all"
                    htmlFor="password"
                  >
                    Security Key
                  </label>
                  <a
                    className="text-[10px] text-primary/60 hover:text-primary uppercase tracking-widest font-medium transition-colors"
                    href="#"
                  >
                    Recovery?
                  </a>
                </div>
                <div className="flex items-center border-b border-outline-variant/40 py-1 transition-all group-focus-within:border-primary">
                  <input
                    className="w-full bg-transparent border-none p-0 text-body-md text-on-surface font-light placeholder:text-on-surface-variant/20 focus:ring-0 outline-none"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  <span className="material-symbols-outlined text-outline-variant/50 text-xl font-light group-focus-within:text-primary transition-colors">
                    lock
                  </span>
                </div>
                {errors.password && (
                  <p className="text-[10px] text-error mt-2 font-medium uppercase tracking-wider">
                    {errors.password}
                  </p>
                )}
              </div>

              {errors.global && (
                <div className="text-[11px] text-error bg-error/5 p-3 rounded border border-error/10 text-center uppercase tracking-widest font-medium">
                  {errors.global}
                </div>
              )}

              <div className="pt-4">
                <button
                  className="w-full bg-primary text-on-primary py-4 rounded shadow-sm hover:shadow-md hover:bg-primary-container transition-all active:scale-[0.99] font-playfair text-lg tracking-widest disabled:opacity-50"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "AUTHENTICATING..." : "SIGN IN"}
                </button>
              </div>

              <div className="text-center pt-8 border-t border-outline-variant/20">
                <p className="text-sm text-on-surface-variant font-light tracking-wide">
                  New to Vastraa?
                  <Link
                    className="text-primary font-medium hover:tracking-widest transition-all ml-2"
                    to="/register"
                  >
                    CREATE ACCOUNT
                  </Link>
                </p>
              </div>
            </form>

            <div className="mt-20 text-center opacity-30 select-none">
              <p className="text-[10px] tracking-[0.5em] font-light text-on-surface uppercase mb-2">Heritage Handloom</p>
              <div className="flex justify-center items-center space-x-2">
                <span className="w-4 h-[0.5px] bg-on-surface"></span>
                <span className="material-symbols-outlined text-sm">filter_vintage</span>
                <span className="w-4 h-[0.5px] bg-on-surface"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Motifs */}
      <div className="fixed bottom-0 left-0 w-full flex justify-center pointer-events-none mb-[-20px] opacity-5">
        <div className="flex space-x-8 md:space-x-12">
          <span className="material-symbols-outlined text-[60px] md:text-[80px] text-tertiary">
            grid_view
          </span>
          <span className="material-symbols-outlined text-[60px] md:text-[80px] text-tertiary">
            local_florist
          </span>
          <span className="material-symbols-outlined text-[60px] md:text-[80px] text-tertiary">
            grid_view
          </span>
          <span className="material-symbols-outlined text-[60px] md:text-[80px] text-tertiary">
            local_florist
          </span>
          <span className="material-symbols-outlined text-[60px] md:text-[80px] text-tertiary">
            grid_view
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
