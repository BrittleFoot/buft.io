/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { CameraControls, Environment, useGLTF } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { KeyControlsHandler, KeyControlsProvider } from './key'

function Monk() {
    // Load the GLB file
    const obj = useGLTF('/sitting.glb')
    const { scene, animations } = obj

    // Animation mixer reference
    const mixer = useRef<THREE.AnimationMixer | null>(null)

    useEffect(() => {
        // Initialize the AnimationMixer when the component mounts
        mixer.current = new THREE.AnimationMixer(scene)

        // Play the first animation clip
        const action = mixer.current.clipAction(animations[0])
        action.play()

        // Cleanup the mixer when the component unmounts
        return () => {
            mixer.current?.stopAllAction()
        }
    }, [scene, animations])

    // Update the animation on every frame
    useFrame((state, delta) => {
        if (mixer.current) mixer.current.update(delta) // Advance animation based on time
    })

    return (
        <mesh position={[0.0, 0.0, 0.0]}>
            <primitive object={scene} />
        </mesh>
    )
}

function Rock() {
    // Load the GLB file
    const obj = useGLTF('/rock.glb')

    return (
        <mesh
            scale={2}
            position={[-1.8, -0.9, -0.3]}
            rotation={[0, (7 * Math.PI) / 4, 0]}
        >
            <primitive object={obj.scene} />
        </mesh>
    )
}

function Olympus() {
    return (
        <>
            <Monk />
            <Rock />
        </>
    )
}

function _Scene() {
    const [mX, mY, mZ] = [100, 100, 100]

    return (
        <>
            <ambientLight intensity={0} />
            {/* <Sphere position={[0, 0, 0]} args={[2, 16, 16]}>
                <meshStandardMaterial color="white" />
            </Sphere> */}

            <pointLight
                position={[mX / 2, mY / 2, -mZ / 4]}
                decay={0}
                intensity={Math.PI * 2}
            />

            <pointLight
                position={[mX / 2, mY / 2, mZ * 2]}
                decay={0}
                intensity={Math.PI * 1}
            />

            <Environment preset="sunset" />

            <Olympus />

            <EffectComposer>
                <Bloom luminanceThreshold={0.5} intensity={0.1} />
            </EffectComposer>
        </>
    )
}

export function Scene() {
    return (
        <KeyControlsProvider>
            <Canvas shadows>
                <_Scene />

                <CameraControls makeDefault />
                <KeyControlsHandler />
            </Canvas>
        </KeyControlsProvider>
    )
}
