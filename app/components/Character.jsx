import React, { useEffect, useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { Clone } from "@react-three/drei";

export const Character = (props) => {

    const Ref = useRef();

    const url = "models/Hisoka/scene.gltf"
    const gltf = useLoader(GLTFLoader, url);


    useEffect(() => {
        // gltf.scene.scale.set(0.0005, 0.0005, 0.0005);

        gltf.scene.traverse((object) => {
            if (object instanceof Mesh) {
                object.castShadow = true;
                object.receiveShadow = true;
                // object.material.envMapIntensity = 20;
                // object.scale.multiplyScalar(0.01)
            }
        })

    }, [gltf])

    return (
        <group ref={Ref}>
            <primitive object={gltf.scene}  {...props} />
        </group>
    )
}