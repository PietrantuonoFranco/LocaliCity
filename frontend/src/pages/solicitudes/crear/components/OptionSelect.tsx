"use client";

import { useState, useEffect } from "react";
import type Option from "src/interfaces/OptionInterface";

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
  onChange,
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

  const selectedOption =
    options.find((opt) => opt.value === internalValue) || options[0];

  const maxVisible = 5;
  const itemHeight = 42;
  const containerHeight = itemHeight * maxVisible;

  return (
    <div className="w-full space-y-2">
      {/* Label */}
      <label htmlFor={htmlFor} className="text-sm font-medium text-gray-700">
        {labelValue}
      </label>

      <div className="relative pb-[3px] focus-within:gradient-border">
        <div className="custom-select">
          {/* Botón de selección */}
          <button
            type="button"
            id="custom-select-button"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
            className="input w-full flex items-center justify-between px-4 text-left"
          >
            <span
              id="custom-select-selected"
              className={!internalValue ? "text-gray-500" : ""}
            >
              {selectedOption.label}
            </span>
            <svg
              className={`h-5 w-5 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 
                10.586l3.293-3.293a1 1 0 
                111.414 1.414l-4 4a1 1 0 
                01-1.414 0l-4-4a1 1 0 
                010-1.414z"
              />
            </svg>
          </button>

          {/* Lista de opciones */}
          {options.length > 0 && (
            <div
              id="custom-select-options"
              role="listbox"
              className={`absolute z-10 mt-2 w-full rounded-xl border border-gray-500 bg-white shadow-lg focus:outline-none ${
                isOpen ? "block" : "hidden"
              } custom-scrollbar`}
              style={{
                maxHeight:
                  options.length > maxVisible ? `${containerHeight}px` : "auto",
                overflowY:
                  options.length > maxVisible ? "auto" : "visible",
              }}
            >
              {options.map((option, i) => {
                const isFirst = i === 0;
                const isLast = i === options.length - 1;
                const isSingle = options.length === 1;

                return (
                  <div
                    key={option.value}
                    role="option"
                    aria-selected={internalValue === option.value}
                    onClick={() => handleOptionClick(option.value)}
                    className={`
                      cursor-pointer px-4 py-2 hover:bg-gray-100
                      ${internalValue === option.value ? "bg-gray-100 font-medium" : ""}
                      ${isSingle ? "rounded-xl" : ""}
                      ${isFirst && !isSingle ? "rounded-t-xl" : ""}
                      ${isLast && !isSingle ? "rounded-b-xl" : ""}
                    `}
                  >
                    {option.label}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Input oculto para enviar el valor en formularios */}
        <input type="hidden" id={htmlFor} name={name} value={internalValue} />
      </div>
    </div>
  );
}
