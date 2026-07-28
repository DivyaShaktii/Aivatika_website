'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// Preload the GLB model
useGLTF.preload('/models/ai_robot.glb');

// Premium easing function (Expo Out)
const easeOutExpo = (x: number): number => {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
};

function RobotModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/ai_robot.glb');
  
  // Normalize the model exactly as requested
  const normalizedScene = useMemo(() => {
    // Clone the scene so we don't mutate the cached version directly if re-rendered
    const clonedScene = scene.clone();
    
    // 1. Calculate Bounding Box
    const box = new THREE.Box3().setFromObject(clonedScene);
    
    // 2. Calculate Center
    const center = new THREE.Vector3();
    box.getCenter(center);
    
    // 3. Calculate Size
    const size = new THREE.Vector3();
    box.getSize(size);
    
    // 4. Calculate Bounding Sphere
    const boundingSphere = new THREE.Sphere();
    box.getBoundingSphere(boundingSphere);
    
    // 5. Center the pivot (Translate geometry to center)
    // We move the scene exactly by the negative center
    clonedScene.position.x = -center.x;
    clonedScene.position.y = -center.y;
    clonedScene.position.z = -center.z;
    
    // 6. Normalize the scale
    // We want the maximum dimension of the robot to be roughly 4 units high/wide
    // to fit perfectly within the camera view
    const maxDimension = Math.max(size.x, size.y, size.z);
    const targetSize = 4.0;
    const scaleFactor = targetSize / maxDimension;
    
    // Apply scale to a wrapper group, NOT the scene directly, since the scene is translated
    const wrapperGroup = new THREE.Group();
    wrapperGroup.scale.set(scaleFactor, scaleFactor, scaleFactor);
    wrapperGroup.add(clonedScene);

    // 7. Material Improvements
    // Slightly boost exposure, metalness, and roughness if needed for premium aesthetic
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial | THREE.MeshPhysicalMaterial;
          // Subtly enhance metallic reflections without destroying artist intent
          if (mat.metalness !== undefined) {
             mat.metalness = Math.min(1.0, mat.metalness * 1.2);
          }
        }
      }
    });

    return wrapperGroup;
  }, [scene]);

  // Entrance animation state
  const [startTime, setStartTime] = useState(0);
  
  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    const now = Date.now();
    const elapsed = (now - startTime) / 1000;
    const entranceDuration = 1.4;
    
    // 1. ENTRANCE ANIMATION (Scale & Position Y)
    let entranceProgress = Math.min(elapsed / entranceDuration, 1.0);
    const easedProgress = easeOutExpo(entranceProgress);
    
    // Scale goes from 0.5 to 1.0
    const currentScale = 0.5 + (0.5 * easedProgress);
    groupRef.current.scale.setScalar(currentScale);
    
    // Position goes from -2 to 0
    const entranceY = -2 * (1 - easedProgress);
    
    // 2. IDLE FLOATING ANIMATION
    // Smooth sine wave, 8-10 seconds per cycle -> period = 9s -> frequency = 2PI/9
    const floatY = Math.sin(state.clock.elapsedTime * (Math.PI * 2 / 9)) * 0.15;
    
    // Combine Y positions
    groupRef.current.position.y = entranceY + floatY;

    // 3. IDLE ROTATION
    // Subtle rotation: ±4 degrees Y (0.07 rad), ±2 degrees X (0.035 rad)
    const idleRotY = Math.sin(state.clock.elapsedTime * 0.5) * 0.07;
    const idleRotX = Math.cos(state.clock.elapsedTime * 0.4) * 0.035;
    
    // 4. CURSOR TRACKING
    // state.pointer is normalized between -1 and 1
    // Max rotation 8 degrees = 0.14 radians
    const maxCursorRot = 0.14;
    const targetCursorRotY = state.pointer.x * maxCursorRot;
    const targetCursorRotX = -state.pointer.y * maxCursorRot; // Invert Y so it looks up when mouse is up
    
    // Combine idle and cursor target rotations
    const targetRotY = idleRotY + targetCursorRotY;
    const targetRotX = idleRotX + targetCursorRotX;
    
    // Smooth lerp for elegant movement (damping)
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, delta * 3);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, delta * 3);
  });

  // Handle Opacity entrance fade via a transparent overlay or materials
  // Since modifying all nested materials' opacity can cause sorting issues,
  // we rely on scale/position for the primary entrance feel, which matches premium standards.

  return (
    <group ref={groupRef}>
      <primitive object={normalizedScene} />
      
      {/* Soft Contact Shadow beneath the robot */}
      <ContactShadows 
        position={[0, -2.2, 0]} 
        opacity={0.4} 
        scale={5} 
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
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1
        }}
        // Re-enable pointer events for the canvas itself so cursor tracking works
        style={{ pointerEvents: 'auto' }}
      >
        {/* Soft Ambient Light */}
        <ambientLight intensity={0.4} />
        
        {/* Hemisphere Light for soft environmental fill */}
        <hemisphereLight groundColor="#000000" color="#ffffff" intensity={0.5} />

        {/* Directional Key Light (Sun) revealing metallic surfaces */}
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={2.0} 
          color="#ffffff" 
          castShadow 
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        
        {/* Fill Light to soften harsh shadows on the dark side */}
        <directionalLight position={[-5, 0, 5]} intensity={0.8} color="#ccff00" />
        
        {/* Rim Light for premium cinematic edges */}
        <directionalLight position={[0, 5, -5]} intensity={1.5} color="#33ff99" />
        
        {/* Subtle HDR Environment for soft metallic reflections without bright backgrounds */}
        <Environment preset="city" environmentIntensity={0.3} />
        
        <React.Suspense fallback={null}>
          <RobotModel />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
