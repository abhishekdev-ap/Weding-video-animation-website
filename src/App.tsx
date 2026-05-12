import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Calendar, MapPin, Heart, Music2, Volume2, Play, Pause, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import bgMusic from './Krishna Flute - Krishna Janmashtami 2025.mp3';
import coupleImg1 from './couple.jpg.jpeg';
import coupleImg2 from './couple-2.jpeg';

// Cinematic Scene Constants
const SCENES = {
  SPLASH: 'splash',
  REVEAL: 'reveal',
  COUPLE: 'couple',
  MOMENTS: 'moments',
  DETAILS: 'details',
  CLOSING: 'closing'
};

const SCENE_ORDER = [SCENES.SPLASH, SCENES.REVEAL, SCENES.COUPLE, SCENES.MOMENTS, SCENES.DETAILS, SCENES.CLOSING];

const MandalaPremium = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 500 500" fill="none" className={`absolute pointer-events-none select-none mandala-premium ${className}`}>
    <circle cx="250" cy="250" r="240" stroke="var(--gold-2)" strokeWidth="0.5" strokeDasharray="2 6" />
    <circle cx="250" cy="250" r="220" stroke="var(--gold-1)" strokeWidth="1" />
    <circle cx="250" cy="250" r="215" stroke="var(--gold-3)" strokeWidth="0.5" />
    {[...Array(24)].map((_, i) => (
      <path
        key={`ray-${i}`}
        d={`M250 250 L${250 + 240 * Math.cos((i * 15 * Math.PI) / 180)} ${250 + 240 * Math.sin((i * 15 * Math.PI) / 180)}`}
        stroke="var(--gold-2)" strokeWidth="0.2" opacity="0.4"
      />
    ))}
    {[...Array(12)].map((_, i) => {
      const angle = (i * 30 * Math.PI) / 180;
      return (
        <path
          key={`petal-large-${i}`}
          d={`M250 250 Q${250 + 150 * Math.cos(angle + 0.2)} ${250 + 150 * Math.sin(angle + 0.2)} ${250 + 200 * Math.cos(angle)} ${250 + 200 * Math.sin(angle)} Q${250 + 150 * Math.cos(angle - 0.2)} ${250 + 150 * Math.sin(angle - 0.2)} 250 250`}
          stroke="var(--gold-1)" strokeWidth="1" fill="var(--gold-3)" fillOpacity="0.05"
        />
      );
    })}
    <circle cx="250" cy="250" r="100" stroke="var(--gold-2)" strokeWidth="1" strokeDasharray="4 4" />
    <circle cx="250" cy="250" r="50" stroke="var(--gold-1)" strokeWidth="2" />
  </svg>
);

const GoldDust = ({ delay }: { delay: number; key?: React.Key }) => (
  <motion.div
    initial={{ y: -100, x: Math.random() * 100 + '%', opacity: 0, scale: Math.random() * 1.5 + 0.5 }}
    animate={{ 
      y: '110vh', 
      x: `calc(${Math.random() * 100}% + ${Math.random() * 200 - 100}px)`, 
      opacity: [0, 1, 1, 0]
    }}
    transition={{ 
      duration: Math.random() * 10 + 10, 
      delay, 
      repeat: Infinity, 
      ease: "linear" 
    }}
    className="absolute w-2 h-2 select-none pointer-events-none"
  >
    <div className="w-full h-full bg-[var(--gold-2)] rounded-full blur-[2px] opacity-80 shadow-[0_0_15px_var(--gold-2)]" />
  </motion.div>
);

const PremiumPetal = ({ delay }: { delay: number; key?: React.Key }) => {
  // 3D Cinematic Depth of Field Parameters
  const size = Math.random() * 1.5 + 0.8; // 0.8rem to 2.3rem
  const isForeground = Math.random() > 0.4;
  const blurAmount = isForeground ? 0 : Math.random() * 4 + 2;
  const zIndex = isForeground ? 5 : 0; // Put petals behind the photo cards (z-10)
  const opacityBase = isForeground ? 0.85 : 0.4;
  
  // Real SVG Paths for Rose Petal and Leaf
  const petalPath = "M12 22C12 22 20 15 20 9C20 4.5 16 2 12 2C8 2 4 4.5 4 9C4 15 12 22 12 22Z";
  const leafPath = "M17 8C17 8 13.5 4 8 4C2.5 4 2 8 2 8C2 8 5.5 12 11 12C16.5 12 17 8 17 8Z";
  const isPetal = Math.random() > 0.2;
  const path = isPetal ? petalPath : leafPath;
  
  // Luxury color palette (Deep reds, crimson, and antique gold)
  const colors = isPetal ? ['#e11d48', '#be123c', '#9f1239', '#fb7185'] : ['#b45309', '#d97706', '#fbbf24', '#fcd34d']; 
  const color = colors[Math.floor(Math.random() * colors.length)];

  return (
    <motion.div
      initial={{ 
        top: '-10%', 
        left: Math.random() * 100 + '%', 
        rotateX: Math.random() * 360, 
        rotateY: Math.random() * 360,
        rotateZ: Math.random() * 360,
        scale: size * 0.5
      }}
      animate={{ 
        top: '110%', 
        left: `calc(${Math.random() * 100}% + ${Math.random() * 400 - 200}px)`, 
        rotateX: Math.random() * 720 + 360,
        rotateY: Math.random() * 720 + 360,
        rotateZ: Math.random() * 720 + 360,
      }}
      transition={{ 
        duration: Math.random() * 120 + 180, // Near zero-gravity float: 180s to 300s (3 to 5 minutes!)
        delay: -(Math.random() * 300), // Massive negative delay so they are already spread across the screen
        repeat: Infinity, 
        ease: "linear" 
      }}
      className={`fixed select-none pointer-events-none will-change-transform`}
      style={{ 
        zIndex, 
        filter: blurAmount > 0 ? `blur(${blurAmount}px)` : 'none', 
        width: `${size}rem`, 
        height: `${size}rem`,
        opacity: opacityBase
      }}
    >
      <svg viewBox="0 0 24 24" fill={color} className="w-full h-full opacity-80">
        <path d={path} />
      </svg>
    </motion.div>
  );
};

const PremiumFlowerShower = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    {[...Array(40)].map((_, i) => (
      <PremiumPetal key={`premium-petal-${i}`} delay={Math.random() * 30} />
    ))}
  </div>
);

const BloomingFrame = () => (
  <motion.svg 
    viewBox="0 0 200 200" 
    className="absolute -inset-8 md:-inset-12 w-[calc(100%+4rem)] md:w-[calc(100%+6rem)] h-[calc(100%+4rem)] md:h-[calc(100%+6rem)] pointer-events-none opacity-60 z-0"
    animate={{ rotate: 360 }}
    transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
  >
    {[...Array(12)].map((_, i) => (
      <motion.path
        key={i}
        d="M100 10 Q 115 50, 100 100 Q 85 50, 100 10"
        fill="none"
        stroke="var(--gold-2)"
        strokeWidth="0.5"
        initial={{ scale: 0.8, opacity: 0.3 }}
        animate={{ scale: [0.8, 1.15, 0.8], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
        style={{ originX: '100px', originY: '100px', rotate: i * 30 }}
      />
    ))}
    <circle cx="100" cy="100" r="85" stroke="var(--gold-1)" strokeWidth="0.5" strokeDasharray="2 6" />
    <circle cx="100" cy="100" r="95" stroke="var(--gold-3)" strokeWidth="1" opacity="0.5" />
  </motion.svg>
);

const ParticleField = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(60)].map((_, i) => (
      <GoldDust key={i} delay={i * 0.2} />
    ))}
  </div>
);

// Cinematic Constants
const CINEMATIC_TRANSITION = {
  duration: 2.5, // Faster, but still elegant cinematic fade
  ease: [0.19, 1, 0.22, 1]
};

const STAGGER_TRANSITION = (index: number) => ({
  delay: 0.5 + (index * 0.2), // Increased delay between staggered elements
  duration: 2.0, // Slower stagger
  ease: [0.19, 1, 0.22, 1]
});

const splitText = (text: string) => {
  return text.split('').map((char, index) => (
    <span key={index} className="inline-block overflow-hidden align-bottom pb-4 px-1 -mx-1">
      <motion.span
        initial={{ y: "130%", skewY: 8, opacity: 0 }}
        animate={{ y: "0%", skewY: 0, opacity: 1 }}
        transition={{ 
          duration: 1.6, 
          delay: index * 0.05 + 0.3, 
          ease: [0.76, 0, 0.24, 1] // Ultra-premium fluid ease
        }}
        className="inline-block origin-top-left"
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    </span>
  ));
};

const PremiumText = ({ text, className = "", delay = 0, justify = "center" }: { text: string, className?: string, delay?: number, justify?: "center" | "start" | "end" }) => {
  const words = text.split(" ");
  const justifyClass = justify === "start" ? "justify-start" : justify === "end" ? "justify-end" : "justify-center";
  return (
    <div className={`flex flex-wrap ${justifyClass} ${className}`}>
      {words.map((word, i) => (
        <div key={i} className="overflow-hidden mr-[0.25em] last:mr-0 pb-2">
          <motion.div
            initial={{ y: "100%", opacity: 0, filter: "blur(10px)", rotateZ: 3 }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)", rotateZ: 0 }}
            transition={{ duration: 1.5, delay: delay + (i * 0.08), ease: [0.19, 1, 0.22, 1] }}
            className="inline-block"
          >
            {word}
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default function App() {
  const [scene, setScene] = useState(SCENES.SPLASH);
  const [isStarted, setIsStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);
  
  // Custom Cursor & 3D Parallax State
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth springs for 3D tilt
  const smoothMouseX = useSpring(mouseX, { damping: 30, stiffness: 100, mass: 1 });
  const smoothMouseY = useSpring(mouseY, { damping: 30, stiffness: 100, mass: 1 });
  
  // Tilt transforms
  const rotateX = useTransform(smoothMouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 800], [15, -15]);
  const rotateY = useTransform(smoothMouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1200], [-15, 15]);
  
  // Specific tilts for Details cards
  const rotateYDetailsLeft = useTransform(smoothMouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1200], [-5, 5]);
  const rotateYDetailsRight = useTransform(smoothMouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1200], [5, -5]);

  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const clearSequence = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  const runSequence = useCallback(() => {
    clearSequence();
    setAutoPlayEnabled(true);
    setScene(SCENES.SPLASH);
    
    const t1 = setTimeout(() => setScene(SCENES.REVEAL), 8000); // 8s
    const t2 = setTimeout(() => setScene(SCENES.COUPLE), 20000); // 12s
    const t3 = setTimeout(() => setScene(SCENES.MOMENTS), 32000); // 12s
    const t4 = setTimeout(() => setScene(SCENES.DETAILS), 44000); // 12s
    const t5 = setTimeout(() => setScene(SCENES.CLOSING), 56000); // 12s
    
    timeoutsRef.current = [t1, t2, t3, t4, t5];
  }, [clearSequence]);

  const startInvitation = () => {
    setIsStarted(true);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.error("Playback error", e));
    }
    runSequence();
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Playback error", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    clearSequence();
    setAutoPlayEnabled(false);
    const currentIndex = SCENE_ORDER.indexOf(scene);
    if (currentIndex < SCENE_ORDER.length - 1) {
      setScene(SCENE_ORDER[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    clearSequence();
    setAutoPlayEnabled(false);
    const currentIndex = SCENE_ORDER.indexOf(scene);
    if (currentIndex > 0) {
      setScene(SCENE_ORDER[currentIndex - 1]);
    }
  };

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('button, a, .cursor-pointer')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      clearSequence();
    };
  }, [clearSequence, mouseX, mouseY]);

  return (
    <div className="relative h-[100dvh] w-screen bg-[var(--obsidian)] overflow-hidden flex flex-col items-center justify-center selection:bg-[var(--gold-1)] selection:text-[var(--obsidian)]">
      
      {/* Custom Cursor */}
      <div 
        className="custom-cursor hidden md:block" 
        style={{ 
          left: `${cursorPos.x}px`, 
          top: `${cursorPos.y}px`,
          width: isHovering ? '60px' : '30px',
          height: isHovering ? '60px' : '30px',
          backgroundColor: isHovering ? 'rgba(252, 246, 186, 0.1)' : 'transparent',
          borderColor: isHovering ? 'var(--gold-4)' : 'rgba(252, 246, 186, 0.5)'
        }} 
      />
      <div 
        className="custom-cursor-dot hidden md:block" 
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }} 
      />

      <audio 
        ref={audioRef}
        src={bgMusic} 
        loop
        onError={() => {
          console.error("Audio Load Error: Attempting fallback.");
          if (audioRef.current && audioRef.current.src !== "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3") {
            audioRef.current.src = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3";
            audioRef.current.load();
          }
        }}
      />
      
      {/* Dramatic Obsidian Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[var(--obsidian-light)] via-[var(--obsidian)] to-[#000000] z-0 pointer-events-none" />
      
      {/* Massive Mandalas */}
      <MandalaPremium className="w-[1200px] h-[1200px] -top-[500px] -left-[500px] opacity-[0.08]" />
      <MandalaPremium className="w-[1000px] h-[1000px] -bottom-[400px] -right-[400px] opacity-[0.08]" />
      
      {/* Cinematic Grain */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] z-1 mix-blend-overlay" />
      
      <ParticleField />
      
      <AnimatePresence>
        {(scene === SCENES.COUPLE || scene === SCENES.MOMENTS || scene === SCENES.CLOSING) && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <PremiumFlowerShower />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!isStarted ? (
          <motion.div 
            key="start-gate"
            initial={{ opacity: 0, filter: "blur(20px)", scale: 0.8 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            exit={{ opacity: 0, scale: 3, filter: "blur(50px)", transition: { duration: 2, ease: "easeIn" } }}
            transition={CINEMATIC_TRANSITION}
            className="z-50 flex flex-col items-center gap-12"
          >
            <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startInvitation}
                className="w-40 h-40 border border-[var(--gold-2)]/30 rounded-full flex items-center justify-center cursor-pointer relative group transition-all duration-700 overflow-hidden bg-black/40 backdrop-blur-3xl gold-glow"
            >
                <div className="absolute inset-0 border-2 border-[var(--gold-2)]/40 rounded-full scale-[1.1] opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-700" />
                <div className="absolute inset-2 border border-[var(--gold-1)]/20 rounded-full" />
                <Music2 className="text-[var(--gold-2)] w-14 h-14 group-hover:scale-110 group-hover:text-[var(--gold-4)] transition-all duration-700" />
            </motion.div>
            <div className="text-center space-y-4 md:space-y-6">
              <h1 className="font-serif text-[var(--gold-2)] text-xl md:text-5xl tracking-[0.2em] md:tracking-[0.4em] uppercase flex items-center justify-center gap-2 md:gap-4">
                <span className="italic font-light opacity-80">The</span> 
                <span className="font-bold liquid-gold-text">Royal</span> 
                <span className="italic font-light opacity-80">Invitation</span>
              </h1>
              <div className="h-px w-32 md:w-48 bg-gradient-to-r from-transparent via-[var(--gold-2)] to-transparent mx-auto opacity-50" />
              <PremiumText text="Witness the Union" delay={1} className="font-sans text-[9px] md:text-xs tracking-[0.4em] md:tracking-[0.6em] text-[var(--gold-1)] uppercase font-semibold" />
            </div>
          </motion.div>
        ) : (
          <div className="z-20 w-full h-full flex items-center justify-center p-4 md:p-8 perspective-1000">
            <AnimatePresence mode="wait">
              
              {scene === SCENES.SPLASH && (
                <motion.div
                  key="splash"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, filter: "blur(20px)", scale: 1.1, y: -50 }}
                  transition={CINEMATIC_TRANSITION}
                  className="flex flex-col items-center text-center px-4"
                >
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 2.5, ease: [0.19, 1, 0.22, 1] }}
                    className="mb-10 md:mb-16 relative"
                  >
                    <div className="absolute inset-0 bg-[var(--gold-2)] blur-[120px] opacity-20 rounded-full" />
                    <Sparkles className="text-[var(--gold-4)] w-12 h-12 md:w-16 md:h-16 mb-8 mx-auto opacity-90 drop-shadow-[0_0_15px_rgba(252,246,186,0.8)]" />
                    <div className="mask-container">
                      <motion.h2 
                        initial={{ y: "120%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 2, ease: [0.2, 0.65, 0.3, 0.9] }}
                        className="font-display text-5xl sm:text-6xl md:text-8xl lg:text-9xl liquid-gold-text tracking-[0.1em] uppercase pb-4"
                      >
                        Shubh Vivah
                      </motion.h2>
                    </div>
                  </motion.div>
                  <div className="h-[2px] w-48 md:w-64 bg-gradient-to-r from-transparent via-[var(--gold-1)] to-transparent" />
                  <PremiumText 
                    text="Two souls, one destiny." 
                    delay={1} 
                    className="mt-10 font-serif italic text-xl md:text-4xl text-[var(--champagne)]/90 tracking-widest"
                  />
                </motion.div>
              )}

              {scene === SCENES.REVEAL && (
                <motion.div
                  key="reveal"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={CINEMATIC_TRANSITION}
                  className="text-center px-4 w-full will-change-transform"
                >
                    <div className="flex flex-col items-center gap-6 md:gap-12 relative z-10">
                        {/* Huge background ampersand */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[20rem] md:text-[40rem] text-[var(--gold-1)] opacity-[0.03] select-none pointer-events-none">
                          &
                        </div>

                        <h1 className="font-display text-4xl sm:text-5xl md:text-9xl lg:text-[10rem] liquid-gold-text whitespace-nowrap overflow-hidden py-4 drop-shadow-[0_10px_30px_rgba(0,0,0,1)]">
                            {splitText("ABHISHEK")}
                        </h1>
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 1.2, duration: 2, type: "spring", stiffness: 50 }}
                            className="flex items-center gap-4 md:gap-10"
                        >
                            <div className="h-[2px] w-8 sm:w-20 md:w-32 bg-gradient-to-r from-transparent to-[var(--gold-2)]" />
                            <span className="font-serif italic text-2xl sm:text-4xl md:text-7xl text-[var(--champagne)]">weds</span>
                            <div className="h-[2px] w-8 sm:w-20 md:w-32 bg-gradient-to-l from-transparent to-[var(--gold-2)]" />
                        </motion.div>
                        <h1 className="font-display text-4xl sm:text-5xl md:text-9xl lg:text-[10rem] liquid-gold-text whitespace-nowrap overflow-hidden py-4 drop-shadow-[0_10px_30px_rgba(0,0,0,1)]">
                            {splitText("PAVITRA")}
                        </h1>
                        <motion.div 
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 1 }}
                            transition={{ delay: 2, duration: 2, ease: "easeOut" }}
                            className="mt-8 md:mt-12"
                        >
                            <svg width="300" height="40" viewBox="0 0 300 40" fill="none" className="mx-auto w-48 md:w-72">
                                <path d="M15 20 Q 75 0, 150 20 T 285 20" stroke="url(#gold-grad-premium)" strokeWidth="1.5" fill="transparent"/>
                                <path d="M75 20 Q 150 40, 225 20" stroke="url(#gold-grad-premium)" strokeWidth="0.75" fill="transparent" opacity="0.6"/>
                                <circle cx="150" cy="20" r="4" fill="var(--gold-2)" />
                                <circle cx="15" cy="20" r="2" fill="var(--gold-1)" opacity="0.8" />
                                <circle cx="285" cy="20" r="2" fill="var(--gold-1)" opacity="0.8" />
                                <defs>
                                    <linearGradient id="gold-grad-premium" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="transparent" />
                                        <stop offset="20%" stopColor="var(--gold-1)" />
                                        <stop offset="50%" stopColor="var(--gold-2)" />
                                        <stop offset="80%" stopColor="var(--gold-1)" />
                                        <stop offset="100%" stopColor="transparent" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </motion.div>
                    </div>
                </motion.div>
              )}

              {scene === SCENES.COUPLE && (
                  <motion.div
                  key="couple"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={CINEMATIC_TRANSITION}
                  className="flex flex-col md:flex-row items-center gap-6 md:gap-32 overflow-y-auto max-h-full py-4 md:py-10 no-scrollbar relative will-change-transform"
                >
                    <motion.div 
                      style={{ rotateX, rotateY }}
                      className="relative shrink-0 perspective-1000 z-10"
                    >
                        <BloomingFrame />
                        <motion.div 
                            initial={{ opacity: 0, rotateZ: 5, y: 50 }}
                            animate={{ opacity: 1, rotateZ: 0, y: 0 }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            className="relative w-[200px] h-[280px] sm:w-[280px] sm:h-[400px] md:w-[460px] md:h-[640px] premium-glass p-2 sm:p-3 md:p-5 rounded-[2rem] md:rounded-[3rem] group z-10"
                        >
                            <div className="w-full h-full rounded-2xl md:rounded-[2.5rem] overflow-hidden relative">
                              <motion.img 
                                  src={coupleImg1} 
                                  alt="The Couple"
                                  initial={{ scale: 1.2 }}
                                  animate={{ scale: 1 }}
                                  transition={{ duration: 15, ease: "linear" }}
                                  className="w-full h-full object-cover grayscale-[0.3] contrast-[1.2] brightness-[0.8] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1500ms]"
                              />
                            </div>
                        </motion.div>
                        <div className="absolute -bottom-8 -right-8 md:-bottom-16 md:-right-16 text-[var(--gold-1)] font-display text-[8rem] md:text-[15rem] leading-none opacity-20 pointer-events-none select-none">
                          &
                        </div>
                    </motion.div>
                    
                    <div className="text-center md:text-left max-w-xl px-6 shrink-0 relative z-20">
                        <div className="mask-container mb-6">
                          <motion.span 
                              initial={{ y: "100%" }}
                              animate={{ y: 0 }}
                              transition={STAGGER_TRANSITION(0)}
                              className="font-sans text-[11px] md:text-sm tracking-[0.6em] uppercase text-[var(--gold-1)] block font-bold"
                          >
                              A Royal Wedding
                          </motion.span>
                        </div>
                        <div className="mask-container mb-10">
                          <motion.h3 
                              initial={{ y: "100%", filter: "blur(10px)" }}
                              animate={{ y: 0, filter: "blur(0px)" }}
                              transition={{ ...STAGGER_TRANSITION(1), duration: 2 }}
                              className="font-display italic text-5xl md:text-8xl text-white leading-tight drop-shadow-2xl"
                          >
                               "Where Two Hearts Join in Grace"
                          </motion.h3>
                        </div>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={STAGGER_TRANSITION(2)}
                            className="space-y-8"
                        >
                          <div className="h-[2px] w-24 bg-[var(--gold-1)]/50 mx-auto md:mx-0" />
                          <PremiumText 
                            text="We invite you to witness the beginning of our forever in an evening of tradition, love, and celebration." 
                            delay={0.8}
                            justify="start"
                            className="font-serif italic text-xl md:text-3xl text-[var(--champagne)]/80 leading-relaxed font-light text-center md:text-left"
                          />
                        </motion.div>
                    </div>
                </motion.div>
              )}

              {scene === SCENES.MOMENTS && (
                  <motion.div
                  key="moments"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={CINEMATIC_TRANSITION}
                  className="flex flex-col items-center justify-center gap-6 md:gap-16 px-4 py-4 md:py-10 relative will-change-transform"
                >
                    <motion.div 
                      style={{ rotateX, rotateY }}
                      className="relative group shrink-0 z-10"
                    >
                        <BloomingFrame />
                        <motion.div 
                            initial={{ opacity: 0, rotateZ: -5, y: -50 }}
                            animate={{ opacity: 1, rotateZ: 0, y: 0 }}
                            transition={{ duration: 2.5, ease: "easeOut" }}
                            className="relative w-[200px] h-[280px] sm:w-[280px] sm:h-[400px] md:w-[500px] md:h-[700px] premium-glass p-2 sm:p-3 md:p-5 rounded-[full] rounded-t-full overflow-hidden z-10"
                        >
                            <div className="w-full h-full rounded-t-full overflow-hidden relative">
                              <motion.img 
                                  src={coupleImg2} 
                                  alt="Precious Moments"
                                  initial={{ scale: 1.1, y: -20 }}
                                  animate={{ scale: 1, y: 0 }}
                                  transition={{ duration: 20, ease: "linear" }}
                                  className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1] group-hover:grayscale-0 transition-all duration-[2000ms]"
                              />
                            </div>
                        </motion.div>
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 1.5 }}
                        className="text-center px-4 relative z-20"
                    >
                         <h3 className="font-display text-4xl md:text-7xl liquid-gold-text mb-4 md:mb-8">Capturing Love</h3>
                         <PremiumText 
                            text="In every glance, a thousand stories untold." 
                            delay={0.5}
                            className="font-serif italic text-[var(--champagne)] text-lg md:text-3xl font-light"
                         />
                    </motion.div>
                </motion.div>
              )}

              {scene === SCENES.DETAILS && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, perspective: 2000 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={CINEMATIC_TRANSITION}
                  className="w-full max-w-6xl px-4 py-8 overflow-y-auto max-h-full no-scrollbar flex items-center justify-center"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 w-full perspective-1000">
                        <motion.div 
                            style={{ rotateX, rotateY: rotateYDetailsLeft }}
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ ...STAGGER_TRANSITION(0), duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
                            className="premium-glass p-6 sm:p-10 md:p-24 rounded-[2rem] md:rounded-[3rem] flex flex-col items-center text-center relative overflow-hidden group hover:gold-glow transition-shadow duration-500"
                        >
                            <Calendar className="text-[var(--gold-2)] w-10 h-10 md:w-20 md:h-20 mb-6 md:mb-10 opacity-90 group-hover:scale-110 transition-transform duration-700" />
                            <h4 className="font-sans text-[10px] md:text-[15px] tracking-[0.5em] uppercase text-[var(--gold-1)] mb-4 md:mb-8 font-bold">The Date</h4>
                            <span className="font-serif text-3xl md:text-7xl text-white mb-2 md:mb-6">22nd June 2026</span>
                            <div className="h-[2px] w-16 md:w-32 bg-[var(--gold-1)]/40 my-4 md:my-10" />
                            <p className="font-serif italic text-lg md:text-4xl text-[var(--champagne)]/90">Monday | Shubh Mahurat</p>
                        </motion.div>
 
                        <motion.a 
                            href="https://maps.app.goo.gl/o71Y5EyfU4BoUgY2A?g_st=iw"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ rotateX, rotateY: rotateYDetailsRight }}
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ ...STAGGER_TRANSITION(1), duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
                            className="premium-glass p-6 sm:p-10 md:p-24 rounded-[2rem] md:rounded-[3rem] flex flex-col items-center text-center cursor-pointer group relative overflow-hidden hover:gold-glow transition-shadow duration-500"
                        >
                            <MapPin className="text-[var(--gold-2)] w-10 h-10 md:w-20 md:h-20 mb-6 md:mb-10 opacity-90 group-hover:scale-110 transition-transform duration-700" />
                            <h4 className="font-sans text-[10px] md:text-[15px] tracking-[0.5em] uppercase text-[var(--gold-1)] mb-4 md:mb-8 font-bold">The Venue</h4>
                            <span className="font-serif text-3xl md:text-7xl text-white mb-2 md:mb-6 leading-tight">Roopali Convention</span>
                            <div className="h-[2px] w-16 md:w-32 bg-[var(--gold-1)]/40 my-4 md:my-10" />
                            <p className="font-serif italic text-lg md:text-4xl text-[var(--champagne)]/90 text-center mb-6 md:mb-8">Belagavi, Karnataka</p>
                            <span className="text-[var(--gold-2)] text-[10px] md:text-base uppercase tracking-widest flex items-center gap-2 border border-[var(--gold-1)]/40 px-6 py-2 md:px-8 md:py-3 rounded-full group-hover:bg-[var(--gold-1)] group-hover:text-[var(--obsidian)] transition-colors duration-500 font-bold">
                                <MapPin size={18} /> View on Maps
                            </span>
                        </motion.a>
                    </div>
                </motion.div>
              )}

              {scene === SCENES.CLOSING && (
                <motion.div
                  key="closing"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={CINEMATIC_TRANSITION}
                  className="flex flex-col items-center text-center max-w-4xl px-6 py-10 relative z-10 will-change-transform"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 80, damping: 20 }}
                    className="mb-12 md:mb-20 relative"
                  >
                    <div className="absolute inset-0 bg-[var(--gold-2)] blur-[100px] opacity-30 rounded-full" />
                    <Heart className="text-[var(--gold-2)] w-20 h-20 md:w-32 md:h-32 fill-[var(--gold-2)]/20 relative z-10 drop-shadow-[0_0_20px_rgba(252,246,186,0.6)]" />
                  </motion.div>
                  <h2 className="font-display italic text-4xl sm:text-5xl md:text-8xl lg:text-[7rem] liquid-gold-text mb-8 md:mb-16 leading-[1.1]">We wait to <br /> welcome you.</h2>
                  <p className="font-serif text-xl md:text-4xl text-[var(--champagne)] mb-8 md:mb-16 font-light">With love and respect,</p>
                  <span className="font-sans text-[10px] md:text-lg tracking-[0.3em] md:tracking-[0.8em] uppercase text-[var(--gold-1)] font-bold leading-relaxed px-4">The Families of Abhishek & Pavitra</span>
                  
                  <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 mt-12 md:mt-32">
                    <motion.a 
                      href="https://maps.app.goo.gl/o71Y5EyfU4BoUgY2A?g_st=iw"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(252, 246, 186, 0.4)" }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 md:px-14 md:py-5 bg-gradient-to-r from-[var(--gold-1)] via-[var(--gold-2)] to-[var(--gold-1)] text-[var(--obsidian)] rounded-full font-sans uppercase tracking-[0.3em] text-xs md:text-base font-extrabold transition-all duration-500 flex items-center gap-2 md:gap-3"
                    >
                      <MapPin size={16} className="md:w-5 md:h-5" /> Get Directions
                    </motion.a>

                    <motion.button 
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(252, 246, 186, 0.05)" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={runSequence}
                      className="px-8 py-4 md:px-14 md:py-5 border border-[var(--gold-1)]/50 text-[var(--gold-2)] rounded-full font-sans uppercase tracking-[0.3em] text-xs md:text-base transition-all duration-500 font-bold"
                    >
                      Replay Ceremony
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>

      {/* Persistent Navigation Controls */}
      <AnimatePresence>
        {isStarted && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 md:gap-6 premium-glass px-4 py-2 md:px-8 md:py-4 rounded-full"
          >
            <button 
              onClick={handlePrev}
              disabled={scene === SCENES.SPLASH}
              className={`p-1.5 md:p-2 rounded-full transition-colors ${scene === SCENES.SPLASH ? 'text-[var(--gold-1)]/30' : 'text-[var(--gold-2)] hover:bg-white/10'}`}
            >
              <ChevronLeft size={20} className="md:w-6 md:h-6" />
            </button>
            <div className="flex gap-2 md:gap-3 px-2 md:px-4">
              {SCENE_ORDER.map((s, i) => (
                <div 
                  key={s} 
                  className={`h-1 md:h-1.5 rounded-full transition-all duration-700 ${scene === s ? 'w-4 md:w-8 bg-[var(--gold-2)] shadow-[0_0_10px_var(--gold-2)]' : 'w-1.5 md:w-2 bg-[var(--gold-1)]/30'}`}
                />
              ))}
            </div>
            <button 
              onClick={handleNext}
              disabled={scene === SCENES.CLOSING}
              className={`p-1.5 md:p-2 rounded-full transition-colors ${scene === SCENES.CLOSING ? 'text-[var(--gold-1)]/30' : 'text-[var(--gold-2)] hover:bg-white/10'}`}
            >
              <ChevronRight size={20} className="md:w-6 md:h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent Audio Controls */}
      <AnimatePresence>
        {isStarted && (
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="fixed top-8 right-8 md:top-12 md:right-12 z-50 flex items-center gap-6 premium-glass p-4 md:p-5 rounded-full"
          >
            <button 
              onClick={toggleMusic}
              className="text-[var(--gold-2)] hover:scale-110 transition-transform p-1"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <div className="hidden md:flex items-center gap-4">
              <Volume2 size={20} className="text-[var(--gold-1)]" />
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-24 h-1.5 bg-[var(--gold-1)]/30 rounded-lg appearance-none cursor-pointer accent-[var(--gold-2)]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Left Branding */}
      <AnimatePresence>
        {isStarted && (
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="fixed top-8 left-8 md:top-12 md:left-12 z-50 hidden md:block"
          >
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 border border-[var(--gold-1)]/50 rounded-full flex items-center justify-center premium-glass">
                 <span className="font-display italic text-[var(--gold-2)] text-2xl font-bold">A&P</span>
              </div>
              <div className="h-[2px] w-12 bg-gradient-to-r from-[var(--gold-1)]/50 to-transparent" />
              <span className="font-sans text-[11px] tracking-[0.6em] uppercase text-[var(--gold-1)] font-bold whitespace-nowrap">Celebration of Union</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
