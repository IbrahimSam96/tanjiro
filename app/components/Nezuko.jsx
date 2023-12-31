/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: Snow (https://sketchfab.com/AikoX)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/nezuko-demon-slayer-6183e148ce8b4c088e7822b8d2a8e6fa
title: Nezuko Demon Slayer
*/

import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Nezuko(props) {

  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/models/Nezuko/scene.gltf')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={0.07}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Field_26" position={[1.78, -3.31, 10.14]} rotation={[-1.47, 0.15, 0.96]} scale={2.7} />
              <group name="NEZUKO_25">
                <group name="BAMBOO_6" position={[0.01, 0.24, 1.18]} rotation={[0, 0, -Math.PI / 2]} scale={[0.27, 0.62, 0.27]}>
                  <group name="BAMBOO_ROPE002_5" position={[1.12, -0.08, -3.48]} rotation={[0, 0, Math.PI / 2]} scale={[1.6, 3.64, 3.64]}>
                    <mesh name="Object_9" geometry={nodes.Object_9.geometry} material={materials['Material.007']} />
                  </group>
                  <mesh name="Object_7" geometry={nodes.Object_7.geometry} material={materials['Material.001']} />
                </group>
                <group name="belt_7" position={[-0.04, -4.16, 0]} scale={[1.64, 0.93, 1.64]}>
                  <mesh name="Object_11" geometry={nodes.Object_11.geometry} material={materials['Material.006']} />
                </group>
                <group name="BELT_BROWN001_9" position={[-0.04, -4.09, 0.23]}>
                  <mesh name="Object_13" geometry={nodes.Object_13.geometry} material={materials['Material.007']} />
                </group>
                <group name="BELT_GREEN001_11" position={[-0.04, -3.31, 0.23]} scale={[-1, 1, 1]}>
                  <mesh name="Object_15" geometry={nodes.Object_15.geometry} material={materials['Material.008']} />
                </group>
                <group name="COAT_12" position={[0.02, -3.6, -0.23]} rotation={[0, 0, 1.75]}>
                  <mesh name="Object_17" geometry={nodes.Object_17.geometry} material={materials['Material.023']} />
                </group>
                <group name="EYEBROWS_13" position={[2.11, 1.03, 0]}>
                  <mesh name="Object_19" geometry={nodes.Object_19.geometry} material={materials['Material.002']} />
                </group>
                <group name="EYELASHES_14" position={[-0.04, 1.07, 0.68]} rotation={[Math.PI / 2, 0, 0]} scale={10.77}>
                  <mesh name="Object_21" geometry={nodes.Object_21.geometry} material={materials['EyeLashes2.001']} />
                </group>
                <group name="HAIR_16" position={[-0.02, -2.29, -1.39]} rotation={[Math.PI / 2, 0, 0]} scale={[9.81, 9.41, 8.43]}>
                  <group name="HAIRBAND_15" position={[0.21, 0.22, -0.51]} rotation={[-Math.PI / 2, 0, 0]} scale={[0.04, 0.05, 0.05]}>
                    <mesh name="Object_26" geometry={nodes.Object_26.geometry} material={materials['Material.012']} />
                  </group>
                  <mesh name="Object_23" geometry={nodes.Object_23.geometry} material={materials.hair} />
                  <mesh name="Object_24" geometry={nodes.Object_24.geometry} material={materials['Material.013']} />
                </group>
                <group name="HAND_17" position={[-5.57, -5.5, -0.03]} rotation={[Math.PI / 2, -0.34, 0]} scale={1.29}>
                  <mesh name="Object_28" geometry={nodes.Object_28.geometry} material={materials.skin} />
                </group>
                <group name="KIMONO_BOTTOM_18" position={[-1.22, -9.03, 0.65]}>
                  <mesh name="Object_30" geometry={nodes.Object_30.geometry} material={materials['Material.020']} />
                </group>
                <group name="kIMONO_TOP_19" position={[0.05, -2.19, 0.01]} rotation={[0.85, 0, 0]}>
                  <mesh name="Object_32" geometry={nodes.Object_32.geometry} material={materials['Material.011']} />
                  <mesh name="Object_33" geometry={nodes.Object_33.geometry} material={materials['Material.015']} />
                </group>
                <group name="LEGS_23" position={[-0.91, -9.43, -0.05]} rotation={[Math.PI / 2, 0, 0]} scale={1.23}>
                  <group name="BOOTS_22" position={[0.04, -0.22, 4.6]} rotation={[-Math.PI / 2, 0, 0]} scale={0.81}>
                    <group name="BAMBOO_ROPE003_21" position={[0.82, -2.16, 0.55]}>
                      <mesh name="Object_42" geometry={nodes.Object_42.geometry} material={materials['Material.022']} />
                    </group>
                    <mesh name="Object_37" geometry={nodes.Object_37.geometry} material={materials['Material.016']} />
                    <mesh name="Object_38" geometry={nodes.Object_38.geometry} material={materials['Material.017']} />
                    <mesh name="Object_39" geometry={nodes.Object_39.geometry} material={materials['Material.018']} />
                    <mesh name="Object_40" geometry={nodes.Object_40.geometry} material={materials['Material.019']} />
                  </group>
                  <mesh name="Object_35" geometry={nodes.Object_35.geometry} material={materials.skin} />
                </group>
                <group name="EYES_24" position={[-0.04, 0.84, 0.67]} rotation={[Math.PI / 2, 0, 0]} scale={10.77}>
                  <mesh name="Object_44" geometry={nodes.Object_44.geometry} material={materials['new_animetest.001']} />
                </group>
                <mesh name="Object_4" geometry={nodes.Object_4.geometry} material={materials.skin} />
                <mesh name="Object_5" geometry={nodes.Object_5.geometry} material={materials['Material.014']} />
              </group>
              <group name="Plane_27" position={[0.3, -17.68, 0.65]} scale={29.32}>
                <mesh name="Object_47" geometry={nodes.Object_47.geometry} material={materials.material_0} />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/Nezuko/scene.gltf')
