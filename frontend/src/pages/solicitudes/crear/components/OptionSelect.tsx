"use client"

import { useState, useEffect } from "react";

type Option = {
  name: string;
  value: string;
  label: string;
};

type OptionSelectProps = {
  options: Option[];
  htmlFor: string;
  labelValue: string;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
};

export default function OptionSelect({
  options,
  htmlFor,
  labelValue,
  name = htmlFor,
  value = "",
  onChange
}: OptionSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleOptionClick = (optionValue: string) => {
    setInternalValue(optionValue);
    setIsOpen(false);
    onChange?.(optionValue);
  };

  const selectedOption = options.find(opt => opt.value === internalValue) || options[0];

  return (
    <div className="w-full space-y-2">
      <label htmlFor={htmlFor} className="text-sm font-medium text-gray-700">
        {labelValue}
      </label>
      <div className="pb-[3px] focus-within:gradient-border relative">
        <div className="custom-select">
          <button 
            type="button"
            className="px-4 input w-full text-left flex justify-between items-center"
            id="custom-select-button"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span id="custom-select-selected" className={!internalValue ? "text-gray-500" : ""}>
              {selectedOption.label}
            </span>
            <svg 
              className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
                    
          <div 
            id="custom-select-options"
            className={`absolute z-10 mt-2 w-full bg-white shadow-lg rounded-xl border-1 border-gray-500 focus:outline-none ${isOpen ? 'block' : 'hidden'}`}
            role="listbox"
          >
            {options.map((option) => (
              <div
                key={option.value}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                  internalValue === option.value ? 'bg-gray-100 font-medium' : ''
                } ${
                  option.value === "" ? "rounded-t-xl hover:rounded-t-xl" : 
                  option === options[options.length - 1] ? "rounded-b-xl hover:rounded-b-xl" : ""
                }`}
                role="option"
                aria-selected={internalValue === option.value}
                onClick={() => handleOptionClick(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>

        <input 
          type="hidden" 
          id={htmlFor}
          name={name} 
          value={internalValue} 
        />
      </div>
    </div>
  );
}