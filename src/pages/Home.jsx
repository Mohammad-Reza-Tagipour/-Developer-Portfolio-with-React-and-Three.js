import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import Loader from '../components/Loader';
// import Island from '../models/island';
import Island from '../models/island.jsx';
import Sky from '../models/Sky.jsx';
import Bird from '../models/Bird.jsx';
import Plane from '../models/Plane.jsx';

const Home = () => {
  const [isRotating, setIsRotating] = useState(false);

  const [currentStage, setCurrentStage] = useState(1);

  const adjustIslandForScreensize = () => {
    let screenScale = null;
    let screenPostion = [0, -6.5, -43];
    let islandRotation = [0, 0, 0];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1, 1, 1];
    }

    return [screenScale, screenPostion, islandRotation];
  };
  const adjustPlaneForScreensize = () => {
    // let screenScale = null;
    let screenPostion, screenScale;
    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPostion = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPostion = [0, -4, -4];
    }

    return [screenScale, screenPostion];
  };

  const [islandScale, islandPosition, islandRotation] =
    adjustIslandForScreensize();

  const [planeScale, planePosition] = adjustPlaneForScreensize();

  return (
    <section className="w-full h-screen relative">
      <div className="absolute top-28 left-0 right-0  z-10 flex items-center justify-center">
        POPUP
      </div>

      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        {/* suspense usful for loading screen */}
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          {/* <spotLight /> */}
          <hemisphereLight
            skyColor="#b1e1ff"
            groundColor="#000000"
            intensity={1}
          />

          <Bird isRotating={isRotating} />
          <Sky isRotating={isRotating} />
          <Island
            position={islandPosition}
            sclae={islandScale}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
          <Plane
            isRotating={isRotating}
            planeScale={planeScale}
            planePosition={planePosition}
            rotation={[0, 20, 0]}
          />
          <hemisphereLight />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;
/////////////////////////////////////////
