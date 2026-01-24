import { thumbnailStyles, type ThumbnailStyle } from "../assets/assets";
import { Cpu, Image, PenTool, Square, Sparkles, ChevronDown } from "lucide-react";

const StyleSelector = ({
  value, 
  onChange, 
  isOpen, 
  setIsOpen
}: {
  value: ThumbnailStyle; 
  onChange: (style: ThumbnailStyle) => void; 
  isOpen: boolean; 
  setIsOpen: (open: boolean) => void
}) => {
  const styleDescriptions: Record<ThumbnailStyle, string> = {
    "Abstract": "Non-representational designs focusing on shapes, colors, and textures to evoke emotions.",
    "Bold & Graphic": "Vibrant colors, strong contrasts, and clear typography to grab attention.",
    "Minimalist": "Clean design with ample white space, simple shapes, and limited color palettes.",
    "Photorealistic": "High-quality images that look like real photographs, with attention to detail and lighting.",
    "Cartoonish": "Playful and exaggerated designs with bold outlines and bright colors.",
  };

  const styleIcons: Record<ThumbnailStyle, React.ReactNode> = {
    "Abstract": <Cpu className="h-4 w-4"/>,
    "Bold & Graphic": <Sparkles className="h-4 w-4"/>,
    "Minimalist": <Square className="h-4 w-4"/>,
    "Photorealistic": <Image className="h-4 w-4"/>,
    "Cartoonish": <PenTool className="h-4 w-4"/>,
  };

  return (
    <div className="relative space-y-3 dark">
      <label className="block text-sm font-medium text-zinc-200">Style</label>
      
      {/* Dropdown trigger button */}
      <button
        type="button" 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex w-full items-center justify-between rounded-md border px-4 py-3 text-left transition bg-white/8 border-white/10 text-zinc-200 hover:bg-white/12"
      >
        <div className="flex items-center gap-2 font-medium">
          {styleIcons[value]}
          <span>{value}</span>
        </div>
        <ChevronDown 
          className={`h-5 w-5 text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-white/12 bg-black/20 backdrop-blur-3xl shadow-lg">
          {thumbnailStyles.map((style) => (
            <button
              key={style}
              type="button"
              onClick={() => {
                onChange(style);
                setIsOpen(false);
              }}
              className={`flex w-full items-start gap-3 px-4 py-3 text-left transition hover:bg-black/30 first:rounded-t-md last:rounded-b-md ${
                value === style ? 'bg-white/10' : ''
              }`}
            >
              <div className="mt-0.5">{styleIcons[style]}</div>
              <div className="flex-1">
                <p className="font-medium text-zinc-200">{style}</p>
                <p className="text-xs text-zinc-400">{styleDescriptions[style]}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StyleSelector;