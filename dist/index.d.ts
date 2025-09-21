export { ScaleViewport, createScaleViewport, type ScaleViewportConfig, type ScaleViewportElements } from './ScaleViewport';
import { ScaleViewport, createScaleViewport } from './ScaleViewport';
export declare const VERSION = "1.0.0";
declare global {
    interface Window {
        ScaleViewport?: typeof ScaleViewport;
        createScaleViewport?: typeof createScaleViewport;
    }
}
