'use client'
import React, { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

function InstancedFallingMonks() {
  const count = 1000
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const { scene } = useGLTF('/sitting.glb')

  // Recursively search for the first mesh and provide fallback if not found.
  const { geometry, material } = useMemo(() => {
    let foundMesh: THREE.Mesh | undefined
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh && !foundMesh) {
        foundMesh = child as THREE.Mesh
      }
    })
    if (!foundMesh) {
      console.error(
        'No mesh found in GLTF, using fallback geometry and material.',
      )
      return {
        geometry: new THREE.BoxGeometry(),
        material: new THREE.MeshBasicMaterial({ color: 'hotpink' }),
      }
    }
    return { geometry: foundMesh.geometry, material: foundMesh.material }
  }, [scene])

  // Generate initial positions and speeds for each monk
  const monks = useMemo(() => {
    const arr = []
    for (let i = 0; i < count; i++) {
      arr.push({
        x: Math.random() * 10 - 5, // x in [-5, 5]
        y: Math.random() * 10 + 10, // y in [10, 20]
        z: Math.random() * 10 - 5, // z in [-5, 5]
        speed: Math.random() * 2 + 1, // speed between 1 and 3
      })
    }
    return arr
  }, [count])

  useFrame((_, delta) => {
    const dummy = new THREE.Object3D()
    for (let i = 0; i < count; i++) {
      const monk = monks[i]
      monk.y -= delta * monk.speed
      if (monk.y < -10) {
        monk.y = 10 + Math.random() * 5
      }
      dummy.position.set(monk.x, monk.y, monk.z)
      dummy.updateMatrix()
      meshRef.current?.setMatrixAt(i, dummy.matrix)
    }
    meshRef.current!.instanceMatrix.needsUpdate = true
  })

  return <instancedMesh ref={meshRef} args={[geometry, material, count]} />
}

export default function FallingMonksPage() {
  return (
    <Canvas camera={{ position: [0, 5, 15], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <InstancedFallingMonks />
    </Canvas>
  )
}
