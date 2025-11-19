import { PetStats, Mood } from '../types';

export const clampStat = (value: number): number => Math.max(0, Math.min(100, value));

export const calculateMood = (stats: PetStats): Mood => {
  const { happiness, hunger, energy, affection } = stats;

  // Priority-based mood calculation
  if (hunger < 20) return 'hungry';
  if (energy < 20) return 'sleepy';
  if (happiness > 80 && energy > 60) return 'playful';
  if (happiness > 90) return 'excited';
  if (happiness < 30) return 'grumpy';
  if (affection > 70 && happiness > 60) return 'happy';
  if (affection < 30) return 'lonely';

  return 'content';
};

export const getThoughtForMood = (mood: Mood): string => {
  const thoughts: Record<Mood, string[]> = {
    happy: [
      "I'm so happy right now! 😊",
      "Life is good!",
      "I love spending time with you!",
      "This is the best day ever!",
    ],
    sleepy: [
      "Yawn... so sleepy... 😴",
      "Maybe just a little nap...",
      "My eyes are getting heavy...",
      "Zzz... need sleep...",
    ],
    hungry: [
      "I'm so hungry! 🍖",
      "Feed me, please!",
      "My tummy is rumbling...",
      "Food would be nice right now...",
    ],
    playful: [
      "Let's play! 🎾",
      "I have so much energy!",
      "Wanna have some fun?",
      "Play with me, please!",
    ],
    grumpy: [
      "Hmph... 😠",
      "Not in the mood...",
      "Leave me alone for a bit...",
      "I'm feeling grumpy...",
    ],
    excited: [
      "OMG OMG OMG! ✨",
      "This is amazing!",
      "I can't contain my excitement!",
      "WOOHOO! 🎉",
    ],
    lonely: [
      "I miss you... 💔",
      "Where did you go?",
      "Please come back...",
      "It's lonely here...",
    ],
    content: [
      "Everything is peaceful~ 😌",
      "Just vibing...",
      "Life is okay!",
      "Feeling content!",
    ],
  };

  const moodThoughts = thoughts[mood];
  return moodThoughts[Math.floor(Math.random() * moodThoughts.length)];
};

export const getDialogueForAction = (action: string): string => {
  const dialogues: Record<string, string[]> = {
    feed: [
      "Nom nom nom! 😋",
      "Delicious!",
      "Thank you for the food!",
      "Yummy yummy!",
    ],
    play: [
      "Yay! Let's go! 🎮",
      "This is so fun!",
      "I love playing with you!",
      "Wheee! ✨",
    ],
    pet: [
      "That feels nice! 💕",
      "Purr~",
      "I love you!",
      "More pets please!",
    ],
    sleep: [
      "Good night! 🌙",
      "Sweet dreams...",
      "Time for bed!",
      "Zzz... zzz...",
    ],
    bathe: [
      "All clean now! ✨",
      "I feel refreshed!",
      "Squeaky clean!",
      "Much better!",
    ],
    treat: [
      "A special treat! 🍰",
      "You spoil me!",
      "Best day ever!",
      "So tasty!",
    ],
  };

  const actionDialogues = dialogues[action] || ["..."];
  return actionDialogues[Math.floor(Math.random() * actionDialogues.length)];
};

export const degradeStats = (stats: PetStats, deltaTime: number): PetStats => {
  // deltaTime in seconds
  const hungerRate = 0.5 / 60; // Loses 0.5 hunger per minute
  const energyRate = 0.3 / 60; // Loses 0.3 energy per minute
  const cleanlinessRate = 0.2 / 60; // Gets 0.2 dirtier per minute
  const happinessRate = 0.4 / 60; // Loses 0.4 happiness per minute when neglected

  return {
    happiness: clampStat(stats.happiness - happinessRate * deltaTime),
    hunger: clampStat(stats.hunger + hungerRate * deltaTime),
    energy: clampStat(stats.energy - energyRate * deltaTime),
    affection: stats.affection, // Affection doesn't degrade
    cleanliness: clampStat(stats.cleanliness - cleanlinessRate * deltaTime),
  };
};

export const applyStatChanges = (stats: PetStats, changes: Partial<PetStats>): PetStats => {
  return {
    happiness: clampStat(stats.happiness + (changes.happiness || 0)),
    hunger: clampStat(stats.hunger + (changes.hunger || 0)),
    energy: clampStat(stats.energy + (changes.energy || 0)),
    affection: clampStat(stats.affection + (changes.affection || 0)),
    cleanliness: clampStat(stats.cleanliness + (changes.cleanliness || 0)),
  };
};

export const getRandomPosition = (containerWidth: number, containerHeight: number) => {
  return {
    x: Math.random() * (containerWidth - 100),
    y: Math.random() * (containerHeight - 100),
  };
};
