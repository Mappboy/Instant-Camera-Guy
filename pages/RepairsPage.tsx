import React from 'react';
import Layout from '../components/Layout'; // Import the Layout component

const repairProcess = [
  {
    step: 1,
    title: 'Contact Us',
    description: 'Get in touch via Instagram, or Facebook with your camera model and the issue you are experiencing.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
    ),
  },
  {
    step: 2,
    title: 'Post Your Camera',
    description: 'Carefully package and post your camera to our Australian address. We will provide this upon contact.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2-2h8a1 1 0 001-1zM21 11V5a2 2 0 00-2-2H9a2 2 0 00-2 2v2" /></svg>
    ),
  },
  {
    step: 3,
    title: 'We Repair',
    description: 'We\'ll diagnose the fault, confirm the quote with you, and carry out the professional repair.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
    ),
  },
  {
    step: 4,
    title: 'Return Shipping',
    description: 'Once repaired and fully tested, we\'ll safely package and ship your camera right back to you.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
    ),
  },
];

const commonRepairs = [
  {
    title: 'Polaroid SX-70',
    description: 'The original and best. We can fix common motor, mirror, and electronic issues, perform 600 conversions, and reskin.',
    color: 'border-accent-red'
  },
  {
    title: 'Polaroid 600 Series',
    description: 'From the Sun 660 to the Impulse AF. We fix flash issues, sticky rollers, and broken plastic casings.',
    color: 'border-accent-teal'
  },
  {
    title: 'Image/Spectra',
    description: 'Often plagued by mirror and film ejection issues, we have the experience to get them working again.',
    color: 'border-accent-green'
  },
  {
    title: 'Other Models',
    description: 'Got something else? A Polaroid GO, a 1000 series, or something more obscure? Get in touch and we will see what we can do!',
    color: 'border-accent-tan'
  },
];

const RepairsPage: React.FC = () => {
  return (
    <Layout simpleHeader> {/* Use Layout with simpleHeader prop */}
      <div className="flex flex-col gap-16 sm:gap-24 md:gap-32">
        {/* Hero Section */}
        <section className="text-center mt-8 sm:mt-16">
          <h1 className="text-4xl md:text-6xl font-special text-primary leading-tight">
            Instant Camera Repairs
          </h1>
          <p className="mt-4 text-lg md:text-xl text-primary/80 max-w-2xl mx-auto">
            Breathe new life into your vintage Polaroid camera. We specialise in repairing the cameras you love.
          </p>
          <a 
            href="#contact-repair" 
            className="mt-8 inline-block bg-accent-red text-background font-bold py-3 px-8 rounded-sm shadow-lg hover:bg-accent-red/90 transition-colors"
          >
            Get a Quote
          </a>
        </section>

        {/* Repair Process Section */}
        <section>
          <h2 className="text-4xl font-special mb-12 text-center">Our Repair Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {repairProcess.map((item) => (
              <div key={item.step} className="text-center p-6 bg-background shadow-md rounded-sm border-t-4 border-accent-tan">
                <div className="flex items-center justify-center h-20 w-20 mx-auto bg-primary/5 rounded-full text-accent-teal mb-4">
                  {item.icon}
                </div>
                <h3 className="font-special text-2xl font-bold text-primary mb-2">
                  {item.step}. {item.title}
                </h3>
                <p className="text-primary/80 text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Common Repairs Section */}
        <section>
          <h2 className="text-4xl font-special mb-12 text-center">Common Camera Repairs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {commonRepairs.map((repair) => (
              <div key={repair.title} className={`bg-background p-8 shadow-lg rounded-sm border-l-8 ${repair.color}`}>
                <h3 className="font-special text-3xl font-bold text-primary mb-3">
                  {repair.title}
                </h3>
                <p className="text-primary/80">
                  {repair.description}
                </p>
              </div>
            ))}
          </div>
        </section>
        
        {/* Contact Section */}
        <section id="contact-repair" className="scroll-mt-24 max-w-2xl mx-auto">
           <h2 className="text-4xl font-special mb-8 text-center">Ready to start?</h2>
           <div className="prose lg:prose-lg mx-auto bg-background p-8 sm:p-12 shadow-lg rounded-sm border-t-8 border-accent-teal">
           <p>For the quickest response and a quote, please message us on Instagram. You'll find our up-to-date price lists and see our latest work there. Facebook is also great!</p>
           <p>Please only email if this is your last option, as we use it less frequently.</p>
           <ul>
            <li><strong>Instagram (Preferred):</strong> <a href="https://www.instagram.com/theinstantcameraguy/" target="_blank" rel="noopener noreferrer">Message us on Instagram</a></li>
            <li><strong>Facebook:</strong> <a href="https://m.me/instantcameraguy" target="_blank" rel="noopener noreferrer">Message us on Facebook</a></li>
            <li><strong>Phone:</strong> <a href="tel:0431845455">0431 845 455</a></li>
            <li><strong>Email (Last Resort):</strong> <a href="mailto:theinstantcameraguy@hotmail.com">theinstantcameraguy@hotmail.com</a></li>
           </ul>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default RepairsPage;
