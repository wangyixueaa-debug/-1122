
export const COLORS = {
  GOLD: "#D4AF37",
  EMERALD: "#004d3d",
  DEEP_EMERALD: "#013220",
  GOLD_BRIGHT: "#FFD700",
  WHITE_GLOW: "#FFFFFF",
  CRIMSON_LUXURY: "#8B0000"
};

export const TREE_CONFIG = {
  FOLIAGE_COUNT: 45000,
  ORNAMENT_COUNT: 300, // Increased to fill gaps from removed items
  GIFT_COUNT: 80,      // Increased base gifts
  LIGHT_COUNT: 400,    // More fairy lights for luxury feel
  TREE_HEIGHT: 12,
  TREE_RADIUS: 4,
  CHAOS_RADIUS: 15
};

export enum TreeState {
  CHAOS = 'CHAOS',
  FORMED = 'FORMED'
}
