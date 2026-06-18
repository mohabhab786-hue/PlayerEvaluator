const KEY = "players";

export const getPlayers = () => {
  return JSON.parse(localStorage.getItem(KEY)) || [];
};

export const savePlayers = (players) => {
  localStorage.setItem(KEY, JSON.stringify(players));
};

export const addPlayer = (player) => {
  const players = getPlayers();
  players.push(player);
  savePlayers(players);
};

export const deletePlayer = (id) => {
  const players = getPlayers().filter((p) => p.id !== id);
  savePlayers(players);
};

export const updatePlayer = (updated) => {
  const players = getPlayers().map((p) =>
    p.id === updated.id ? updated : p
  );
  savePlayers(players);
};