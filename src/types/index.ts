export interface PetStats {
  happiness: number;
  hunger: number;
  energy: number;
  affection: number;
  cleanliness: number;
}

export type Mood =
  | 'happy'
  | 'sleepy'
  | 'hungry'
  | 'playful'
  | 'grumpy'
  | 'excited'
  | 'lonely'
  | 'content';

export type Activity =
  | 'idle'
  | 'walking'
  | 'eating'
  | 'sleeping'
  | 'playing'
  | 'jumping';

export interface PetState {
  stats: PetStats;
  mood: Mood;
  activity: Activity;
  position: { x: number; y: number };
  direction: 'left' | 'right';
  thought: string;
  dialogue: string;
  lastInteraction: number;
}

export interface InteractionType {
  id: string;
  name: string;
  icon: string;
  effect: Partial<PetStats>;
  cooldown: number;
  thought: string;
  dialogue: string;
}
