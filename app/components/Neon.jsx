import React, { useEffect, useRef, useState } from "react";
import { useLoader } from "@react-three/fiber";
import { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";


export const Neon = ({ position, scale }) => {

    const Ref = useRef();

    const url = "models/Neon/scene.gltf"
    const gltf = useLoader(GLTFLoader, url);

        useEffect(() => {
            // gltf.scene.scale.set(0.05, 0.005, 0.005);

            gltf.scene.traverse((object) => {
                if (object instanceof Mesh) {
                    object.castShadow = true;
                    object.receiveShadow = true;
                    object.material.envMapIntensity = 20;

                }
            })

        }, [gltf])

        return (
            <group ref={Ref}>
                <primitive object={gltf.scene} position={position} scale={scale} />
            </group>
        )
    }