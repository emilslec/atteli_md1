declare const canvas: HTMLCanvasElement;
declare const ctx: CanvasRenderingContext2D;
type RGB = {
    r: number;
    g: number;
    b: number;
};
declare class Particle {
    private x;
    private y;
    private speed;
    private angle;
    private radius;
    private color;
    private deathTime;
    private startTime;
    constructor(x: number, y: number, speed: number, angle: number, radius: number, color: RGB, deathTime: number, startTime: number);
    move(): void;
    draw(ctx: CanvasRenderingContext2D, time: number): void;
    isDead(time: number): boolean;
}
declare let midx: number;
declare let midy: number;
declare let spawnFrequency: number;
declare let speedModifier: number;
declare let spawnCountMultiplier: number;
declare function generateParticles(time: number): Particle[];
declare function begin(): Promise<void>;
declare function spawnListeners(): Promise<void>;
declare function sleep(ms: number): Promise<unknown>;
//# sourceMappingURL=main.d.ts.map