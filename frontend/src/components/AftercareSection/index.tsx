import React, { forwardRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './styles.css';

type AftercareSectionProps = Record<string, unknown>;
  // Mesmo que não tenha props no momento, é melhor usar uma interface
  //retirei interface e coloquei type, poq estava dadno erro de producao
  // para futuras extensões


const AftercareSection = forwardRef<HTMLDivElement, AftercareSectionProps>((props, ref) => {
  const controls = useAnimation();
  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      ref={(node) => {
        inViewRef(node);
        if (typeof ref === 'function') ref(node as HTMLDivElement);
        else if (ref) ref.current = node as HTMLDivElement;
      }}
      className="relative w-full min-h-screen py-8 sm:py-12 md:py-16 flex items-center justify-center overflow-hidden font-sans"
      style={{
        backgroundImage: 'url("https://ledstattoo.com.br/templates/yootheme/cache/bg-01-d805f7dc.webp")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      <motion.div
        className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-white"
        initial="hidden"
        animate={controls}
        variants={contentVariants}
      >
        <motion.h2 
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 text-white text-center relative"
          variants={itemVariants}
        >
          TATTOO AFTERCARE
          <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-orange-300"></span>
        </motion.h2>
        <motion.p className="mb-4 sm:mb-6 text-base sm:text-lg text-center relative group" variants={itemVariants}>
          In order to allow your tattoo to heal well please follow my recommended aftercare.
        </motion.p>
        <motion.ul className="space-y-3 sm:space-y-4 text-base sm:text-lg list-none font-medium" variants={contentVariants}>
          {[
            "Leave the <strong>Saniderm patch</strong> that I put over your new tattoo on for <strong>24 hours</strong>. After that you can remove it gently (this is best done in the bath or shower).",
            "Wash your tattoo daily with warm water and use only a <strong>mild soap</strong>. Use <strong>Palmers Cocoa Butter</strong> daily for the first week after your tattoo, every other day for the second week.",
            "<strong>Don't be tempted to scratch or pick at your tattoo!</strong> Your new ink will form a light scab after a few days and will probably itch like mad. If you scratch or pick at the scabs the fresh ink will be pulled out of the skin and your new tattoo will look faded and blotchy.",
            "Everyone's skin heals at different rates. As a rule of thumb expect your tattoo to have healed within <strong>one to two weeks</strong>. After this time you will experience light skin peeling (known as silver skin) which looks similar to sunburn. After this has gone your tattoo will be brighter with the vibrancy of the day it was freshly done.",
            "Until your tattoo has healed, please <strong>avoid the following:</strong> swimming, sunbathing, saunas, dirt, oil, grease, paint, industrial cleaners, caustic substances, raw meats and creams or ointments (other than Palmers Cocoa Butter).",
            "Once your tattoo has healed ensure you keep it moisturised. If you go out in the sun or use sunbeds, be sure to use a <strong>high SPF sunblock, 30+ is preferable</strong>. The sun can really kill your ink and make it look old before its time."
          ].map((item, index) => (
            <motion.li 
              key={index} 
              variants={itemVariants} 
              className="pl-6 sm:pl-8 relative flex items-start"
            >
              <span className="absolute left-0 top-1.5 sm:top-1 flex-shrink-0">
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  className="sm:w-6 sm:h-6" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="6" fill="#fdba74"/>
                  <circle cx="12" cy="12" r="5" fill="black"/>
                </svg>
              </span>
              <span 
                className="text-sm sm:text-base md:text-lg"
                dangerouslySetInnerHTML={{ __html: item }}
              />
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
});

AftercareSection.displayName = 'AftercareSection';

export default AftercareSection;
