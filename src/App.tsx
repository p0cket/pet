import { usePetState } from './hooks/usePetState';
import { Pet } from './components/Pet';
import { ThoughtBubble } from './components/ThoughtBubble';
import { DialogueBubble } from './components/DialogueBubble';
import { StatsDisplay } from './components/StatsDisplay';
import { InteractionPanel } from './components/InteractionPanel';
import { ParticleEffect } from './components/ParticleEffect';
import './App.css';

function App() {
  const { petState, interact, petClick } = usePetState();

  return (
    <div className="app">
      <div className="background" />

      <StatsDisplay stats={petState.stats} />

      <Pet
        mood={petState.mood}
        activity={petState.activity}
        direction={petState.direction}
        position={petState.position}
        onClick={petClick}
      />

      <ThoughtBubble
        thought={petState.thought}
        position={petState.position}
      />

      <DialogueBubble
        dialogue={petState.dialogue}
        position={petState.position}
      />

      <ParticleEffect
        position={petState.position}
        mood={petState.mood}
      />

      <InteractionPanel onInteract={interact} />

      <div className="title">
        <h1>🐾 Pochi - Your Virtual Pet 🐾</h1>
        <p>Click on your pet to show love! Use the buttons below to interact.</p>
      </div>
    </div>
  );
}

export default App;
