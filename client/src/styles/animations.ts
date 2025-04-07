// styles/animations.ts
export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const slideIn = {
  hidden: { opacity: 0, x: "-100%" },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};
