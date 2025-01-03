import React from 'react';
import './style.css';
import { Step } from './steps';
export interface StepProps {
  step: number;
  setStep: (step: number) => void;
  steps: Step[];
}
const Stepper: React.FC<StepProps> = ({ step, steps }) => {
  return (
    <>
      <div className="row w-100">
        <div className="col-12  d-flex justify-content-center align-items-center">
          <div className="stepper">
            {steps.map((oneStep, index) => (
              <div
                key={index}
                className={`step ${step === index ? 'active' : ''}`}
              >
                <div className={`circle ${step >= index ? 'completed' : ''}`}>
                  {index + 1}
                </div>
                <div className="label">{oneStep.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Stepper;
