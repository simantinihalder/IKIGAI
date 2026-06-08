import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import './TastingCurator.css';

const questions = [
  {
    id: 1,
    question: "What is your current energy?",
    options: ["Vibrant & Bold", "Calm & Comforting", "Adventurous"]
  },
  {
    id: 2,
    question: "Select your element:",
    options: ["Earth & Land", "Ocean", "Garden"]
  },
  {
    id: 3,
    question: "The finish:",
    options: ["Rich & Complex", "Clean & Delicate"]
  }
];

const TastingCurator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isRevealing, setIsRevealing] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setCurrentStep(0);
    setAnswers({});
    setIsRevealing(false);
    document.body.style.overflow = 'hidden';
  };

  const handleClose = () => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  };

  const handleAnswer = (option) => {
    setAnswers({ ...answers, [currentStep]: option });
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsRevealing(true);
    }
  };

  return (
    <section className="curator-section section-padding container">
      <div className="curator-trigger-container">
        <button className="curator-trigger" onClick={handleOpen}>
          [ Discover Your Flavor Profile &rarr; ]
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="curator-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="curator-modal-content">
              <button className="close-btn" onClick={handleClose}>&times;</button>

              {/* Decorative Zen Circles */}
              <motion.div 
                className="zen-circles"
                animate={isRevealing ? "reveal" : "step" + currentStep}
                variants={{
                  step0: { rotate: 0, scale: 1 },
                  step1: { rotate: 45, scale: 1.1 },
                  step2: { rotate: 90, scale: 1.2 },
                  reveal: { rotate: 180, scale: 1.5, opacity: 0.2 }
                }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              >
                <div className="circle circle-1"></div>
                <div className="circle circle-2"></div>
                <div className="circle circle-3"></div>
              </motion.div>

              <div className="curator-interactive-area">
                {!isRevealing ? (
                  <motion.div 
                    key={currentStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="question-container"
                  >
                    <p className="gold-text step-indicator">Step {currentStep + 1} of 3</p>
                    <h3 className="serif-heading question-text">{questions[currentStep].question}</h3>
                    <div className="options-container">
                      {questions[currentStep].options.map((option, idx) => (
                        <button 
                          key={idx} 
                          className="option-btn"
                          onClick={() => handleAnswer(option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="reveal-container"
                  >
                    <p className="gold-text">YOUR IKIGAI MATCH</p>
                    <h2 className="serif-heading reveal-title">Black Garlic Ramen paired with dry Junmai Sake</h2>
                    <p className="reveal-desc">A deep, soul-warming experience crafted for your bold and complex preferences.</p>
                    <Link to="/reservations" className="crimson-btn" style={{ display: 'inline-block', marginTop: '1rem' }} onClick={handleClose}>Book This Table</Link>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TastingCurator;
