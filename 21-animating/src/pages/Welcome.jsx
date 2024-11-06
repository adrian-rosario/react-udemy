import { Link } from "react-router-dom";
import cityImg from "../assets/city.jpg";
import heroImg from "../assets/hero.png";
// -
import { motion, useScroll, useTransform } from "framer-motion";

export default function WelcomePage() {
  // -
  const { scrollY } = useScroll();

  const scrollOut = useTransform(scrollY, [0, 200, 400], [1, 0.45, 0.15]); // - breakpoints and transformations
  const floatingMotion = useTransform(scrollY, [0, 450], [0, -100]);

  const scrollOutHero = useTransform(scrollY, [0, 150, 400], [1, 0.45, 0]); // - breakpoints and transformations
  const floatingMotionHero = useTransform(scrollY, [0, 450], [0, -150]);

  const textScale = useTransform(scrollY, [0, 200, 400], [0.8, 1.2, 1]);

  const floatText = useTransform(scrollY, [0, 700], [0, 400]);

  return (
    <>
      <header id='welcome-header'>
        <motion.div id='welcome-header-content'>
          <motion.h1 style={{ y: floatText }}>Ready for a challenge?</motion.h1>

          <Link id='cta-link' to='/challenges'>
            Get Started
          </Link>
        </motion.div>

        <motion.img
          src={cityImg}
          alt='A city skyline touched by sunlight'
          id='city-image'
          style={{ opacity: scrollOut, y: floatingMotion }}
        />

        <motion.img
          src={heroImg}
          alt='A superhero wearing a cape'
          id='hero-image'
          style={{ opacity: scrollOutHero, y: floatingMotionHero }}
        />
      </header>
      <main id='welcome-content'>
        <section>
          <motion.h2 style={{ scale: textScale }}>
            There&apos;s never been a better time.
          </motion.h2>
          <p>
            With our platform, you can set, track, and conquer challenges at
            your own pace. Whether it&apos;s personal growth, professional
            achievements, or just for fun, we&apos;ve got you covered.
          </p>
        </section>

        <section>
          <h2>Why Challenge Yourself?</h2>
          <p>
            Challenges provide a framework for growth. They push boundaries,
            test limits, and result in genuine progress. Here, we believe
            everyone has untapped potential, waiting to be unlocked.
          </p>
        </section>

        <section>
          <h2>Features</h2>
          <ul>
            <li>Custom challenge creation: Set the rules, define your pace.</li>
            <li>
              Track your progress: See your growth over time with our analytics
              tools.
            </li>
            <li>
              Community Support: Join our community and get motivated by peers.
            </li>
          </ul>
        </section>

        <section>
          <h2>Join Thousands Embracing The Challenge</h2>
          <p>
            “I never realized what I was capable of until I set my first
            challenge here. It&apos;s been a transformative experience!” - Alex
            P.
          </p>
          {/* You can add more testimonials or even a carousel for multiple testimonials */}
        </section>
      </main>
    </>
  );
}
