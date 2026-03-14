/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

// @ts-ignore
import { GIFEncoder, quantize, applyPalette } from 'gifenc';

export const STYLE_CATEGORIES = {
  "Cinematic & Realistic": [
    "Formed by fluffy white clouds in a deep blue summer sky",
    "Carved into the bark of an ancient mossy oak tree",
    "Sculpted from melting surrealist gold in a desert landscape",
    "Arranged using colorful autumn leaves on wet green grass",
    "Made of sparkling diamonds scattered on black velvet",
    "Written in glowing constellations against a dark nebula galaxy",
    "Reflected in cyberpunk neon puddles on a rainy street",
    "Drawn with latte art foam in a ceramic coffee cup",
    "Glowing as ancient magical runes carved into a dark cave wall",
    "Displayed on a futuristic translucent holographic interface",
    "Etched into frosted glass with a warm, glowing backlight",
    "Formed by morning dew drops on a delicate spider web",
    "Sculpted from hyper-realistic volcanic rock with glowing magma veins",
    "Arranged from scattered polaroid photos on a wooden desk",
    "Written in condensation on a cold, rainy windowpane"
  ],
  "Abstract & Surreal": [
    "Formed by bioluminescent jellyfish in the deep ocean",
    "Composed of vibrant colorful smoke swirling in a dark room",
    "Arranged with intricate mechanical gears and steampunk machinery",
    "Made of floating geometric glass shards reflecting a sunset",
    "Constructed from thousands of tiny glowing fireflies",
    "Woven from shimmering threads of pure starlight",
    "Molded from vibrant, swirling liquid paint in zero gravity",
    "Built from ancient, crumbling stone ruins overgrown with ivy",
    "Formed by a flock of birds flying in perfect synchronization",
    "Created by the negative space of a dense, dark forest",
    "Constructed from impossible Escher-like architectural staircases",
    "Formed by a kaleidoscope of shifting, iridescent butterfly wings",
    "Sculpted from liquid mercury flowing upwards in reverse gravity",
    "Arranged from floating, glowing musical notes in a void",
    "Created by a swarm of microscopic, glowing nanobots"
  ],
  "Sci-Fi & Cyberpunk": [
    "Holographic projection glitching in a dystopian city",
    "Neon signs flickering on a rain-slicked alleyway wall",
    "Circuit board traces glowing with data streams",
    "Metallic chrome lettering reflecting a synthwave sunset",
    "Laser-etched into a dark, matte spaceship hull",
    "Floating data fragments in a virtual reality grid",
    "Bioluminescent alien flora forming words in a dark jungle",
    "Quantum particles assembling and disassembling rapidly",
    "Glowing plasma contained within magnetic fields",
    "Retro-futuristic CRT monitor display with scanlines",
    "Constructed from glowing fiber optic cables in a server room",
    "Formed by a swarm of autonomous, glowing drones",
    "Etched into the glowing visor of a futuristic space helmet",
    "Arranged from floating, glowing hexagonal energy shields",
    "Written in the glowing exhaust trail of a flying car"
  ],
  "Nature & Organic": [
    "Written with smooth river stones in a shallow, clear stream",
    "Formed by a swarm of glowing fireflies in a night forest",
    "Carved into a sandy beach with waves gently washing over",
    "Grown from vibrant, blooming flowers in a spring garden",
    "Shaped by frost crystals forming on a cold winter window",
    "Arranged from fallen pine needles on a forest floor",
    "Written in the stars of a clear, unpolluted night sky",
    "Formed by the shadows of leaves dancing in the sunlight",
    "Sculpted from fresh, powdery snow on a mountain peak",
    "Created by the ripples of water in a calm, dark pond",
    "Woven from intricate, glowing spider webs in a dark cave",
    "Formed by a dense cluster of glowing, bioluminescent mushrooms",
    "Arranged from vibrant, colorful coral reefs underwater",
    "Sculpted from ancient, petrified wood in a desert",
    "Created by the swirling patterns of a massive sandstorm"
  ],
  "Magic & Fantasy": [
    "Glowing runes etched into an ancient, magical sword",
    "Formed by swirling, ethereal mist in a haunted graveyard",
    "Written in the air with sparkling, golden fairy dust",
    "Carved into a glowing, enchanted crystal cavern",
    "Shaped by the flames of a magical, roaring fire",
    "Arranged from glowing, floating magical orbs",
    "Written in the pages of an ancient, glowing spellbook",
    "Formed by the roots of a massive, magical world tree",
    "Sculpted from shimmering, magical ice in a frozen wasteland",
    "Created by the light of a magical, glowing full moon",
    "Woven from the glowing threads of a magical loom",
    "Formed by a swarm of tiny, glowing dragons",
    "Arranged from glowing, magical potions in a wizard's lab",
    "Sculpted from the glowing embers of a dying phoenix",
    "Created by the swirling, colorful magic of a portal"
  ],
  "Industrial & Gritty": [
    "Welded from rusty, scrap metal in an abandoned factory",
    "Spray-painted graffiti on a rough, brick city wall",
    "Carved into a dirty, oil-stained concrete floor",
    "Formed by sparks flying from a grinding wheel",
    "Arranged from heavy, iron chains in a dark dungeon",
    "Written in the dust on a dirty, abandoned warehouse window",
    "Sculpted from rough, jagged rocks in a dark quarry",
    "Created by the shadows of a massive, industrial machine",
    "Formed by the smoke of a massive, industrial smokestack",
    "Written in the grime on a dirty, city subway wall",
    "Constructed from glowing, red-hot rebar in a foundry",
    "Arranged from scattered, rusty nails and screws",
    "Sculpted from cracked, weathered asphalt on a highway",
    "Formed by the glowing embers of a massive coal fire",
    "Written in the grease and oil of a mechanic's garage"
  ],
  "Elegant & Luxury": [
    "Engraved in polished gold on a black marble surface",
    "Formed by sparkling diamonds on a red velvet cushion",
    "Written in elegant calligraphy with shimmering silver ink",
    "Carved into a flawless, clear crystal block",
    "Shaped by the reflections of a crystal chandelier",
    "Arranged from delicate, white pearls on a silk sheet",
    "Written in the frost on a chilled, crystal champagne glass",
    "Formed by the light of a single, elegant candle",
    "Sculpted from smooth, polished ivory",
    "Created by the shadows of a delicate, lace curtain",
    "Woven from shimmering, golden silk threads",
    "Formed by a cascade of sparkling, crystal teardrops",
    "Arranged from delicate, white rose petals on a silver tray",
    "Sculpted from flawless, polished platinum",
    "Created by the reflections of a massive, flawless diamond"
  ],
  "Playful & Colorful": [
    "Formed by colorful, bouncing rubber balls",
    "Written in bright, colorful chalk on a playground asphalt",
    "Arranged from colorful, plastic building blocks",
    "Shaped by colorful, swirling cotton candy",
    "Carved into a massive, colorful birthday cake",
    "Formed by a pile of colorful, assorted candies",
    "Written in the air with colorful, glowing sparklers",
    "Arranged from colorful, floating balloons",
    "Sculpted from bright, colorful modeling clay",
    "Created by the splashes of colorful, vibrant paint",
    "Constructed from colorful, glowing neon tubes",
    "Formed by a swarm of colorful, glowing butterflies",
    "Arranged from colorful, glowing jellybeans",
    "Sculpted from bright, colorful, melting ice cream",
    "Created by the swirling patterns of a colorful kaleidoscope"
  ]
};

export const TYPOGRAPHY_CATEGORIES = {
  "3D & Dimensional": [
    "Bold, dimensional 3D text with realistic lighting and shadows",
    "Chunky, blocky 3D letters with beveled edges",
    "Sleek, metallic 3D text with sharp, angular corners",
    "Soft, inflated 3D balloon letters with glossy reflections",
    "Extruded 3D text with deep, dramatic shadows",
    "Layered 3D text with multiple overlapping elements",
    "Hollow 3D text with glowing interior lights",
    "Shattered 3D text with floating, broken fragments",
    "Twisted, spiraling 3D text with dynamic movement",
    "Floating 3D text casting soft shadows on a background",
    "Wireframe 3D text with glowing intersecting lines",
    "Origami-style folded 3D text with sharp paper creases",
    "Liquid metal 3D text dripping and pooling at the base",
    "Carved 3D text recessed deeply into a solid block",
    "Floating isometric 3D text with a retro-gaming aesthetic"
  ],
  "Neon & Glowing": [
    "Glowing neon tube typography, cyberpunk aesthetic, vibrant bloom",
    "Bright, flickering neon signs with buzzing electrical effects",
    "Soft, glowing text with a subtle, ethereal aura",
    "Intense, laser-etched text with blindingly bright edges",
    "Pulsing, rhythmic glowing text synchronized to a beat",
    "Multi-colored neon text with a retro, synthwave vibe",
    "Subtle, bioluminescent text glowing in the dark",
    "Radioactive, glowing green text with a toxic aura",
    "Ethereal, ghostly text glowing with a pale, blue light",
    "Fiery, glowing text burning with intense heat",
    "Ultraviolet glowing text revealing hidden patterns in the dark",
    "Strobe-lit glowing text flashing rapidly with intense energy",
    "Liquid neon text flowing through transparent glass tubes",
    "Holographic glowing text with chromatic aberration and glitching",
    "Soft pastel glowing text with a dreamy, vaporwave aesthetic"
  ],
  "Elegant & Serif": [
    "Refined, high-contrast serif typography, luxury editorial look",
    "Classic, timeless serif font with delicate, thin strokes",
    "Modern, sophisticated serif font with sharp, clean lines",
    "Ornate, decorative serif font with intricate flourishes",
    "Vintage, distressed serif font with a worn, antique feel",
    "Bold, authoritative serif font with thick, heavy strokes",
    "Elegant, italicized serif font with a graceful, flowing rhythm",
    "Minimalist, understated serif font with a clean, simple look",
    "Dramatic, high-fashion serif font with extreme contrast",
    "Traditional, academic serif font with a scholarly, serious tone",
    "Engraved serif font with intricate filigree details",
    "Chiseled serif font resembling ancient Roman monuments",
    "Delicate, hairline serif font with barely-there strokes",
    "Flamboyant serif font with exaggerated, sweeping swashes",
    "Stenciled serif font with elegant, precise cutouts"
  ],
  "Bold & Sans-Serif": [
    "Massive, heavy sans-serif typography, geometric and impactful",
    "Clean, modern sans-serif font with a minimalist, functional look",
    "Futuristic, technical sans-serif font with sharp, angular lines",
    "Friendly, rounded sans-serif font with a soft, approachable feel",
    "Condensed, tall sans-serif font with a strong, vertical presence",
    "Extended, wide sans-serif font with a bold, horizontal stretch",
    "Distressed, grunge sans-serif font with a rough, urban edge",
    "Sleek, aerodynamic sans-serif font with a fast, dynamic look",
    "Chunky, blocky sans-serif font with a solid, unyielding presence",
    "Elegant, thin sans-serif font with a delicate, refined touch",
    "Industrial stencil sans-serif font with military-style cutouts",
    "Ultra-black sans-serif font with virtually no negative space",
    "Outlined sans-serif font with thick, bold strokes",
    "Slanted, italicized sans-serif font conveying extreme speed",
    "Modular sans-serif font built from distinct geometric shapes"
  ],
  "Handwritten & Script": [
    "Organic, flowing handwritten brush script, artistic and personal",
    "Elegant, formal calligraphy with intricate, sweeping flourishes",
    "Messy, expressive handwriting with a raw, emotional feel",
    "Neat, precise handwriting with a clean, organized look",
    "Playful, bouncy script font with a fun, energetic vibe",
    "Vintage, retro script font with a nostalgic, classic feel",
    "Rough, textured brush script with a bold, artistic stroke",
    "Delicate, thin script font with a fragile, ethereal touch",
    "Bold, marker script font with a strong, confident presence",
    "Whimsical, fairy-tale script font with a magical, enchanting look",
    "Graffiti-style tag script with drips and splatters",
    "Chalkboard script with dusty, textured edges",
    "Elegant copperplate calligraphy with varying stroke thickness",
    "Casual, monoline script resembling quick, everyday notes",
    "Thick, juicy brush pen script with overlapping strokes"
  ],
  "Retro & Vintage": [
    "Chrome-plated, synthwave style typography with horizon lines and sparkles",
    "Vintage, 1970s style typography with groovy, curving lines",
    "Retro, 1950s style diner typography with bright, cheerful colors",
    "Classic, 1920s Art Deco typography with geometric, elegant lines",
    "Distressed, vintage letterpress typography with a worn, textured look",
    "Retro, 8-bit pixel art typography with a nostalgic, arcade feel",
    "Vintage, wild west style typography with decorative, ornate details",
    "Retro, 1980s neon typography with bright, vibrant colors",
    "Classic, Victorian style typography with intricate, elaborate flourishes",
    "Vintage, typewriter style typography with a mechanical, precise look",
    "Psychedelic 1960s typography with melting, distorted letterforms",
    "Retro-futuristic 1990s cyber typography with sharp, jagged edges",
    "Vintage circus poster typography with bold shadows and highlights",
    "Classic mid-century modern typography with clean, atomic-age lines",
    "Distressed, faded vintage travel poster typography"
  ],
  "Material & Texture": [
    "Fluid, melting chrome typography, surreal and reflective",
    "Rough, carved stone typography with deep, textured grooves",
    "Smooth, polished wood typography with a natural, warm grain",
    "Cold, brushed steel typography with a sleek, industrial look",
    "Soft, plush fabric typography with a warm, comforting feel",
    "Shattered, broken glass typography with sharp, jagged edges",
    "Liquid, flowing water typography with a dynamic, fluid motion",
    "Burning, fiery typography with intense, flickering flames",
    "Frozen, icy typography with a cold, crystalline structure",
    "Earthy, muddy typography with a raw, natural texture",
    "Cracked, dry desert earth typography with deep fissures",
    "Shimmering, iridescent pearl typography with a soft glow",
    "Rough, rusted iron typography with flaking, orange oxidation",
    "Translucent, gummy candy typography with a squishy appearance",
    "Coarse, woven burlap typography with frayed, loose threads"
  ],
  "Organic & Nature": [
    "Typography intertwined with vines, flowers, and organic nature elements",
    "Typography formed by a dense, tangled thicket of branches",
    "Typography shaped by the flowing, organic curves of a river",
    "Typography carved into the side of a massive, ancient mountain",
    "Typography formed by a flock of birds flying in perfect formation",
    "Typography grown from a vibrant, blooming coral reef",
    "Typography shaped by the swirling, organic patterns of a galaxy",
    "Typography formed by a swarm of glowing, bioluminescent insects",
    "Typography carved into the bark of a massive, ancient tree",
    "Typography formed by the shifting, organic patterns of sand dunes",
    "Typography constructed from delicate, overlapping butterfly wings",
    "Typography formed by the intricate veins of a large, green leaf",
    "Typography shaped by the swirling, chaotic motion of a tornado",
    "Typography grown from a cluster of sharp, glowing crystals",
    "Typography formed by the delicate, fractal patterns of a snowflake"
  ]
};

export const getRandomStyle = (): string => {
  const categories = Object.values(STYLE_CATEGORIES);
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  return randomCategory[Math.floor(Math.random() * randomCategory.length)];
};

export const cleanBase64 = (data: string): string => {
  // Remove data URL prefix if present to get raw base64
  // Handles generic data:application/octet-stream;base64, patterns too
  return data.replace(/^data:.*,/, '');
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const createGifFromVideo = async (videoUrl: string): Promise<Blob> => {
  // Runtime check just in case, though standard imports should throw earlier if failed
  if (typeof GIFEncoder !== 'function') {
    throw new Error("GIF library failed to load correctly. Please refresh the page.");
  }

  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.crossOrigin = "anonymous";
    video.src = videoUrl;
    video.muted = true;
    
    video.onloadedmetadata = async () => {
      try {
        const duration = video.duration || 5; 
        const width = 400; // Downscale for speed
        // Ensure even dimensions
        let height = Math.floor((video.videoHeight / video.videoWidth) * width);
        if (height % 2 !== 0) height -= 1;

        const fps = 10;
        const totalFrames = Math.floor(duration * fps);
        
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        
        if (!ctx) throw new Error("Could not get canvas context");

        // Initialize encoder
        const gif = GIFEncoder();
        
        for (let i = 0; i < totalFrames; i++) {
          // Yield to main thread to prevent UI freeze
          await new Promise(r => setTimeout(r, 0));

          const time = i / fps;
          video.currentTime = time;
          
          // Wait for seek with timeout
          await new Promise<void>((r, rej) => {
             const timeout = setTimeout(() => {
                video.removeEventListener('seeked', seekHandler);
                // Proceed anyway if seek takes too long, though frame might be dupe
                r();
             }, 1000);

             const seekHandler = () => {
               clearTimeout(timeout);
               video.removeEventListener('seeked', seekHandler);
               r();
             };
             video.addEventListener('seeked', seekHandler);
          });
          
          ctx.drawImage(video, 0, 0, width, height);
          const imageData = ctx.getImageData(0, 0, width, height);
          const { data } = imageData;
          
          // Quantize
          const palette = quantize(data, 256);
          const index = applyPalette(data, palette);
          
          gif.writeFrame(index, width, height, { palette, delay: 1000 / fps });
        }
        
        gif.finish();
        const buffer = gif.bytes();
        resolve(new Blob([buffer], { type: 'image/gif' }));
      } catch (e) {
        console.error("GIF Generation Error:", e);
        reject(e);
      }
    };
    
    video.onerror = (e) => reject(new Error("Video load failed"));
    video.load(); 
  });
};

export const TYPOGRAPHY_SUGGESTIONS = [
  { id: 'cinematic-3d', label: 'Cinematic 3D', prompt: 'Bold, dimensional 3D text with realistic lighting and shadows' },
  { id: 'neon-cyber', label: 'Neon Cyber', prompt: 'Glowing neon tube typography, cyberpunk aesthetic, vibrant bloom' },
  { id: 'elegant-serif', label: 'Elegant Serif', prompt: 'Refined, high-contrast serif typography, luxury editorial look' },
  { id: 'bold-sans', label: 'Bold Sans', prompt: 'Massive, heavy sans-serif typography, geometric and impactful' },
  { id: 'handwritten', label: 'Handwritten', prompt: 'Organic, flowing handwritten brush script, artistic and personal' },
  { id: 'retro-80s', label: 'Retro 80s', prompt: 'Chrome-plated, synthwave style typography with horizon lines and sparkles' },
  { id: 'liquid-metal', label: 'Liquid Metal', prompt: 'Fluid, melting chrome typography, surreal and reflective' },
  { id: 'botanical', label: 'Botanical', prompt: 'Typography intertwined with vines, flowers, and organic nature elements' },
];