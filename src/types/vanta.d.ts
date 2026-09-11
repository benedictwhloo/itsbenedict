declare module "vanta/dist/vanta.globe.min" {
  import type * as THREE from "three";

  interface VantaGlobeOptions {
    el: HTMLElement;
    THREE: typeof THREE;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    color?: number;
    color2?: number;
    backgroundColor?: number;
    size?: number;
  }

  interface VantaEffect {
    destroy: () => void;
  }

  const GLOBE: (options: VantaGlobeOptions) => VantaEffect;
  export default GLOBE;
}

declare module "vanta/dist/vanta.net.min" {
  import type * as THREE from "three";

  interface VantaNetOptions {
    el: HTMLElement;
    THREE: typeof THREE;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    color?: number;
    color2?: number;
    backgroundColor?: number;
    size?: number;
  }

  interface VantaEffect {
    destroy: () => void;
  }

  const NET: (options: VantaNetOptions) => VantaEffect;
  export default NET;
}
