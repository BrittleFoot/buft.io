/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { CameraControls, Environment, Sphere } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { KeyControlsHandler, KeyControlsProvider } from './key'

function SnakeScene() {
    const [mX, mY, mZ] = [100, 100, 100]

    return (
        <>
            <ambientLight intensity={0} />
            <Sphere position={[0, 0, 0]} args={[2, 16, 16]}>
                <meshStandardMaterial color="white" />
            </Sphere>

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
                <SnakeScene />

                <CameraControls makeDefault />
                <KeyControlsHandler />
            </Canvas>
        </KeyControlsProvider>
    )
}
