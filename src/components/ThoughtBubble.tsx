import { motion, AnimatePresence } from 'framer-motion';

interface ThoughtBubbleProps {
  thought: string;
  position: { x: number; y: number };
}

export const ThoughtBubble: React.FC<ThoughtBubbleProps> = ({ thought, position }) => {
  if (!thought) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          left: position.x + 90,
          top: position.y - 60,
          background: 'rgba(255, 255, 255, 0.95)',
          color: '#2d3748',
          padding: '12px 16px',
          borderRadius: '20px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          maxWidth: '200px',
          fontSize: '14px',
          fontWeight: '500',
          zIndex: 100,
          pointerEvents: 'none',
          border: '2px solid rgba(100, 100, 255, 0.3)',
        }}
      >
        {thought}
        <div
          style={{
            position: 'absolute',
            bottom: '-8px',
            left: '20px',
            width: '0',
            height: '0',
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderTop: '8px solid rgba(255, 255, 255, 0.95)',
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
};
