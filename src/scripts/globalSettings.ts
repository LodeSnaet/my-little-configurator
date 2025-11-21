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

    "/configure/sole": {
        position: [1.9899999999999953, -1.277700000000001, 2.2399999999999984] as [number, number, number],
        rotation: [4.329999999999991, -0.1600000000000088, 7.199999999999945] as [number, number, number],
        scale: 2.6 as number,
    },
    "/configure/body": {
        position: [0.04, 1.7000000000000064, -1.5399999999999996] as [number, number, number],
        rotation: [0.8300000000000005, 0.10999999999999999, -0.47000000000000025] as [number, number, number],
        scale: 2.6 as number,
    },
    "/configure/tip": {
        position: [-0.6099999999999995, 5.672299999999978, 2.15] as [number, number, number],
        rotation: [0.8300000000000005, 0.10999999999999999, -6.71] as [number, number, number],
        scale: 2.6 as number,
    }
};


export const materialMap: Record<string, string[]> = {
    "sole": ["darkblue", "purple"],
    "body": ["red", "white", "black"],
    "tip": ["teal", "pink", "rebeccapurple"]
};