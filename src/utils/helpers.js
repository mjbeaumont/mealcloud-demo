export const clone = ob => {
  return JSON.parse(JSON.stringify(ob));
};

export default {
  clone
};
