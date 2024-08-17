import { Figure } from './classes';
import { PLAYER_RADIUS } from './constants';

function toggleMenu(
  setMenuState: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentPlayer: React.Dispatch<React.SetStateAction<string>>,
  player1: Figure,
  player2: Figure
) {
  return (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuState((prevState) => !prevState);
    const mouseX = e.nativeEvent.offsetX;
    const mouseY = e.nativeEvent.offsetY;
    console.log(mouseX, mouseY);
    if (
      mouseX > player1.x - PLAYER_RADIUS &&
      mouseX < player1.x + PLAYER_RADIUS &&
      mouseY > player1.y - PLAYER_RADIUS &&
      mouseY < player1.y + PLAYER_RADIUS
    ) {
      setCurrentPlayer('player1');
    }
    if (
      mouseX > player2.x - PLAYER_RADIUS &&
      mouseX < player2.x + PLAYER_RADIUS &&
      mouseY > player2.y - PLAYER_RADIUS &&
      mouseY < player2.y + PLAYER_RADIUS
    ) {
      setCurrentPlayer('player2');
    }
  };
}

export default toggleMenu;
