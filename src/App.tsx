import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, Heart, Music, Music2, Volume2, VolumeX, Play, Pause, Sparkles } from 'lucide-react';
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

const Mandala = ({ className }: { className?: string }) => (
  <motion.div
    initial={{ rotate: 0, opacity: 0 }}
    animate={{ rotate: 360, opacity: 0.08 }}
    transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
    className={`absolute pointer-events-none select-none ${className}`}
  >
    <svg viewBox="0 0 200 200" fill="none" stroke="#f7e7ce" strokeWidth="0.5">
      <circle cx="100" cy="100" r="80" strokeDasharray="4 4" />
      <circle cx="100" cy="100" r="60" />
      {[...Array(12)].map((_, i) => (
        <path
          key={i}
          d={`M100 100 L${100 + 70 * Math.cos((i * 30 * Math.PI) / 180)} ${100 + 70 * Math.sin((i * 30 * Math.PI) / 180)}`}
          strokeOpacity="0.3"
        />
      ))}
      {[...Array(24)].map((_, i) => (
        <path
          key={`petal-${i}`}
          d={`M100 100 Q${100 + 90 * Math.cos(((i * 15 + 7.5) * Math.PI) / 180)} ${100 + 90 * Math.sin(((i * 15 + 7.5) * Math.PI) / 180)} ${100 + 80 * Math.cos(((i + 1) * 15 * Math.PI) / 180)} ${100 + 80 * Math.sin(((i + 1) * 15 * Math.PI) / 180)}`}
          strokeOpacity="0.5"
        />
      ))}
    </svg>
  </motion.div>
);

const ChampagnePetal = ({ delay }: { delay: number; key?: React.Key }) => (
  <motion.div
    initial={{ y: -100, x: Math.random() * 100 + '%', rotate: 0, opacity: 0 }}
    animate={{ 
      y: '110vh', 
      x: `calc(${Math.random() * 100}% + ${Math.random() * 100 - 50}px)`, 
      rotate: 360,
      opacity: [0, 0.6, 0.6, 0]
    }}
    transition={{ 
      duration: Math.random() * 6 + 6, 
      delay, 
      repeat: Infinity, 
      ease: "linear" 
    }}
    className="absolute w-4 h-4 select-none pointer-events-none"
  >
    <div className="w-full h-full bg-[#f7e7ce] rounded-full blur-[1px] opacity-40 shadow-[0_0_8px_#f7e7ce]" />
  </motion.div>
);

const ParticleField = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(40)].map((_, i) => (
      <ChampagnePetal key={i} delay={i * 0.4} />
    ))}
  </div>
);

// Cinematic Constants
const CINEMATIC_TRANSITION = {
  duration: 2.5,
  ease: [0.25, 0.1, 0.25, 1]
};

const STAGGER_TRANSITION = (index: number) => ({
  delay: 0.5 + (index * 0.3),
  duration: 1.5,
  ease: "easeOut"
});

export default function App() {
  const [scene, setScene] = useState(SCENES.SPLASH);
  const [isStarted, setIsStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const runSequence = useCallback(() => {
    setScene(SCENES.SPLASH);
    const splash = setTimeout(() => setScene(SCENES.REVEAL), 5000);
    const reveal = setTimeout(() => setScene(SCENES.COUPLE), 10500);
    const moments = setTimeout(() => setScene(SCENES.MOMENTS), 17500);
    const details = setTimeout(() => setScene(SCENES.DETAILS), 24500);
    const closing = setTimeout(() => setScene(SCENES.CLOSING), 31500);
    
    return () => {
      [splash, reveal, moments, details, closing].forEach(clearTimeout);
    };
  }, []);

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

  return (
    <div className="relative h-screen w-screen bg-[#0a192f] overflow-hidden flex flex-col items-center justify-center selection:bg-[#f7e7ce] selection:text-[#0a192f]">
      
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
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-radial-gradient from-[#112240] to-[#0a192f] z-0" />
      <Mandala className="w-[800px] h-[800px] -top-64 -left-64" />
      <Mandala className="w-[600px] h-[600px] -bottom-32 -right-32" />
      
      {/* Grainy Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] z-1" />
      
      <ParticleField />

      <AnimatePresence mode="wait">
        {!isStarted ? (
          <motion.div 
            key="start-gate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={CINEMATIC_TRANSITION}
            className="z-50 flex flex-col items-center gap-8"
          >
            <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startInvitation}
                className="w-32 h-32 border border-[#f7e7ce]/30 rounded-full flex items-center justify-center cursor-pointer glass-card relative group"
            >
                <div className="absolute inset-0 border border-[#f7e7ce]/20 rounded-full pulsing-glow" />
                <Music2 className="text-[#f7e7ce] w-12 h-12 group-hover:scale-110 transition-transform duration-500" />
            </motion.div>
            <div className="text-center">
              <h1 className="font-serif italic text-[#f7e7ce] text-lg md:text-2xl tracking-[0.4em] uppercase mb-4">The Royal Invitation</h1>
              <p className="font-sans text-[8px] md:text-[10px] tracking-[0.2em] text-[#f7e7ce]/40 uppercase px-4">Witness the union of Abhishek & Pavitra</p>
            </div>
          </motion.div>
        ) : (
          <div className="z-20 w-full h-full flex items-center justify-center p-4 md:p-8">
            <AnimatePresence mode="wait">
              
              {scene === SCENES.SPLASH && (
                <motion.div
                  key="splash"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, filter: "blur(10px)", y: -20 }}
                  transition={CINEMATIC_TRANSITION}
                  className="flex flex-col items-center text-center px-4"
                >
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 2 }}
                    className="mb-6 md:mb-8"
                  >
                    <Sparkles className="text-[#f7e7ce] w-6 h-6 md:w-8 md:h-8 mb-4 md:mb-6 mx-auto opacity-50" />
                    <h2 className="font-display text-3xl md:text-6xl gold-text tracking-[0.2em] uppercase cinematic-shadow">Shubh Vivah</h2>
                  </motion.div>
                  <div className="h-px w-24 md:w-32 bg-gradient-to-r from-transparent via-[#f7e7ce]/40 to-transparent" />
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1.5 }}
                    className="mt-6 md:mt-8 font-serif italic text-base md:text-2xl text-[#f7e7ce]/60 tracking-wider"
                  >
                    Two souls, one destiny.
                  </motion.p>
                </motion.div>
              )}

              {scene === SCENES.REVEAL && (
                <motion.div
                  key="reveal"
                  initial={{ opacity: 0, filter: "blur(20px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                  transition={{ duration: 3 }}
                  className="text-center px-4"
                >
                    <div className="flex flex-col items-center gap-4 md:gap-6">
                        <motion.h1 
                            initial={{ letterSpacing: "1em", opacity: 0 }}
                            animate={{ letterSpacing: "0.2em", opacity: 1 }}
                            transition={{ duration: 3, ease: "easeOut" }}
                            className="font-display text-4xl md:text-9xl gold-text cinematic-shadow"
                        >
                            ABHISHEK
                        </motion.h1>
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 0.6 }}
                            transition={{ delay: 1, duration: 2 }}
                            className="flex items-center gap-4 md:gap-6"
                        >
                            <div className="h-px w-8 md:w-12 bg-[#f7e7ce]" />
                            <span className="font-serif italic text-xl md:text-5xl text-white">weds</span>
                            <div className="h-px w-8 md:w-12 bg-[#f7e7ce]" />
                        </motion.div>
                        <motion.h1 
                            initial={{ letterSpacing: "1em", opacity: 0 }}
                            animate={{ letterSpacing: "0.2em", opacity: 1 }}
                            transition={{ delay: 1.5, duration: 3, ease: "easeOut" }}
                            className="font-display text-4xl md:text-9xl gold-text cinematic-shadow"
                        >
                            PAVITRA
                        </motion.h1>
                    </div>
                </motion.div>
              )}

              {scene === SCENES.COUPLE && (
                <motion.div
                  key="couple"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={CINEMATIC_TRANSITION}
                  className="flex flex-col md:flex-row items-center gap-6 md:gap-20 overflow-y-auto max-h-full py-10 no-scrollbar"
                >
                    <div className="relative shrink-0">
                        <motion.div 
                            initial={{ opacity: 0, rotate: -2 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            transition={{ duration: 3 }}
                            className="relative w-[240px] h-[360px] md:w-[400px] md:h-[550px] border border-[#f7e7ce]/20 p-2 md:p-3 bg-white/5 backdrop-blur-sm rounded-3xl"
                        >
                            <img 
                                src={coupleImg1} 
                                alt="The Couple"
                                className="w-full h-full object-cover rounded-2xl grayscale-[0.3] brightness-90 hover:grayscale-0 hover:brightness-100 transition-all duration-1000"
                            />
                        </motion.div>
                        <Mandala className="w-40 h-40 md:w-48 md:h-48 -bottom-8 -right-8 md:-bottom-12 md:-right-12" />
                    </div>
                    <div className="text-center md:text-left max-w-lg px-6 shrink-0">
                        <motion.span 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={STAGGER_TRANSITION(0)}
                            className="font-sans text-[8px] md:text-[10px] tracking-[0.4em] uppercase text-[#f7e7ce]/40 mb-2 md:mb-4 block"
                        >
                            A Royal Wedding
                        </motion.span>
                        <motion.h3 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={STAGGER_TRANSITION(1)}
                            className="font-serif text-3xl md:text-6xl text-white mb-4 md:mb-8"
                        >
                             "Where Two Hearts Join in Grace"
                        </motion.h3>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={STAGGER_TRANSITION(2)}
                            className="font-serif italic text-base md:text-xl text-[#f7e7ce]/60 leading-relaxed"
                        >
                            We invite you to witness the beginning of our forever in an evening of tradition, love, and celebration.
                        </motion.p>
                    </div>
                </motion.div>
              )}

              {scene === SCENES.MOMENTS && (
                <motion.div
                  key="moments"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                  transition={CINEMATIC_TRANSITION}
                  className="flex flex-col items-center justify-center gap-4 md:gap-8 px-4"
                >
                    <div className="relative group shrink-0">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 2 }}
                            className="relative w-[240px] h-[360px] md:w-[420px] md:h-[580px] border border-[#f7e7ce]/20 p-2 md:p-3 bg-white/5 backdrop-blur-sm rounded-full overflow-hidden"
                        >
                            <img 
                                src={coupleImg2} 
                                alt="Precious Moments"
                                className="w-full h-full object-cover rounded-full cinematic-zoom grayscale-[0.2]"
                            />
                        </motion.div>
                        <Mandala className="w-48 h-48 md:w-56 md:h-56 -top-10 -left-10 md:-top-12 md:-left-12 opacity-[0.05]" />
                    </div>
                    <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        className="text-center px-4"
                    >
                         <h3 className="font-display text-xl md:text-5xl gold-text mb-1 md:mb-4">Capturing Love</h3>
                         <p className="font-serif italic text-[#f7e7ce]/60 text-sm md:text-lg">In every glance, a thousand stories untold.</p>
                    </motion.div>
                </motion.div>
              )}

              {scene === SCENES.DETAILS && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={CINEMATIC_TRANSITION}
                  className="w-full max-w-5xl px-4 py-8 overflow-y-auto max-h-full no-scrollbar"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
                        <motion.div 
                            initial={{ x: -30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={STAGGER_TRANSITION(0)}
                            className="glass-card p-8 md:p-16 rounded-3xl md:rounded-[2.5rem] flex flex-col items-center text-center"
                        >
                            <Calendar className="text-[#f7e7ce] w-8 h-8 md:w-10 md:h-10 mb-6 md:mb-8 opacity-60" />
                            <h4 className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#f7e7ce]/40 mb-4 md:mb-6">The Date</h4>
                            <span className="font-serif text-2xl md:text-5xl text-white mb-2 md:mb-4">22nd June 2026</span>
                            <div className="h-px w-16 md:w-20 bg-[#f7e7ce]/20 my-4 md:my-6" />
                            <p className="font-serif italic text-base md:text-lg text-[#f7e7ce]/60">Monday | Shubh Mahurat</p>
                        </motion.div>
 
                        <motion.a 
                            href="https://maps.app.goo.gl/o71Y5EyfU4BoUgY2A?g_st=iw"
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ x: 30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={STAGGER_TRANSITION(1)}
                            className="glass-card p-8 md:p-16 rounded-3xl md:rounded-[2.5rem] flex flex-col items-center text-center hover:bg-white/10 transition-colors duration-300 cursor-pointer group"
                        >
                            <MapPin className="text-[#f7e7ce] w-8 h-8 md:w-10 md:h-10 mb-6 md:mb-8 opacity-60 group-hover:scale-110 transition-transform duration-300" />
                            <h4 className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#f7e7ce]/40 mb-4 md:mb-6">The Venue</h4>
                            <span className="font-serif text-2xl md:text-5xl text-white mb-2 md:mb-4 leading-tight">Roopali Convention</span>
                            <div className="h-px w-16 md:w-20 bg-[#f7e7ce]/20 my-4 md:my-6" />
                            <p className="font-serif italic text-base md:text-lg text-[#f7e7ce]/60 text-center mb-4">Belgaum, Karnataka</p>
                            <span className="text-[#f7e7ce]/40 text-[10px] uppercase tracking-widest flex items-center gap-2">
                                <MapPin size={12} /> View on Maps
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
                  transition={CINEMATIC_TRANSITION}
                  className="flex flex-col items-center text-center max-w-2xl px-6 py-10"
                >
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mb-8 md:mb-12 relative"
                  >
                    <div className="absolute inset-0 bg-[#f7e7ce] blur-3xl opacity-10 rounded-full" />
                    <Heart className="text-[#f7e7ce] w-14 h-14 md:w-20 md:h-20 fill-[#f7e7ce]/10 relative z-10" />
                  </motion.div>
                  <h2 className="font-serif text-3xl md:text-7xl text-white mb-6 md:mb-10 leading-tight">We wait to <br className="md:hidden" /> welcome you.</h2>
                  <p className="font-serif italic text-lg md:text-xl text-[#f7e7ce]/60 mb-8 md:mb-12">With love and respect,</p>
                  <span className="font-sans text-[10px] md:text-sm tracking-[0.3em] md:tracking-[0.5em] uppercase text-[#f7e7ce]/90 leading-relaxed px-4">The Families of Abhishek & Pavitra</span>
                  
                  <div className="flex flex-col md:flex-row items-center gap-4 mt-10 md:mt-16">
                    <motion.a 
                      href="https://maps.app.goo.gl/o71Y5EyfU4BoUgY2A?g_st=iw"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-10 py-3 bg-[#f7e7ce] text-[#1a0f0f] rounded-full font-serif uppercase tracking-widest text-[10px] md:text-xs font-bold hover:shadow-[0_0_20px_rgba(247,231,206,0.3)] transition-all duration-300 flex items-center gap-2"
                    >
                      <MapPin size={14} /> Get Directions
                    </motion.a>

                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={runSequence}
                      className="px-10 py-3 border border-[#f7e7ce]/30 text-[#f7e7ce] rounded-full font-serif uppercase tracking-widest text-[10px] md:text-xs hover:bg-white/5 transition-all duration-300"
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

      {/* Persistent Controls */}
      <AnimatePresence>
        {isStarted && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 flex items-center gap-4 md:gap-6 glass-card p-3 md:p-4 rounded-full md:rounded-3xl shadow-2xl"
          >
            <button 
              onClick={toggleMusic}
              className="text-[#f7e7ce] hover:scale-110 transition-transform p-1"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <div className="hidden md:flex items-center gap-3">
              <Volume2 size={16} className="text-[#f7e7ce]/60" />
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-24 h-1 bg-[#f7e7ce]/10 rounded-lg appearance-none cursor-pointer accent-[#f7e7ce]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Left Branding */}
      <AnimatePresence>
        {isStarted && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="fixed top-10 left-10 z-50 hidden md:block"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border border-[#f7e7ce]/30 rounded-full flex items-center justify-center">
                 <span className="font-serif italic text-[#f7e7ce] text-lg">A&P</span>
              </div>
              <div className="h-px w-8 bg-[#f7e7ce]/30" />
              <span className="font-sans text-[9px] tracking-[0.5em] uppercase text-[#f7e7ce]/40 whitespace-nowrap">Celebration of Union</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
