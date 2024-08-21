import Figure from '../classes/Figure';
import { PLAYER_RADIUS } from '../data/constants';

function showMenu(
  setMenuState: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentPlayer: React.Dispatch<React.SetStateAction<'player1' | 'player2'>>,
  player1: Figure,
  player2: Figure
) {
  const overlap = 30;
  const radius = PLAYER_RADIUS + overlap;
  return (e: React.MouseEvent) => {
    e.preventDefault();
    const mouseX = e.nativeEvent.offsetX;
    const mouseY = e.nativeEvent.offsetY;
    if (
      mouseX > player1.x - radius &&
      mouseX < player1.x + radius &&
      mouseY > player1.y - radius &&
      mouseY < player1.y + radius
    ) {
      setCurrentPlayer('player1');
      setMenuState(true);
    }
    if (
      mouseX > player2.x - radius &&
      mouseX < player2.x + radius &&
      mouseY > player2.y - radius &&
      mouseY < player2.y + radius
    ) {
      setCurrentPlayer('player2');
      setMenuState(true);
    }
  };
}

export default showMenu;
