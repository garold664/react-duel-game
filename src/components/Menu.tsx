import React from 'react';

interface MenuProps {
  setIsMenuShown: React.Dispatch<React.SetStateAction<boolean>>;
  currentPlayer: 'player1' | 'player2';
  bullet1Color: React.MutableRefObject<string>;
  bullet2Color: React.MutableRefObject<string>;
}

export default function Menu({
  setIsMenuShown,
  currentPlayer,
  bullet1Color,
  bullet2Color,
}: MenuProps) {
  return (
    <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 backdrop-blur-md border-primary-500 border-4 rounded-xl flex  flex-col justify-center items-center bg-primary-900/35 shadow-lg shadow-primary-900">
      <h2>{`Menu for ${currentPlayer}`}</h2>
      <input
        type="color"
        value={
          currentPlayer === 'player1'
            ? bullet1Color.current
            : bullet2Color.current
        }
        onChange={(e) => {
          if (currentPlayer === 'player1') {
            bullet1Color.current = e.target.value;
          } else {
            bullet2Color.current = e.target.value;
          }
        }}
      />
      <button onClick={() => setIsMenuShown(false)}>X</button>
    </div>
  );
}
