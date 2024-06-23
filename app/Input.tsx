interface InputProps {
  label?: string;
  value: number | undefined;
  setValue: (newValue: number) => void;
  inlineButton?: () => React.ReactNode;
}
export default function Input({
  label,
  value,
  setValue,
  inlineButton,
}: InputProps) {
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
        type="number"
        value={value}
        onChange={(e) => setValue(+e.target.value)}
      />
      <div className="absolute right-0 bottom-1">{inlineButton?.()}</div>
    </div>
  );
}
