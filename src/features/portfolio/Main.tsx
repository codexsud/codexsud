import BlurText from "./components/react-bits/BlurText";
import FadeContent from "./components/react-bits/FadeContent";
import SplitText from "./components/react-bits/SplitText";
import Threads from "./components/react-bits/Threads";
import SocialLink from "./components/SocialLink";
import { socials } from "./data";

const Main = () => {
  return (
    <main className="w-full h-[90vh] flex flex-col justify-center items-center">
      <div className="flex flex-col gap-2 mx-2">
        <div>
          <SplitText
            text="Hello!"
            className="text-6xl text-blue-500 font-semibold"
            delay={10}
            animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
            animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            easing="easeOutCubic"
            threshold={0.2}
            rootMargin="-50px"
            onLetterAnimationComplete={() => {}}
          />
        </div>
        <div>
          <SplitText
            text="I'm SUD, a full stack developer."
            className="text-4xl font-semibold"
            delay={10}
            animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
            animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            easing="easeOutCubic"
            threshold={0.2}
            rootMargin="-50px"
            onLetterAnimationComplete={() => {}}
          />
        </div>
        <div>
          <FadeContent
            blur={true}
            duration={1000}
            easing="ease-out"
            initialOpacity={0}
          >
            <div className="flex flex-row gap-4">
              {socials.map((social, index) => (
                <SocialLink key={index} {...social} />
              ))}
            </div>
          </FadeContent>
        </div>

        <div className="my-4">
          <BlurText
            text="Coding in React, Spring Boot (Java), and Python, building with LLMs, scaling systems, and diving into tech—one challenge at a time. 🚀"
            delay={30}
            animateBy="words"
            direction="bottom"
            onAnimationComplete={() => {}}
            className="text-xl text-gray-500 dark:text-gray-400"
          />
        </div>
      </div>
      <div className="w-full flex justify-center items-center mt-8">
        <Threads amplitude={5} distance={0} enableMouseInteraction={true} />
      </div>
    </main>
  );
};

export default Main;
