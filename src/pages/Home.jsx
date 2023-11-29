import { Canvas } from '@react-three/fiber';
import { Suspense, useState, useEffect, useRef } from 'react';
import Loader from '../components/Loader';
// import Island from '../models/island';
import Island from '../models/island.jsx';
import Sky from '../models/Sky.jsx';
import Bird from '../models/Bird.jsx';
import Plane from '../models/Plane.jsx';
import HomeInfo from '../components/HomeInfo.jsx';

import sakura from '../assets/sakura.mp3';
import autoprefixer from 'autoprefixer';
import { soundoff, soundon } from '../assets/icons/index.js';
const Home = () => {
  const audioRef = useRef(new Audio(sakura));
  audioRef.current.volume = 0.4;
  audioRef.current.loop = true;

  const [isRotating, setIsRotating] = useState(false);

  const [currentStage, setCurrentStage] = useState(1);

  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  useEffect(() => {
    if (isPlayingMusic) {
      audioRef.current.play();
    }
    return () => {
      audioRef.current.pause();
    };
  }, [isPlayingMusic]);
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
      <div className="absolute top-35 left-0 right-0  z-10 flex items-center justify-center">
        {currentStage && <HomeInfo currentStage={currentStage} />}
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
            scale={islandScale}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
          <Plane
            isRotating={isRotating}
            scale={planeScale}
            position={planePosition}
            rotation={[0, 20, 0]}
          />
          <hemisphereLight />
        </Suspense>
      </Canvas>

      <div className="absolute bottom-2 left-2">
        <img
          src={!isPlayingMusic ? soundoff : soundon}
          alt="sound"
          className="w-10 h-10 cursor-pointer object-contain"
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
        />
      </div>
    </section>
  );
};

export default Home;
/////////////////////////////////////////
