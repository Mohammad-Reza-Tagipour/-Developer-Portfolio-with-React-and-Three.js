// import React from 'react';
// import { Link } from 'react-router-dom';

// const infoBox = ({ text, link, btnText }) => {
//   <div className="info-box">
//     {text}
//     <Link to={link}>{btnText}</Link>
//   </div>;
// };
// const renderContent = {
//   1: (
//     <h1 className="sm:text-xl sm:leading-snug text-center  neo-brutalism-blue py-4 px-8 text-white mx-5">
//       Hi I am <span className="font-semibold">Mohammad reza</span> 👋
//       <br />A FrontEnd Developer
//     </h1>
//   ),
//   2: (
//     <infoBox
//       className=" sm:text-xl sm:leading-snug text-center  neo-brutalism-blue py-4 px-8 text-white mx-5"
//       text="Worked with many companies and picked many skills along the way"
//     />
//   ),
//   3: (
//     <h1 className="sm:text-xl sm:leading-snug text-center  neo-brutalism-blue py-4 px-8 text-white mx-5">
//       3
//     </h1>
//   ),
//   4: (
//     <h1 className="sm:text-xl sm:leading-snug text-center  neo-brutalism-blue py-4 px-8 text-white mx-5">
//       4
//     </h1>
//   ),
// };

// const HomeInfo = ({ currentStage }) => {
//   return renderContent[currentStage] || null;
// };

// export default HomeInfo;

/////////////
import { Link } from 'react-router-dom';

import { arrow } from '../assets/icons';

const HomeInfo = ({ currentStage }) => {
  if (currentStage === 1)
    return (
      <h1 className="sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5">
        Hi, I'm
        <span className="font-semibold mx-2 text-white">Mohammad reza</span>
        👋
        <br />A Front-end developer
      </h1>
    );

  if (currentStage === 2) {
    return (
      <div className="info-box">
        <p className="font-medium sm:text-xl text-center">
          Worked with many Front-end techs <br /> and picked up many skills
          along the way
        </p>

        <Link to="/about" className="neo-brutalism-white neo-btn">
          Learn more
          <img src={arrow} alt="arrow" className="w-4 h-4 object-contain" />
        </Link>
      </div>
    );
  }

  if (currentStage === 3) {
    return (
      <div className="info-box">
        <p className="font-medium text-center sm:text-xl">
          About My Projects
          <br />
          🚀
        </p>

        <Link to="/projects" className="neo-brutalism-white neo-btn">
          Visit my portfolio
          <img src={arrow} alt="arrow" className="w-4 h-4 object-contain" />
        </Link>
      </div>
    );
  }

  if (currentStage === 4) {
    return (
      <div className="info-box">
        <p className="font-medium sm:text-xl text-center">
          Need a project done or looking for a dev? <br /> I'm just a few
          keystrokes away
        </p>

        <Link to="/contact" className="neo-brutalism-white neo-btn">
          Let's talk
          <img src={arrow} alt="arrow" className="w-4 h-4 object-contain" />
        </Link>
      </div>
    );
  }

  return null;
};

export default HomeInfo;
