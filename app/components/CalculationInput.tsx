import { useEffect, useState } from "react";

interface InputProps {
  label?: string;
  value: number | undefined;
  setValue: (newValue: number) => void;
  inlineButton?: () => React.ReactNode;
}
export default function CalculationInput({
  label,
  value,
  setValue,
  inlineButton,
}: InputProps) {
  const [rawValue, setRawValue] = useState<string|undefined>(undefined);
  const [calculatedValue, setCalculatedValue] = useState<number>(value ?? 0);
  const [focused, setFocused] = useState<boolean>(false);
  
  useEffect(() => {
    if (value === undefined || rawValue !== undefined) {
      return
    }
    setValues(value + "")
  },[value])

  const handeInput = (input: string) => {
    if (input === "") {
      setValues("")
      return
    }
    const valid = /^[0-9+\- ]+$/.test(input);
    if (!valid) {
      return
    }
    setValues(cutoffSigns(input))
  }

  const setValues = (input: string) => {
    setRawValue(input)
    calculate(input)
  }

  const cutoffSigns = (input: string)=> {
    const signRegex = /^[+-]+$/
    const last = input.slice(input.length - 2)
    const lastTwoAreSigns = signRegex.test(last)
    if (!lastTwoAreSigns) {
      return input
    } 
    return input.slice(0, input.length -2) + input[input.length-1]
  }

  const calculate = (input: string) => {
    const numbers = input.split(/[+-]/).map(str => parseInt(str)).filter(n => !isNaN(n))
    const signs = rawValue?.match(/[+-]/g) || [];
    if (signs.length < numbers.length - 1) {
      throw Error("there are too less signs for the amount of numbers!")
    }
    const sum = numbers.reduce((acc, number, index) => {
      if (index === 0) {
        return number
      }
      if (signs[index - 1] === "+") {
        return acc + number
      }
      return acc - number
    }, 0 as number)
    setCalculatedValue(sum)
    setValue(sum)
  } 

  const handleBlur = () => setFocused(false)
  const handleFocus = () => setFocused(true)

  return (
    <div className="flex flex-col mt-3 relative">
      {label && (
        <label htmlFor={label} className="block font-small text-gray-900">
          {label}
        </label>
      )}
      <input
        id={label}
        className="text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 text-base text-center shadow"
        value={focused ? rawValue : calculatedValue}
        onChange={(e) => handeInput(e.target.value)}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
      <div className="absolute right-0 bottom-1">{inlineButton?.()}</div>
    </div>
  );
}
