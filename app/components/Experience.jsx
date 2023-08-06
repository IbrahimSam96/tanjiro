'use client'
import { Cylinder, MeshReflectorMaterial, OrbitControls, Stars } from "@react-three/drei";
import { CylinderCollider, RigidBody } from "@react-three/rapier";
import { Torii } from "./Torii";
import { Ethereum } from "./Ethereum";

export const Experience = () => {

    return (
        <>
            <OrbitControls />
            {/* Lights */}
            <ambientLight intensity={1} />
            <directionalLight
                position={[5, 5, 5]}
                intensity={0.8}
                color={'#9e69da'}
            />

            {/* Background */}
            <Stars radius={100} depth={500} count={5000} factor={4} saturation={0} fade speed={2} />

            <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[50, 50]} />
                <MeshReflectorMaterial
                    blur={[400, 400]}
                    resolution={1024}
                    mixBlur={1}
                    mixStrength={15}
                    depthScale={1}
                    minDepthThreshold={0.85}
                    color={'#dbecfb'}
                    metalness={0.6}
                    roughness={1}
                />
            </mesh>
            <group position-z={-3}>
                <spotLight color={"hotpink"} position={[2, 2, 7]} distance={10} />

                <Ethereum scale={[0.15, 0.15, 0.15]} position={[-1.5, 4.8, -13.8]} />
                <Ethereum scale={[0.15, 0.15, 0.15]} position={[1.5, 4.8, -13.8]} />

                <Torii scale={[0.008, 0.008, 0.008]} position={[-10, -1.5, -14]} rotation-y={-1.25 * Math.PI} />

                <Torii scale={[0.015, 0.015, 0.015]} position={[0, -1.5, -8]} rotation-y={1.5 * Math.PI} />

                <Torii scale={[0.008, 0.008, 0.008]} position={[5, -1.5, -10]} rotation-y={1.25 * Math.PI} />
            </group>

            {/* Arena */}
            <group position-y={-1}>
                <RigidBody colliders={false} type="fixed" position-y={-0.5} >
                    <CylinderCollider args={[1 / 2, 5]} />
                    <Cylinder scale={[5, 1, 5]} receiveShadow >
                        <meshStandardMaterial color={'white'} />
                    </Cylinder>
                </RigidBody>
            </group>
            {/*  */}
        </>
    )
}
