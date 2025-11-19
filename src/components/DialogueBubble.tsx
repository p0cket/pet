import { motion, AnimatePresence } from 'framer-motion';

interface DialogueBubbleProps {
  dialogue: string;
  position: { x: number; y: number };
}

export const DialogueBubble: React.FC<DialogueBubbleProps> = ({ dialogue, position }) => {
  if (!dialogue) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{ opacity: 0, scale: 0.5, y: -20 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
        style={{
          position: 'absolute',
          left: position.x + 40,
          top: position.y + 100,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '14px 20px',
          borderRadius: '25px',
          boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)',
          maxWidth: '250px',
          fontSize: '16px',
          fontWeight: '600',
          zIndex: 100,
          pointerEvents: 'none',
        }}
      >
        {dialogue}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
          }}
          style={{
            position: 'absolute',
            top: '-8px',
            left: '30px',
            width: '0',
            height: '0',
            borderLeft: '10px solid transparent',
            borderRight: '10px solid transparent',
            borderBottom: '10px solid #667eea',
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
};
