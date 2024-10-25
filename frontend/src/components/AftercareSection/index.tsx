import React, { forwardRef, useEffect, Ref } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AftercareSection = forwardRef<HTMLDivElement, {}>((props, ref) => {
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
      className="relative w-full min-h-screen py-16 flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: 'url("https://ledstattoo.com.br/templates/yootheme/cache/bg-01-d805f7dc.webp")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-4 text-white text-left"
        initial="hidden"
        animate={controls}
        variants={contentVariants}
      >
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-8 text-white text-center relative"
          variants={itemVariants}
        >
          TATTOO AFTERCARE
          <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-orange-300"></span>
        </motion.h2>
        <motion.p className="mb-6 text-lg text-center relative group" variants={itemVariants}>
          In order to allow your tattoo to heal well please follow my recommended aftercare.
        </motion.p>
        <motion.ul className="space-y-4 text-lg list-none" variants={contentVariants}>
          {[
            "Leave the Saniderm patch that I put over your new tattoo on for 24 hours. After that you can remove it gently (this is best done in the bath or shower).",
            "Wash your tattoo daily with warm water and use only a mild soap. Use Palmers Cocoa Butter daily for the first week after your tattoo, every other day for the second week.",
            "Don't be tempted to scratch or pick at your tattoo! Your new ink will form a light scab after a few days and will probably itch like mad. If you scratch or pick at the scabs the fresh ink will be pulled out of the skin and your new tattoo will look faded and blotchy.",
            "Everyone's skin heals at different rates. As a rule of thumb expect your tattoo to have healed within one to two weeks. After this time you will experience light skin peeling (known as silver skin) which looks similar to sunburn. After this has gone your tattoo will be brighter with the vibrancy of the day it was freshly done.",
            "Until your tattoo has healed, please avoid the following: swimming, sunbathing, saunas, dirt, oil, grease, paint, industrial cleaners, caustic substances, raw meats and creams or ointments (other than Palmers Cocoa Butter).",
            "Once your tattoo has healed ensure you keep it moisturised. If you go out in the sun or use sunbeds, be sure to use a high SPF sunblock, 30+ is preferable. The sun can really kill your ink and make it look old before its time."
          ].map((item, index) => (
            <motion.li key={index} variants={itemVariants} className="pl-8 relative flex items-start">
              <span className="absolute left-0 top-1 flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="6" fill="#fdba74"/>
                  <circle cx="12" cy="12" r="5" fill="black"/>
                </svg>
              </span>
              <span>{item}</span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
});

AftercareSection.displayName = 'AftercareSection';

export default AftercareSection;
