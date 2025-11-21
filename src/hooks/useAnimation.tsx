import {useEffect} from "react";
import {gsap} from "gsap";

type PageConfig = { position: number[], rotation: number[], scale: number };

export const useAnimation = (shoeRef: any, prevPageConfig: PageConfig, currentPageConfig: PageConfig, path: string) => {
    useEffect(() => {
        const shoeObject = shoeRef.current;
        if (!shoeObject) return;

        const commonGsapProperties = {
            duration: 0.8,
            repeat: 0,
            ease: "power2.inOut",
        };

        const animationTargets = [
            {
                target: shoeObject.position,
                prevValues: prevPageConfig.position,
                targetValues: currentPageConfig.position
            },
            {
                target: shoeObject.rotation,
                prevValues: prevPageConfig.rotation,
                targetValues: currentPageConfig.rotation
            },
        ];

        animationTargets.forEach(({target, prevValues, targetValues}) => {
            gsap.killTweensOf(target);
            gsap.fromTo(target,
                {x: prevValues[0], y: prevValues[1], z: prevValues[2]},
                {...commonGsapProperties, x: targetValues[0], y: targetValues[1], z: targetValues[2]}
            );
        });
    }, [path, currentPageConfig, prevPageConfig]);
};
