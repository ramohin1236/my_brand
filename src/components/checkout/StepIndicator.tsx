import React, { Fragment } from 'react';
// ============================================================
// STEP INDICATOR — checkout progress bar
// ============================================================

import { CheckIcon, PackageIcon, TruckIcon, CreditCardIcon } from 'lucide-react';
interface Step {
  id: number;
  label: string;
  Icon: React.ElementType;
}
const STEPS: Step[] = [
{
  id: 1,
  label: 'Review',
  Icon: PackageIcon
},
{
  id: 2,
  label: 'Shipping',
  Icon: TruckIcon
},
{
  id: 3,
  label: 'Payment',
  Icon: CreditCardIcon
}];

interface StepIndicatorProps {
  currentStep: number;
}
export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center mb-10">
      {STEPS.map((step, index) => {
        const isCompleted = currentStep > step.id;
        const isActive = currentStep === step.id;
        const Icon = step.Icon;
        return (
          <Fragment key={step.id}>
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isCompleted ? 'bg-forest text-white' : isActive ? 'bg-forest text-white ring-4 ring-forest/20' : 'bg-gray-100 text-gray-400'}`}>

                {isCompleted ?
                <CheckIcon className="w-4 h-4" /> :

                <Icon className="w-4 h-4" />
                }
              </div>
              <span
                className={`text-xs font-body font-medium ${isActive ? 'text-forest' : 'text-gray-400'}`}>

                {step.label}
              </span>
            </div>
            {index < STEPS.length - 1 &&
            <div
              className={`flex-1 h-0.5 mx-3 mb-5 transition-colors ${currentStep > step.id ? 'bg-forest' : 'bg-gray-200'}`} />

            }
          </Fragment>);

      })}
    </div>);

}