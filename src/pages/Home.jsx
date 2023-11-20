import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Loader from '../components/Loader';
// import Island from '../models/island';
import Island from '../models/island.jsx';
import Sky from '../models/Sky.jsx';

const Home = () => {
  // const adjustIslandForScreensize = () => {
  //   let screenScale = null;
  //   let screenPostion = [0, -6.5, -43];
  //   let islandRotation = [0.1, 4.7, 0];
  //   if (window.innerWidth() < 768) {
  //     screenScale = [0.9, 0.9, 0.9];
  //   } else {
  //     screenScale = [1, 1, 1];
  //   }

  //   return [screenScale, screenPostion, islandRotation];
  // };
  const adjustIslandForScreensize = () => {
    let screenScale = null;
    let screenPostion = [0, -6.5, -43];
    let islandRotation = [0.1, 4.7, 0];
    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1, 1, 1];
    }

    return [screenScale, screenPostion, islandRotation];
  };

  const [islandScale, islandPosition, islandRotation] =
    adjustIslandForScreensize();

  return (
    <section className="w-full h-screen relative">
      {/* <div className="absolute top-28 left-0 right-0  z-10 flex items-center justify-center">
        POPUP
      </div> */}

      <Canvas
        className="w-full h-screen bg-transparent"
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
          <Sky />
          <Island
            position={islandPosition}
            sclae={islandScale}
            rotation={islandRotation}
          />
          <hemisphereLight />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;
/////////////////////////////////////////
