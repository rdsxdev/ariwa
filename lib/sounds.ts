const add = typeof Audio !== "undefined" ? new Audio("/add.mp3") : undefined;
const remove =
  typeof Audio !== "undefined" ? new Audio("/remove.mp3") : undefined;
const error =
  typeof Audio !== "undefined" ? new Audio("/error.mp3") : undefined;
const hint = typeof Audio !== "undefined" ? new Audio("/hint.mp3") : undefined;

if (add && remove && error && hint) {
  add.preload = "auto";
  remove.preload = "auto";
  error.preload = "auto";
  hint.preload = "auto";
}

function playSound(type: "add" | "remove" | "error" | "hint") {
  if (add && remove && error && hint) {
    if (type === "add") {
      add.currentTime = 0;
      add.play().catch((error) => {
        console.error("Playback prevented by browser autoplay policy:", error);
      });
    }
    if (type === "remove") {
      remove.currentTime = 0;
      remove.play().catch((error) => {
        console.error("Playback prevented by browser autoplay policy:", error);
      });
    }
    if (type === "error") {
      error.currentTime = 0;
      error.play().catch((error) => {
        console.error("Playback prevented by browser autoplay policy:", error);
      });
    }
    if (type === "hint") {
      hint.currentTime = 0;
      hint.play().catch((error) => {
        console.error("Playback prevented by browser autoplay policy:", error);
      });
    }
  }
}

export { playSound };
