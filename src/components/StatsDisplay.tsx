import { motion } from 'framer-motion';
import { PetStats } from '../types';

interface StatsDisplayProps {
  stats: PetStats;
}

const StatBar: React.FC<{ label: string; value: number; color: string; icon: string }> = ({
  label,
  value,
  color,
  icon,
}) => {
  return (
    <div style={{ marginBottom: '12px' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '6px',
        fontSize: '14px',
        fontWeight: '600',
        color: '#333'
      }}>
        <span style={{ marginRight: '8px' }}>{icon}</span>
        {label}
        <span style={{ marginLeft: 'auto', color: color, fontWeight: 'bold' }}>
          {Math.round(value)}%
        </span>
      </div>
      <div style={{
        width: '100%',
        height: '12px',
        background: 'rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            height: '100%',
            background: `linear-gradient(90deg, ${color}, ${color}dd)`,
            borderRadius: '10px',
            boxShadow: `0 0 10px ${color}88`,
          }}
        />
      </div>
    </div>
  );
};

export const StatsDisplay: React.FC<StatsDisplayProps> = ({ stats }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '20px',
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        minWidth: '280px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.8)',
      }}
    >
      <h2 style={{
        margin: '0 0 16px 0',
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#667eea',
        textAlign: 'center'
      }}>
        Pet Stats
      </h2>
      <StatBar label="Happiness" value={stats.happiness} color="#ff6b9d" icon="😊" />
      <StatBar label="Hunger" value={100 - stats.hunger} color="#ffc86b" icon="🍖" />
      <StatBar label="Energy" value={stats.energy} color="#6bcfff" icon="⚡" />
      <StatBar label="Affection" value={stats.affection} color="#ff6bcf" icon="💖" />
      <StatBar label="Clean" value={stats.cleanliness} color="#6bff8f" icon="✨" />
    </motion.div>
  );
};
