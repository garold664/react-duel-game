import { useState } from 'react';
import GameBoard from './components/GameBoard';
import Menu from './components/Menu';
import { player1, player2 } from './helpers/players';
import PlayerControls from './components/PlayerControls';

export default function App() {
  const [isMenuShown, setIsMenuShown] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<'player1' | 'player2'>(
    'player1'
  );

  return (
    <>
      {isMenuShown && (
        <Menu
          key={currentPlayer}
          setIsMenuShown={setIsMenuShown}
          currentPlayer={currentPlayer === 'player1' ? player1 : player2}
        />
      )}
      <h1 className="text-center text-7xl mb-12">React Duel Game</h1>
      <div className="flex justify-center items-center gap-x-6">
        <PlayerControls player={player1} />
        <GameBoard
          setIsMenuShown={setIsMenuShown}
          setCurrentPlayer={setCurrentPlayer}
        />
        <PlayerControls player={player2} />
      </div>
    </>
  );
}
