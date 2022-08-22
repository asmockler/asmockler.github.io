// A big thank you to ertdfgcvb and play.core for inspiring this animation
// https://github.com/ertdfgcvb/play.core

import { getCharSize } from "./get-char-size";

const PATTERN = 'FAYxyz═|∞"^°*+~-·,. ';

const node = document.getElementById("animation-container");

let grid = [];
function setUpGrid() {
  const charSize = getCharSize();
  const dimension = Math.min(window.innerWidth, window.innerHeight);

  const margin = dimension > 600 ? 120 : 32;

  const maxGridSize = Math.floor(
    (dimension - margin) / Math.max(charSize.width, charSize.height)
  );

  grid = new Array(maxGridSize).fill(Array(maxGridSize).fill(0));
}

function loop(time: DOMHighResTimeStamp) {
  // "Shrinking" the time number makes the animation
  // appear to play back slower
  const normalizedTime = time / 10000;

  let output = "";

  grid.forEach((row, rowIndex) => {
    output += row
      .map((_, colIndex) => {
        const o =
          Math.sin(
            colIndex * Math.sin(normalizedTime) * 0.2 +
              rowIndex * 0.04 +
              normalizedTime
          ) * 12;

        const i =
          Math.round(Math.abs(colIndex + rowIndex + o)) % PATTERN.length;

        return PATTERN[i];
      })
      .join(" ");

    output += "\n";
  });

  node.textContent = output;

  requestAnimationFrame(loop);
}

window.addEventListener("resize", setUpGrid);

setTimeout(() => {
  setUpGrid();
  requestAnimationFrame(loop);
});
