const add = new Audio("/add.mp3");
const remove = new Audio("/remove.mp3");
const error = new Audio("/error.mp3");

add.preload = "auto";
remove.preload = "auto";
error.preload = "auto";

function playSound(type: "add" | "remove" | "error" | "hint") {
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
}

export { playSound };
