'use client';

import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// Preload the GLB model
useGLTF.preload('/models/ai_robot.glb');

// Premium easing function (Expo Out)
const easeOutExpo = (x: number): number => {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
};

// Hardcoded values for deterministic production rendering
// NOTE: The GLB model's raw geometry is only ~0.16 units tall (exported in
// centimeters with no node-scale transforms). At camera Z=7 / FOV=40°, the
// visible viewport height is ~5.1 units. A scale of 13.5 ensures the entire 
// model (including antenna and legs) remains fully visible without clipping.
const FINAL_SCALE = 13.5; 
const CAMERA_POSITION: [number, number, number] = [0, 0, 7];
const CONTACT_SHADOW_Y = -1.25; // Adjusted to match new scale
const ENTRANCE_START_Y = -1.5;

function RobotModel() {
  const { scene } = useGLTF('/models/ai_robot.glb');
  const groupRef = useRef<THREE.Group>(null);

  // 1. Compute bounds exactly ONE time inside useMemo
  // 2. Clone the scene safely so we do not mutate the cached instance
  // 3. Clone MATERIALS before mutating — scene.clone(true) shares material
  //    references with the cached useGLTF scene; mutating them directly
  //    corrupts the cache and compounds on every remount.
  const { clonedScene, center, box } = useMemo(() => {
    const cloned = scene.clone(true);
    cloned.updateMatrixWorld(true);

    const computedBox = new THREE.Box3().setFromObject(cloned);
    const computedCenter = new THREE.Vector3();
    computedBox.getCenter(computedCenter);

    // Material Improvements — clone each material before mutating
    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (mesh.material) {
          // Clone the material so we never mutate the shared cached instance
          if (Array.isArray(mesh.material)) {
            mesh.material = mesh.material.map((m) => {
              const clonedMat = (m as THREE.MeshStandardMaterial).clone();
              if (clonedMat.metalness !== undefined) {
                clonedMat.metalness = Math.min(1.0, clonedMat.metalness * 1.2);
              }
              return clonedMat;
            });
          } else {
            const mat = mesh.material as THREE.MeshStandardMaterial;
            const clonedMat = mat.clone();
            if (clonedMat.metalness !== undefined) {
              clonedMat.metalness = Math.min(1.0, clonedMat.metalness * 1.2);
            }
            mesh.material = clonedMat;
          }
        }
      }
    });

    return { clonedScene: cloned, center: computedCenter, box: computedBox };
  }, [scene]);

  // Log exactly once during initialization
  useEffect(() => {
    console.log("=== HERO ROBOT INITIALIZED ===");
    console.log("Bounding Box:", box);
    console.log("Final Scale:", FINAL_SCALE);
    console.log("Camera Position:", CAMERA_POSITION);
  }, [box]);

  const startTime = useMemo(() => Date.now(), []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const now = Date.now();
    const elapsed = (now - startTime) / 1000;

    // ENTRANCE ANIMATION
    let entranceProgress = Math.min(elapsed / 1.4, 1.0);
    const easedProgress = easeOutExpo(entranceProgress);

    // Animate scale ONLY during entrance. After 1.4s, this is deterministically FINAL_SCALE.
    const currentScale = FINAL_SCALE * (0.5 + 0.5 * easedProgress);

    // Entrance Position Y
    const entranceY = ENTRANCE_START_Y * (1 - easedProgress);

    // FLOATING ANIMATION
    const floatY = Math.sin(state.clock.elapsedTime * (Math.PI * 2 / 9)) * 0.15;

    const finalY = entranceY + floatY;

    // IDLE ROTATION
    const idleRotY = Math.sin(state.clock.elapsedTime * 0.5) * 0.07;
    const idleRotX = Math.cos(state.clock.elapsedTime * 0.4) * 0.035;

    // CURSOR TRACKING
    const maxCursorRot = 0.14;
    const targetCursorRotY = state.pointer.x * maxCursorRot;
    const targetCursorRotX = -state.pointer.y * maxCursorRot;

    const targetRotY = idleRotY + targetCursorRotY;
    const targetRotX = idleRotX + targetCursorRotX;

    // Apply single unified transforms to the wrapper group
    groupRef.current.scale.setScalar(currentScale);
    groupRef.current.position.set(0, finalY, 0);

    // Damping rotation
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, delta * 3);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, delta * 3);
  });

  // Initial props match the entrance animation's starting state exactly,
  // so there is no Frame-0 flash at default scale=1 / position=[0,0,0].
  return (
    <group ref={groupRef} scale={FINAL_SCALE * 0.5} position={[0, ENTRANCE_START_Y, 0]}>
      {/*
        Centering group: Shifts the model exactly by its negative center.
        The primitive receives NO animated transforms.
      */}
      <group position={[-center.x, -center.y, -center.z]}>
        <primitive object={clonedScene} dispose={null} />
      </group>

      {/* Fixed Contact Shadow */}
      <ContactShadows
        position={[0, CONTACT_SHADOW_Y, 0]}
        opacity={0.4}
        scale={12}
        blur={2}
        far={4}
        color="#000000"
      />
    </group>
  );
}

export default function HeroRobot() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 1, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: CAMERA_POSITION, fov: 40, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1
        }}
        style={{ pointerEvents: 'auto' }}
      >
        {/* Cinematic Lighting — these never suspend, always visible */}
        <ambientLight intensity={0.4} />
        <hemisphereLight groundColor="#000000" color="#ffffff" intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={2.0}
          color="#ffffff"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight position={[-5, 0, 5]} intensity={0.8} color="#ccff00" />
        <directionalLight position={[0, 5, -5]} intensity={1.5} color="#33ff99" />

        {/*
          CRITICAL FIX: Each async-loading component gets its OWN <Suspense>
          boundary.

          <Environment preset="city"> loads an HDR file from a CDN (drei-assets
          on GitHub). This load is async and SUSPENDS (throws a promise).

          In the original code, <Environment> was OUTSIDE the only <Suspense>
          boundary, so its suspension bubbled up to the Canvas root and
          UNMOUNTED the entire Canvas tree — including the robot, which was
          already loaded and visible. The user saw: robot appears (Frame 0) →
          Environment suspends → entire tree replaced with null → robot
          vanishes. If the CDN was slow or blocked, the robot never came back.

          By wrapping <Environment> in its own <Suspense>, only the Environment
          is hidden while its HDR loads. The robot stays mounted and visible.
        */}
        <React.Suspense fallback={null}>
          <Environment preset="city" environmentIntensity={0.3} />
        </React.Suspense>

        <React.Suspense fallback={null}>
          <RobotModel />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
