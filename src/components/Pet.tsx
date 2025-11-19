import { motion } from 'framer-motion';
import { Activity, Mood } from '../types';

interface PetProps {
  mood: Mood;
  activity: Activity;
  direction: 'left' | 'right';
  position: { x: number; y: number };
  onClick: () => void;
}

export const Pet: React.FC<PetProps> = ({ mood, activity, direction, position, onClick }) => {
  const getPetEmoji = () => {
    if (activity === 'sleeping') return '😴';
    if (activity === 'eating') return '😋';

    switch (mood) {
      case 'happy':
      case 'excited':
        return '😊';
      case 'playful':
        return '😄';
      case 'sleepy':
        return '😪';
      case 'hungry':
        return '🤤';
      case 'grumpy':
        return '😠';
      case 'lonely':
        return '🥺';
      default:
        return '😌';
    }
  };

  const getAnimationVariant = () => {
    switch (activity) {
      case 'jumping':
        return {
          y: [0, -30, 0, -15, 0],
          transition: { duration: 0.6, times: [0, 0.3, 0.5, 0.7, 1] }
        };
      case 'walking':
        return {
          y: [0, -5, 0, -5, 0],
          transition: { duration: 0.4, repeat: Infinity }
        };
      case 'sleeping':
        return {
          scale: [1, 1.05, 1],
          transition: { duration: 2, repeat: Infinity }
        };
      default:
        return {
          y: [0, -2, 0],
          transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        };
    }
  };

  return (
    <motion.div
      className="pet-container"
      initial={{ x: position.x, y: position.y }}
      animate={{
        x: position.x,
        y: position.y,
        scaleX: direction === 'left' ? -1 : 1,
        ...getAnimationVariant()
      }}
      transition={{
        x: { duration: 2, ease: "easeInOut" },
        y: { duration: 2, ease: "easeInOut" }
      }}
      onClick={onClick}
      style={{
        position: 'absolute',
        cursor: 'pointer',
        userSelect: 'none',
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <div style={{ fontSize: '80px', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }}>
        {getPetEmoji()}
      </div>
    </motion.div>
  );
};
