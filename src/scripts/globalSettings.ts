export const cameraSettings = {
    fov: 45,
    near: 0.1,
    far: 200,
    position: [0, 6, 12] as const,
}

export const pageConfig = {
    "/": {
        position: [2.08, 0.3223, 2.15] as [number, number, number],
        rotation: [3.96, -2.08, 4.04] as [number, number, number],
        scale: 2.6 as number,
    },
    "/configure": {
        position: [-2.699999999999992, 0.9823000000000004, 1.5000000000000027] as [number, number, number],
        rotation: [3.96, 2.08, -4.04] as [number, number, number],
        scale: 2.6 as number,
    },
};


export const materialMap: Record<string, string[]> = {
    "sole": ["darkblue", "purple"],
    "body": ["red", "white", "black"],
};