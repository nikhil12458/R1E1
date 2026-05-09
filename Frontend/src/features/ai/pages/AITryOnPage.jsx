import { useState, useEffect } from "react";
import { useAITryOn } from "../hook/useAITryOn";
import { useLocation } from "react-router";

export default function AITryOnPage() {
  const location = useLocation();
  const [person, setPerson] = useState(null);
  const [garment, setGarment] = useState(null);
  const [personPreview, setPersonPreview] = useState(null);
  const [garmentPreview, setGarmentPreview] = useState(null);

  const { loading, generatedImage, handleGenerate } = useAITryOn();

  useEffect(() => {
    const prefillGarment = async () => {
      if (location.state?.garmentUrl) {
        setGarmentPreview(location.state.garmentUrl);
        try {
          const response = await fetch(location.state.garmentUrl);
          const blob = await response.blob();
          const file = new File([blob], "garment.jpg", { type: blob.type });
          setGarment(file);
        } catch (error) {
          console.error("Failed to prefill garment:", error);
        }
      }
    };
    prefillGarment();
  }, [location.state]);

  const handlePersonChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPerson(file);
      setPersonPreview(URL.createObjectURL(file));
    }
  };

  const handleGarmentChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGarment(file);
      setGarmentPreview(URL.createObjectURL(file));
    }
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
        {/* Header Section */}
        <header className="max-w-3xl mb-20 space-y-6">
          <span className="text-[10px] font-bold text-[#566338] uppercase tracking-[0.4em]">
            Digital Couture
          </span>
          <h1 className="text-5xl lg:text-7xl font-playfair text-[#570000] leading-tight">
            Virtual <span className="italic">Dressing Room</span>
          </h1>
          <p className="text-lg font-light text-[#5a413d] leading-relaxed italic opacity-80">
            Witness the fusion of traditional craft and modern intelligence. 
            Visualize how our artisanal pieces drape upon your silhouette.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Upload Workspace - Left */}
          <div className="lg:col-span-5 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
              
              {/* Person Upload */}
              <div className="space-y-4">
                <label className="text-[10px] text-[#5a413d] uppercase tracking-[0.3em] font-semibold block">
                  Your Portrait
                </label>
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-white border border-dashed border-[#8e706c]/30 hover:border-[#570000] transition-colors group">
                  {personPreview ? (
                    <img src={personPreview} className="w-full h-full object-cover" alt="p" />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-[#8e706c]/60">
                      <span className="material-symbols-outlined text-4xl mb-4">person_search</span>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-center px-6">Upload a clear photo of yourself</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePersonChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  {personPreview && (
                    <div className="absolute top-4 right-4">
                      <button onClick={() => {setPerson(null); setPersonPreview(null)}} className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#570000] shadow-sm">
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Garment Upload */}
              <div className="space-y-4">
                <label className="text-[10px] text-[#5a413d] uppercase tracking-[0.3em] font-semibold block">
                  Artisanal Garment
                </label>
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-white border border-dashed border-[#8e706c]/30 hover:border-[#570000] transition-colors group">
                  {garmentPreview ? (
                    <img src={garmentPreview} className="w-full h-full object-cover" alt="g" />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-[#8e706c]/60">
                      <span className="material-symbols-outlined text-4xl mb-4">apparel</span>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-center px-6">Upload the garment to try on</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleGarmentChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  {garmentPreview && (
                    <div className="absolute top-4 right-4">
                      <button onClick={() => {setGarment(null); setGarmentPreview(null)}} className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#570000] shadow-sm">
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button
              disabled={!person || !garment || loading}
              onClick={() => handleGenerate({ person, garment })}
              className="w-full bg-[#570000] text-white py-6 rounded-full font-playfair text-xl tracking-widest hover:bg-[#800000] transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-20 disabled:grayscale shadow-2xl shadow-primary/30 flex items-center justify-center gap-4"
            >
              <span className="material-symbols-outlined">auto_fix_high</span>
              {loading ? "GENERATING STYLE..." : "GENERATE PREVIEW"}
            </button>
          </div>

          {/* Results Showcase - Right */}
          <div className="lg:col-span-7 h-full">
            <div className="h-full space-y-6">
               <label className="text-[10px] text-[#5a413d] uppercase tracking-[0.3em] font-semibold block">
                The Resulting Vision
              </label>
              <div className="relative h-full min-h-[600px] lg:min-h-full aspect-[3/4] lg:aspect-auto rounded-[3rem] overflow-hidden bg-[#ffe9e6]/50 border border-[#8e706c]/10 flex items-center justify-center">
                {generatedImage ? (
                  <div className="w-full h-full animate-in fade-in zoom-in duration-1000">
                    <img src={generatedImage} className="w-full h-full object-contain p-8" alt="Generated" />
                    <div className="absolute bottom-10 left-10 right-10 flex justify-between items-center">
                       <button className="bg-white/80 backdrop-blur-md px-8 py-3 rounded-full text-[10px] font-bold text-[#570000] uppercase tracking-widest shadow-lg flex items-center gap-2">
                         <span className="material-symbols-outlined text-sm">download</span>
                         Save Vision
                       </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-6 max-w-xs px-10">
                    {loading ? (
                       <div className="space-y-8 flex flex-col items-center">
                         <div className="w-20 h-20 border-4 border-t-[#570000] border-[#8e706c]/10 rounded-full animate-spin"></div>
                         <p className="text-sm font-playfair italic text-[#570000] animate-pulse">Our AI atelier is weaving your visualization...</p>
                       </div>
                    ) : (
                      <div className="space-y-4 opacity-40">
                        <span className="material-symbols-outlined text-6xl text-[#570000]">flare</span>
                        <p className="text-xs font-light text-[#5a413d] italic">Your transformation will manifest here after generation.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
