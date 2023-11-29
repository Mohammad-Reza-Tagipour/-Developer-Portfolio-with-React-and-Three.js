import { Suspense, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Canvas } from '@react-three/fiber';
import Fox from '../models/Fox.jsx';
import Loader from '../components/Loader.jsx';
import useAlert from '../hooks/useAlert.js';
import Alert from '../components/Alert.jsx';
// import { Loader } from '@react-three/drei';
const Contact = ({}) => {
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [currentAnimation, setcurrentAnimation] = useState('idle');

  const { alert, showAlert, hideAlert } = useAlert();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setcurrentAnimation('hit');
    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: 'Mohammad reza',
          from_email: form.email,
          to_email: 'mohammadrezatagipour45@gmail.com',
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setIsLoading(false);

        //Show success message
        showAlert({
          show: true,
          text: 'Message sent succesfully',
          type: 'success',
        });
        //Hide an alert

        setTimeout(() => {
          hideAlert();
          setcurrentAnimation('idle');
          setForm({ name: '', email: '', message: '' });
        }, [3000]);
      })
      .catch((err) => {
        setIsLoading(false);
        setcurrentAnimation('idle');
        console.log(err);

        // Show error message
        showAlert({
          show: true,
          text: 'I didnt receive your message ',
          type: 'danger',
        });
      });
  };
  //once you click on it
  const handleFocus = () => setcurrentAnimation('walk');
  // once you click out
  const handleBlur = () => setcurrentAnimation('idle');

  return (
    <section className="relative flex  lg:flex-row  flex-col max-container h-[100vh]">
      {alert.show && <Alert {...alert} />}

      <div className="flex-1 min-w-[50%]  flex flex-col">
        <h1 className="head-text "> Get in touch</h1>
        <form
          className="w-full flex flex-col gap-7 mt-14"
          onSubmit={handleSubmit}
        >
          <label className="txet-black-500 font-semibold">
            Name
            <input
              type="text"
              name="name"
              className="input"
              placeholder="John"
              required
              value={form.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label className="txet-black-500 font-semibold">
            Email
            <input
              type="email"
              name="email"
              className="input"
              placeholder="John@gmail.com"
              required
              value={form.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label className="txet-black-500 font-semibold">
            Your Message
            <textarea
              name="message"
              rows={4}
              className="textarea"
              placeholder="Let me know how I can  help you!"
              required
              value={form.message}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <button
            type="sumbit"
            className="btn"
            disabled={isLoading}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            {isLoading ? 'Sending...' : 'Send message'}
          </button>
        </form>
      </div>

      <div className="lg:w-1/2  w-full lg:h-auto md:h-[550px] h-[350px]">
        {/* fov: feel of view */}
        <Canvas camera={{ position: [0, 0, 5], fov: 75, near: 0.1, far: 1000 }}>
          <directionalLight intensity={2.5} position={(0, 0, 1)} />
          <ambientLight intensity={1} />
          <Suspense fallback={<Loader />}>
            <Fox
              currentAnimation={currentAnimation}
              position={[0.5, 0.35, 0]}
              rotation={[12.6, -0.6, 0]}
              scale={[0.5, 0.5, 0.5]}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default Contact;
