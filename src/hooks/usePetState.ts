import { useState, useEffect, useCallback, useRef } from 'react';
import { PetState, InteractionType, PetStats } from '../types';
import {
  calculateMood,
  getThoughtForMood,
  degradeStats,
  applyStatChanges,
  getDialogueForAction,
  getRandomPosition
} from '../utils/petLogic';

const INITIAL_STATS: PetStats = {
  happiness: 70,
  hunger: 30,
  energy: 80,
  affection: 50,
  cleanliness: 90,
};

const SAVE_KEY = 'virtualPetState';

export const usePetState = () => {
  const [petState, setPetState] = useState<PetState>(() => {
    // Try to load saved state
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          activity: 'idle' as const,
          thought: '',
          dialogue: '',
        };
      } catch {
        // If parsing fails, use default
      }
    }

    return {
      stats: INITIAL_STATS,
      mood: calculateMood(INITIAL_STATS),
      activity: 'idle' as const,
      position: { x: 200, y: 200 },
      direction: 'right' as const,
      thought: '',
      dialogue: '',
      lastInteraction: Date.now(),
    };
  });

  const lastUpdateRef = useRef(Date.now());
  const thoughtTimerRef = useRef<number>();
  const activityTimerRef = useRef<number>();

  // Save state to localStorage
  useEffect(() => {
    const stateToSave = {
      stats: petState.stats,
      mood: petState.mood,
      position: petState.position,
      direction: petState.direction,
      lastInteraction: petState.lastInteraction,
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(stateToSave));
  }, [petState]);

  // Stat degradation over time
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const deltaTime = (now - lastUpdateRef.current) / 1000; // Convert to seconds
      lastUpdateRef.current = now;

      setPetState(prev => {
        const newStats = degradeStats(prev.stats, deltaTime);
        const newMood = calculateMood(newStats);

        return {
          ...prev,
          stats: newStats,
          mood: newMood,
        };
      });
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  // Random thoughts
  useEffect(() => {
    const updateThought = () => {
      setPetState(prev => ({
        ...prev,
        thought: getThoughtForMood(prev.mood),
      }));

      // Schedule next thought
      const delay = 5000 + Math.random() * 10000; // 5-15 seconds
      thoughtTimerRef.current = window.setTimeout(updateThought, delay);
    };

    updateThought();

    return () => {
      if (thoughtTimerRef.current) {
        clearTimeout(thoughtTimerRef.current);
      }
    };
  }, [petState.mood, petState.stats]);

  // Random walking
  useEffect(() => {
    const randomWalk = () => {
      setPetState(prev => {
        if (prev.activity === 'sleeping' || prev.activity === 'eating') {
          return prev;
        }

        // 30% chance to start walking
        if (Math.random() < 0.3) {
          const newDirection = Math.random() < 0.5 ? 'left' : 'right';
          const containerWidth = window.innerWidth;
          const containerHeight = window.innerHeight;
          const newPosition = getRandomPosition(containerWidth, containerHeight);

          return {
            ...prev,
            activity: 'walking' as const,
            position: newPosition,
            direction: newDirection,
          };
        }

        return {
          ...prev,
          activity: 'idle' as const,
        };
      });

      // Schedule next walk check
      const delay = 3000 + Math.random() * 7000; // 3-10 seconds
      activityTimerRef.current = window.setTimeout(randomWalk, delay);
    };

    randomWalk();

    return () => {
      if (activityTimerRef.current) {
        clearTimeout(activityTimerRef.current);
      }
    };
  }, []);

  const interact = useCallback((interaction: InteractionType) => {
    setPetState(prev => {
      const newStats = applyStatChanges(prev.stats, interaction.effect);
      const newMood = calculateMood(newStats);

      return {
        ...prev,
        stats: newStats,
        mood: newMood,
        dialogue: interaction.dialogue,
        thought: interaction.thought,
        activity: interaction.id === 'sleep' ? 'sleeping' : interaction.id === 'feed' ? 'eating' : 'jumping',
        lastInteraction: Date.now(),
      };
    });

    // Clear dialogue after a few seconds
    setTimeout(() => {
      setPetState(prev => ({
        ...prev,
        dialogue: '',
        activity: 'idle',
      }));
    }, 3000);
  }, []);

  const petClick = useCallback(() => {
    const dialogue = getDialogueForAction('pet');
    const thought = "That feels nice! 💕";

    setPetState(prev => {
      const newStats = applyStatChanges(prev.stats, {
        happiness: 5,
        affection: 2,
      });
      const newMood = calculateMood(newStats);

      return {
        ...prev,
        stats: newStats,
        mood: newMood,
        dialogue,
        thought,
        activity: 'jumping',
        lastInteraction: Date.now(),
      };
    });

    setTimeout(() => {
      setPetState(prev => ({
        ...prev,
        dialogue: '',
        activity: 'idle',
      }));
    }, 2000);
  }, []);

  return {
    petState,
    interact,
    petClick,
  };
};
