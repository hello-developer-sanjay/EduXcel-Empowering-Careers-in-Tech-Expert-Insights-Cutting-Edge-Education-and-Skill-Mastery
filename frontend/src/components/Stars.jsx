import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars as StarsBase, OrbitControls, Preload } from '@react-three/drei';

const Stars = (props) => {
  const ref = useRef();

  useFrame((state, delta) => {
    ref.current.rotation.x += 0.0005 * delta;
    ref.current.rotation.y += 0.0002 * delta;
  });

  return (
    <group ref={ref}>
      <StarsBase
        radius={100} 
        depth={20}
        count={5000}
        factor={5} 
        saturation={0}
        fade
        {...props}
      />
    </group>
  );
};

const StarsCanvas = () => {
  return (
    <div className="w-full h-screen absolute inset-0 z-[-1]">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <OrbitControls autoRotate />
        <Suspense fallback={null}>
          <Stars />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
