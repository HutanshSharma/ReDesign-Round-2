import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

function Train({ offset = 0 }) {
  const trainRef = useRef<THREE.Group>(null);
  const speed = 5;
  const loopWidth = 120; // Increased loop width for more distance

  useFrame((state, delta) => {
    if (trainRef.current) {
      trainRef.current.position.x -= delta * speed;
      
      // Calculate opacity based on position for "fade away" effect
      const x = trainRef.current.position.x;
      const fadeDistance = 20; // Longer fade for smoother transition
      const halfLoop = loopWidth / 2;
      
      // Fade out starts earlier (ahead) and reaches 0 before the hard loop point
      let opacity = 1;
      if (x < -halfLoop + fadeDistance) {
        opacity = Math.max(0, (x + halfLoop - 5) / (fadeDistance - 5));
      } else if (x > halfLoop - fadeDistance) {
        opacity = Math.max(0, (halfLoop - x - 5) / (fadeDistance - 5));
      }

      trainRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (Array.isArray(child.material)) {
            child.material.forEach(m => {
              m.transparent = true;
              m.opacity = opacity;
            });
          } else {
            child.material.transparent = true;
            child.material.opacity = opacity;
          }
        }
      });

      // Seamless loop logic
      if (trainRef.current.position.x < -halfLoop) {
        trainRef.current.position.x += loopWidth;
      }
    }
  });

  return (
    <group ref={trainRef} position={[offset, 0, 0]} scale={[1.4, 1.4, 1.4]}>
      {/* Engine - Aerodynamic Front */}
      <group position={[0, 0.8, 0]}>
        {/* Main Body with Curved Edges */}
        <RoundedBox args={[3.5, 1.2, 1.1]} radius={0.15} smoothness={4} castShadow>
          <meshStandardMaterial color="#0052D4" roughness={0.2} metalness={0.6} />
        </RoundedBox>
        
        {/* Silver Stripe along the side */}
        <mesh position={[0, 0, 0.56]}>
          <boxGeometry args={[3.5, 0.1, 0.02]} />
          <meshStandardMaterial color="#C0C0C0" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, -0.56]}>
          <boxGeometry args={[3.5, 0.1, 0.02]} />
          <meshStandardMaterial color="#C0C0C0" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Headlights */}
        <mesh position={[-1.7, -0.3, 0.35]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
        </mesh>
        <mesh position={[-1.7, -0.3, -0.35]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
        </mesh>
        
        {/* Sloped Front */}
        <mesh position={[-1.75, -0.1, 0]} rotation={[0, 0, Math.PI / 6]}>
          <boxGeometry args={[1, 1.2, 1.1]} />
          <meshStandardMaterial color="#0052D4" roughness={0.2} metalness={0.6} />
        </mesh>

        {/* Windshield */}
        <mesh position={[-1.8, 0.3, 0]} rotation={[0, 0, Math.PI / 6]}>
          <planeGeometry args={[0.8, 0.6]} />
          <meshStandardMaterial color="#1a1a1a" emissive="#003366" emissiveIntensity={0.8} />
        </mesh>

        {/* Roof Detail / Pantograph Base - More detailed */}
        <group position={[0, 0.65, 0]}>
          <mesh>
            <boxGeometry args={[2.5, 0.1, 0.8]} />
            <meshStandardMaterial color="#003a96" metalness={0.5} />
          </mesh>
          {/* Pantograph structure */}
          <mesh position={[0.5, 0.2, 0]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.05, 0.5, 0.05]} />
            <meshStandardMaterial color="#333" />
          </mesh>
          <mesh position={[0.8, 0.4, 0]} rotation={[0, 0, -Math.PI / 4]}>
            <boxGeometry args={[0.05, 0.5, 0.05]} />
            <meshStandardMaterial color="#333" />
          </mesh>
        </group>
        
        {/* Wheels - Adjusted Position for Visibility */}
        {[-1.2, 1.2].map((x) => (
          <group key={x} position={[x, -0.65, 0]}>
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.5]}>
              <cylinderGeometry args={[0.25, 0.25, 0.2, 16]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.5]}>
              <cylinderGeometry args={[0.25, 0.25, 0.2, 16]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
          </group>
        ))}
      </group>
      
      {/* Bogies / Coaches */}
      {[1, 2, 3, 4].map((i) => (
        <group key={i} position={[i * 3.85, 0.8, 0]}>
          {/* Coach Body with Curved Edges */}
          <RoundedBox args={[3.8, 1.2, 1.1]} radius={0.15} smoothness={4} castShadow>
            <meshStandardMaterial color="#0052D4" roughness={0.3} metalness={0.4} />
          </RoundedBox>
          
          {/* Silver Stripe for Coaches too */}
          
          
          {/* Windows - Emissive for "High-end" look */}
          {[-1.2, -0.4, 0.4, 1.2].map((x, j) => (
            <group key={j}>
              <mesh position={[x, 0.1, 0.56]}>
                <planeGeometry args={[0.5, 0.4]} />
                <meshStandardMaterial color="#88ccff" emissive="#224466" emissiveIntensity={0.2} />
              </mesh>
              <mesh position={[x, 0.1, -0.56]} rotation={[0, Math.PI, 0]}>
                <planeGeometry args={[0.5, 0.4]} />
                <meshStandardMaterial color="#88ccff" emissive="#224466" emissiveIntensity={0.2} />
              </mesh>
            </group>
          ))}

          {/* Connector */}
          <mesh position={[-2, -0.1, 0]}>
            <boxGeometry args={[0.4, 0.6, 0.6]} />
            <meshStandardMaterial color="#111" />
          </mesh>

          {/* Wheels - Adjusted Position for Visibility */}
          {[-1.3, 1.3].map((x) => (
            <group key={x} position={[x, -0.65, 0]}>
              <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.5]}>
                <cylinderGeometry args={[0.25, 0.25, 0.2, 16]} />
                <meshStandardMaterial color="#000000" />
              </mesh>
              <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.5]}>
                <cylinderGeometry args={[0.25, 0.25, 0.2, 16]} />
                <meshStandardMaterial color="#000000" />
              </mesh>
            </group>
          ))}
        </group>
      ))}
    </group>
  );
}

function Landscape() {
  // Infinite track effect
  const trackRef = useRef<THREE.Group>(null);
  const speed = 5;

  useFrame((state, delta) => {
    if (trackRef.current) {
      // We don't move the track if the train is moving, 
      // but we can move the environment for extra speed feel
    }
  });

  const tracks = useMemo(() => {
    const items = [];
    for (let i = -100; i < 100; i += 2) {
      items.push(i);
    }
    return items;
  }, []);

  const trees = useMemo(() => {
    const items = [];
    for (let i = 0; i < 40; i++) {
      items.push({
        x: Math.random() * 200 - 100,
        z: Math.random() * 20 - 30,
        scale: 0.5 + Math.random() * 1
      });
    }
    return items;
  }, []);

  return (
    <group>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#e8e8e8" />
      </mesh>

      {/* Rails */}
      <mesh position={[0, 0.05, 0.35]}>
        <boxGeometry args={[200, 0.05, 0.08]} />
        <meshStandardMaterial color="#444" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.05, -0.35]}>
        <boxGeometry args={[200, 0.05, 0.08]} />
        <meshStandardMaterial color="#444" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Sleepers */}
      {tracks.map((x) => (
        <mesh key={x} position={[x, 0.02, 0]}>
          <boxGeometry args={[0.3, 0.04, 1.2]} />
          <meshStandardMaterial color="#553311" />
        </mesh>
      ))}

      {/* Trees */}
      {trees.map((tree, i) => (
        <group key={i} position={[tree.x, 0, tree.z]} scale={tree.scale}>
          <mesh position={[0, 0.5, 0]} castShadow>
            <cylinderGeometry args={[0.15, 0.2, 1]} />
            <meshStandardMaterial color="#442200" />
          </mesh>
          <mesh position={[0, 1.8, 0]} castShadow>
            <coneGeometry args={[1, 2.5, 8]} />
            <meshStandardMaterial color="#1b4d1b" />
          </mesh>
        </group>
      ))}

      {/* Distant Mountains */}
      <mesh position={[0, -2, -50]} rotation={[0, 0, 0]}>
        <coneGeometry args={[40, 20, 4]} />
        <meshStandardMaterial color="#d1d1d1" />
      </mesh>
      <mesh position={[-60, -2, -60]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[30, 15, 4]} />
        <meshStandardMaterial color="#c0c0c0" />
      </mesh>
    </group>
  );
}

export default function TrainScene() {
  return (
    <div className="w-full h-[40vh] md:h-[50vh] bg-slate-50 overflow-hidden relative">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[15, 8, 20]} fov={30} />
        <ambientLight intensity={0.5} />
        <pointLight position={[20, 20, 20]} intensity={1} castShadow />
        <directionalLight 
          position={[-10, 20, 10]} 
          intensity={1.5} 
          castShadow 
          shadow-mapSize={[1024, 1024]}
        />
        
        <Float speed={2} rotationIntensity={0.05} floatIntensity={0.1}>
          {/* Two trains for seamless looping with increased distance */}
          <Train offset={0} />
          <Train offset={50} />
        </Float>
        
        <Landscape />
        
        <Environment preset="sunset" />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          maxPolarAngle={Math.PI / 2.1} 
          minPolarAngle={Math.PI / 6}
        />
      </Canvas>
      
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none" />
    </div>
  );
}

