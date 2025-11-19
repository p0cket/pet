import { motion } from 'framer-motion';
import { InteractionType } from '../types';
import { getDialogueForAction } from '../utils/petLogic';

interface InteractionPanelProps {
  onInteract: (interaction: InteractionType) => void;
}

const interactions: Omit<InteractionType, 'dialogue' | 'thought'>[] = [
  {
    id: 'feed',
    name: 'Feed',
    icon: '🍖',
    effect: { hunger: -30, happiness: 10 },
    cooldown: 5000,
  },
  {
    id: 'treat',
    name: 'Treat',
    icon: '🍰',
    effect: { hunger: -15, happiness: 20, affection: 5 },
    cooldown: 10000,
  },
  {
    id: 'play',
    name: 'Play',
    icon: '🎾',
    effect: { happiness: 20, energy: -10, affection: 5 },
    cooldown: 8000,
  },
  {
    id: 'sleep',
    name: 'Sleep',
    icon: '😴',
    effect: { energy: 40, happiness: 5 },
    cooldown: 15000,
  },
  {
    id: 'bathe',
    name: 'Bathe',
    icon: '🛁',
    effect: { cleanliness: 50, happiness: -5 },
    cooldown: 12000,
  },
  {
    id: 'pet',
    name: 'Pet',
    icon: '💕',
    effect: { happiness: 15, affection: 10 },
    cooldown: 3000,
  },
];

export const InteractionPanel: React.FC<InteractionPanelProps> = ({ onInteract }) => {
  const handleClick = (interaction: Omit<InteractionType, 'dialogue' | 'thought'>) => {
    const dialogue = getDialogueForAction(interaction.id);
    const thought = dialogue; // For simplicity, use same text

    onInteract({
      ...interaction,
      dialogue,
      thought,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '12px',
        padding: '16px',
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '30px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.8)',
      }}
    >
      {interactions.map((interaction, index) => (
        <motion.button
          key={interaction.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleClick(interaction)}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            borderRadius: '20px',
            padding: '16px 20px',
            fontSize: '32px',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            minWidth: '80px',
            transition: 'all 0.2s',
          }}
          title={interaction.name}
        >
          <span>{interaction.icon}</span>
          <span style={{
            fontSize: '11px',
            fontWeight: '600',
            color: 'white',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}>
            {interaction.name}
          </span>
        </motion.button>
      ))}
    </motion.div>
  );
};
