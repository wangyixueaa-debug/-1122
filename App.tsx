
import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { Foliage } from './components/Foliage';
import { Ornaments } from './components/Ornaments';
import { Star } from './components/Star';
import { TreeState, COLORS } from './constants';

const App: React.FC = () => {
  const [treeState, setTreeState] = useState<TreeState>(TreeState.CHAOS);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    let animationFrame: number;
    const target = treeState === TreeState.FORMED ? 1 : 0;
    
    const animate = () => {
      setProgress(prev => {
        const diff = target - prev;
        if (Math.abs(diff) < 0.001) return target;
        return prev + diff * 0.05;
      });
      animationFrame = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [treeState]);

  useEffect(() => {
    if (!audioRef.current) return;
    
    const maxVolume = 0.9;
    
    if (treeState === TreeState.FORMED) {
      audioRef.current.play().catch(err => console.log("Audio interaction requirement:", err));
      let vol = audioRef.current.volume;
      const interval = setInterval(() => {
        if (vol < maxVolume) {
          vol += 0.05;
          if (audioRef.current) audioRef.current.volume = Math.min(vol, maxVolume);
        } else {
          clearInterval(interval);
        }
      }, 50);
    } else {
      let vol = audioRef.current.volume;
      const interval = setInterval(() => {
        if (vol > 0.05) {
          vol -= 0.05;
          if (audioRef.current) audioRef.current.volume = Math.max(vol, 0);
        } else {
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }
          clearInterval(interval);
        }
      }, 50);
    }
  }, [treeState]);

  const toggleTree = () => {
    setTreeState(prev => prev === TreeState.CHAOS ? TreeState.FORMED : TreeState.CHAOS);
  };

  return (
    <div className="relative w-full h-screen bg-[#01120b] overflow-hidden select-none safe-area-inset">
      <audio 
        ref={audioRef} 
        src="https://cdn.pixabay.com/audio/2022/11/22/audio_03d9735d6c.mp3" 
        loop 
        playsInline
      />

      <div className="absolute inset-0 z-0">
        <Canvas shadows dpr={[1, 1.5]} gl={{ antialias: false, powerPreference: 'high-performance' }}>
          <PerspectiveCamera makeDefault position={[0, 4, 18]} fov={45} />
          <color attach="background" args={['#01120b']} />
          <fog attach="fog" args={['#01120b', 12, 40]} />
          
          <ambientLight intensity={0.5} />
          <spotLight position={[15, 20, 10]} angle={0.2} penumbra={1} intensity={2.5} castShadow color={COLORS.GOLD_BRIGHT} />
          <pointLight position={[-10, 5, -10]} color={COLORS.EMERALD} intensity={1.5} />
          <pointLight position={[0, 15, 0]} color={COLORS.GOLD} intensity={1.2} />

          <group position={[0, -5, 0]}>
            <Foliage progress={progress} />
            <Ornaments progress={progress} />
            <Star progress={progress} />
            <ContactShadows opacity={0.65} scale={30} blur={3} far={4.5} color="#000000" />
          </group>

          <Environment preset="lobby" />
          <OrbitControls 
            enablePan={false} 
            minDistance={10} 
            maxDistance={25} 
            autoRotate={treeState === TreeState.FORMED}
            autoRotateSpeed={0.3}
            maxPolarAngle={Math.PI / 1.7}
            minPolarAngle={Math.PI / 4}
          />

          <EffectComposer disableNormalPass multisampling={0}>
            <Bloom luminanceThreshold={0.75} intensity={1.8} radius={0.7} />
            <Noise opacity={0.03} />
            <Vignette eskil={false} offset={0.05} darkness={1.1} />
          </EffectComposer>
        </Canvas>
      </div>

      <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between items-center px-8 pb-12 pt-16">
        <header className="w-full flex flex-col items-center">
          <div className="luxury-font text-center">
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#FFD700] via-[#D4AF37] to-[#AA8B2E] drop-shadow-2xl">
              MERRY CHRISTMAS
            </h1>
            <div className="flex items-center justify-center gap-4 mt-1 opacity-50">
              <div className="h-[1px] w-6 bg-[#D4AF37]"></div>
              <p className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-[#D4AF37]">Royal Festive Edition</p>
              <div className="h-[1px] w-6 bg-[#D4AF37]"></div>
            </div>
          </div>
        </header>

        <div className="flex flex-col items-center gap-6">
          <button 
            onClick={toggleTree}
            className="pointer-events-auto luxury-font px-8 py-3 bg-gradient-to-br from-[#FFD700] via-[#D4AF37] to-[#AA8B2E] text-black text-xs font-black rounded-full shadow-[0_5px_20px_rgba(212,175,55,0.4)] transition-all duration-500 hover:scale-105 active:scale-95 border border-white/10 uppercase tracking-[0.2em]"
          >
            {treeState === TreeState.CHAOS ? 'Reveal Vision' : 'Release Magic'}
          </button>
          
          <div className={`transition-opacity duration-1000 ${treeState === TreeState.FORMED ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-[#D4AF37] text-[9px] tracking-[0.2em] uppercase luxury-font animate-pulse">
              Orchestra of the Grand Pine
            </p>
          </div>
        </div>

        <div className="absolute bottom-6 right-8 text-right opacity-30">
          <p className="text-[8px] text-[#D4AF37] tracking-[0.1em] uppercase luxury-font">Emerald & Gold Heritage</p>
          <p className="text-[8px] text-[#D4AF37] tracking-[0.1em] uppercase luxury-font">Prestige Series No. 2025</p>
        </div>
      </div>
    </div>
  );
};

export default App;
