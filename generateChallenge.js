export const generateChallenge = () => {
  const bin = new Uint8Array(32);
  crypto.getRandomValues(bin);
  return bin;
};
