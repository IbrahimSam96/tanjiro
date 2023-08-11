/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: Jagobo (https://sketchfab.com/Jagobo)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/cherry-blossom-trees-f69be55d2e4f4f73b568ebb185bd8496
title: Cherry Blossom Trees
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Cherry(props) {
  const { nodes, materials } = useGLTF('/models/Cherry/scene.gltf')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[-0.07, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <mesh geometry={nodes.Object_4.geometry} material={materials.bark} />
          </group>
          <group position={[-0.07, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <mesh geometry={nodes.Object_6.geometry} material={materials.foliage} />
          </group>
          <group position={[88.12, 0, 0]} rotation={[Math.PI / 2, 0, -1.26]}>
            <mesh geometry={nodes.Object_8.geometry} material={materials.bark} />
          </group>
          <group position={[88.12, 0, 0]} rotation={[Math.PI / 2, 0, -1.26]}>
            <mesh geometry={nodes.Object_10.geometry} material={materials.foliage} />
            <mesh geometry={nodes.Object_11.geometry} material={materials.foliage} />
          </group>
          <group position={[-72.2, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <mesh geometry={nodes.Object_13.geometry} material={materials.bark} />
          </group>
          <group position={[-72.2, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <mesh geometry={nodes.Object_15.geometry} material={materials.foliage} />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/scene.gltf')
