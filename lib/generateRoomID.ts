export async function gameRoomID() {
  return Math.random().toString(36).substring(2, 8);
}
