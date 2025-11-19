import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

interface ParticleEffectProps {
  position: { x: number; y: number };
  mood: string;
}

export const ParticleEffect: React.FC<ParticleEffectProps> = ({ position, mood }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const getEmoji = () => {
      switch (mood) {
        case 'happy':
        case 'excited':
          return ['✨', '💫', '⭐', '🌟'];
        case 'playful':
          return ['🎈', '🎉', '🎊'];
        case 'lonely':
          return ['💔', '😢'];
        default:
          return ['💕', '❤️', '💖'];
      }
    };

    const interval = setInterval(() => {
      if (mood === 'happy' || mood === 'excited' || mood === 'playful') {
        const emojis = getEmoji();
        const newParticle: Particle = {
          id: Date.now() + Math.random(),
          x: position.x + 40 + (Math.random() - 0.5) * 40,
          y: position.y + 40 + (Math.random() - 0.5) * 40,
          emoji: emojis[Math.floor(Math.random() * emojis.length)],
        };

        setParticles(prev => [...prev, newParticle]);

        setTimeout(() => {
          setParticles(prev => prev.filter(p => p.id !== newParticle.id));
        }, 2000);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [position, mood]);

  return (
    <>
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          initial={{ opacity: 1, scale: 0, x: particle.x, y: particle.y }}
          animate={{
            opacity: 0,
            scale: 1.5,
            y: particle.y - 100,
            x: particle.x + (Math.random() - 0.5) * 50
          }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{
            position: 'absolute',
            fontSize: '24px',
            pointerEvents: 'none',
            zIndex: 50,
          }}
        >
          {particle.emoji}
        </motion.div>
      ))}
    </>
  );
};
