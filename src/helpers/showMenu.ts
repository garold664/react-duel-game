import { Figure } from './classes';
import { PLAYER_RADIUS } from './constants';

function showMenu(
  setMenuState: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentPlayer: React.Dispatch<React.SetStateAction<'player1' | 'player2'>>,
  player1: Figure,
  player2: Figure
) {
  return (e: React.MouseEvent) => {
    e.preventDefault();
    const mouseX = e.nativeEvent.offsetX;
    const mouseY = e.nativeEvent.offsetY;
    if (
      mouseX > player1.x - PLAYER_RADIUS &&
      mouseX < player1.x + PLAYER_RADIUS &&
      mouseY > player1.y - PLAYER_RADIUS &&
      mouseY < player1.y + PLAYER_RADIUS
    ) {
      setCurrentPlayer('player1');
      setMenuState(true);
    }
    if (
      mouseX > player2.x - PLAYER_RADIUS &&
      mouseX < player2.x + PLAYER_RADIUS &&
      mouseY > player2.y - PLAYER_RADIUS &&
      mouseY < player2.y + PLAYER_RADIUS
    ) {
      setCurrentPlayer('player2');
      setMenuState(true);
    }
  };
}

export default showMenu;
