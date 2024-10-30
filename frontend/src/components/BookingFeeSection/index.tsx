import './styles.css';
import React, { forwardRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { UserIcon, EnvelopeIcon, PhoneIcon, MapPinIcon, PencilIcon } from '@heroicons/react/24/outline';

const BookingFeeSection = forwardRef<HTMLDivElement, Record<string, never>>((props, ref) => {
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

  const inputClass = `
    block w-full bg-black bg-opacity-50 text-white 
    border border-white border-opacity-50 rounded-md 
    px-3 py-2 text-sm md:text-base
    focus:outline-none focus:ring-2 focus:ring-orange-300
    transition-all duration-300
    font-sans
  `;

  const iconClass = "w-4 h-4 md:w-5 md:h-5 text-white opacity-75 mr-3";

  const renderInput = (name: string, placeholder: string, type: string = "text", Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>) => (
    <motion.div className="flex items-center relative" variants={itemVariants}>
      <Icon className={iconClass} />
      <input
        type={type}
        id={name}
        name={name}
        className={inputClass}
        placeholder={placeholder}
      />
    </motion.div>
  );

  return (
    <section
      ref={(node) => {
        inViewRef(node);
        if (typeof ref === 'function') ref(node as HTMLDivElement);
        else if (ref) ref.current = node as HTMLDivElement;
      }}
      className="relative w-full min-h-screen py-8 md:py-16 flex items-center justify-center overflow-hidden font-sans"
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
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8 text-white text-center relative"
          variants={itemVariants}
        >
          BOOKING FEE
          <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-orange-300"></span>
        </motion.h2>
        
        <motion.div className="space-y-4 md:space-y-6 text-base md:text-lg" variants={contentVariants}>
          <motion.p variants={itemVariants}>
            Book your free consultation. Please fill out the form if you'd like to get a quote for your tattoo or if you have a general enquiry. Try to add as much detail as possible so we can achieve the best results for you. Depending on the design, further consultation may be required.
          </motion.p>
          
          <motion.p variants={itemVariants}>
            Booking fees are required to secure an appointment. All booking fees are deducted from the final price of your tattoo and are non-refundable. Booking Fees can be paid direct in the studio, alternatively bank details are available on request.
          </motion.p>
          
          <motion.h3 className="text-2xl font-bold mt-8 mb-4" variants={itemVariants}>
            BOOKING FEES
          </motion.h3>
          
          <motion.p variants={itemVariants}>
            Booking fees are required to secure an appointment. All booking fees are deducted from the final price of your tattoo and are non-refundable.
          </motion.p>
          
          <motion.p variants={itemVariants}>
            Booking Fees can be paid direct in the studio, alternatively bank details are available on request.
          </motion.p>
        </motion.div>
        
        <motion.form className="mt-8 md:mt-12 space-y-4 md:space-y-6" variants={contentVariants}>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6" variants={itemVariants}>
            {renderInput("firstName", "First Name", "text", UserIcon)}
            {renderInput("lastName", "Last Name", "text", UserIcon)}
          </motion.div>
          
          {renderInput("email", "Email", "email", EnvelopeIcon)}
          
          <motion.div className="grid grid-cols-3 gap-2" variants={itemVariants}>
            <div className="flex items-center relative">
              <PhoneIcon className={iconClass} />
              <select id="countryCode" name="countryCode" className={inputClass}>
                <option value="+44">UK +44</option>
                {/* Add more country codes as needed */}
              </select>
            </div>
            <div className="col-span-2">
              {renderInput("phone", "Phone", "tel", PhoneIcon)}
            </div>
          </motion.div>
          
          <motion.div className="flex items-center relative" variants={itemVariants}>
            <PencilIcon className={iconClass} />
            <select id="service" name="service" className={`${inputClass} appearance-none`}>
              <option value="">Select a Service</option>
              <option value="tattoo">Get a Tattoo</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </motion.div>
          
          {renderInput("tattooLocation", "Where on your body would you like the tattoo?", "text", MapPinIcon)}
          
          <motion.div className="flex items-center relative" variants={itemVariants}>
            <PencilIcon className={iconClass} />
            <textarea
              id="tattooIdea"
              name="tattooIdea"
              rows={4}
              className={`${inputClass} pt-8`}
              placeholder="Please describe your tattoo idea..."
            ></textarea>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <label htmlFor="referenceImage1" className="block text-sm font-medium text-white mb-2">Reference image #1</label>
            <input 
              type="file" 
              id="referenceImage1" 
              name="referenceImage1" 
              accept="image/*" 
              className="mt-1 block w-full text-sm text-white
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border file:border-white file:border-opacity-50
                file:text-sm file:font-medium
                file:bg-transparent file:text-white
                hover:file:cursor-pointer
              "
            />
            <p className="mt-1 text-xs text-gray-400">Upload supported file (Max 15MB)</p>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <label htmlFor="referenceImage2" className="block text-sm font-medium text-white mb-2">Reference image #2</label>
            <input 
              type="file" 
              id="referenceImage2" 
              name="referenceImage2" 
              accept="image/*" 
              className="mt-1 block w-full text-sm text-white
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border file:border-white file:border-opacity-50
                file:text-sm file:font-medium
                file:bg-transparent file:text-white
                hover:file:cursor-pointer
              "
            />
            <p className="mt-1 text-xs text-gray-400">Upload supported file (Max 15MB)</p>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 
                border border-white border-opacity-50 rounded-md 
                text-sm md:text-base font-medium text-white 
                bg-transparent hover:bg-white hover:bg-opacity-10
                focus:outline-none focus:ring-2 focus:ring-orange-300
                transition-all duration-300"
            >
              Submit
            </button>
          </motion.div>
        </motion.form>
      </motion.div>
    </section>
  );
});

BookingFeeSection.displayName = 'BookingFeeSection';

export default BookingFeeSection;
