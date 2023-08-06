import React, { useEffect, useRef, useState } from "react";
import { useLoader } from "@react-three/fiber";
import { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Clone } from "@react-three/drei";

export const Torii = (props) => {

    const Ref = useRef();

    const url = "models/Torii/scene.gltf"
    const gltf = useLoader(GLTFLoader, url);

        useEffect(() => {
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
                <Clone object={gltf.scene}  {...props} />
            </group>
        )
    }