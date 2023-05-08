// // Photos from https://citizenofnowhe.re/lines-of-the-city
// import "./Trial.css";
// import { useRef } from "react";
// import {
//   motion,
//   useScroll,
//   useSpring,
//   useTransform,
//   MotionValue
// } from "framer-motion";
// import Home from "./Home";
// import Slider from "./Silder";
// import Searchpage from "./Searchpage";

// function useParallax(value, distance) {
//   return useTransform(value, [0, 1], [-distance, distance]);
// }

// function Image({ id, children }) {
//   const ref = useRef(null);
//   const { scrollYProgress } = useScroll({ target: ref });
//   const y = useParallax(scrollYProgress, 300);

//   return (
//     <section>
//       <div ref={ref}>
//         {/* <img src={`/${id}.jpg`} alt="A London skyscraper" /> */}
//         {children}
//       </div>
//       {/* <motion.h2 style={{ y }}>{`#00${id}`}</motion.h2> */}
//     </section>
//   );
// }

// export default function App() {
//   const { scrollYProgress } = useScroll();
//   const scaleX = useSpring(scrollYProgress, {
//     stiffness: 100,
//     damping: 30,
//     restDelta: 0.001
//   });

//   return (
//     <>
//       {[<Home/>, <Searchpage/>, <Slider/>].map((item, i) => (
//         <Image id={i}  >
//           {item}
//         </Image>
//       ))}
//       <motion.div className="progress" style={{ scaleX }} />
//     </>
//   );
// }
