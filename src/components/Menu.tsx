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
    <div>
      {`Menu for ${currentPlayer}`}
      <input
        type="color"
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
