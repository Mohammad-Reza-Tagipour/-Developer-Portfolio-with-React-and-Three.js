import { skills } from '../constants';

const About = () => {
  return (
    <section className="max-container">
      <h1 className="head-text">
        Hello I'm
        <span className="blue-gradient_text font-semibold drop-shadow ">
          Mohammad reza
        </span>
      </h1>
      <div>
        <p className="mt-5 flex flex-col gap-3 text-slate-500">
          👋 Front-end developer specializing in creating captivating user
          interfaces and seamless web experiences
        </p>
      </div>
      <div className="py-10 flex flex-col">
        <h3 className="subhead-text ">My skills</h3>
        <div className="mt-16 flex flex-wrap gap-12">
          {skills.map((skill) => {
            <div>
              <div>
                <img
                  src={skill.imageUrl}
                  alt={skill.name}
                  className="w-1/2 h-1/2 object-contain"
                />
              </div>
              ;
            </div>;
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
