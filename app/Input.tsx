interface InputProps {
  label: string;
  value: number | undefined;
  setValue: (newValue: number) => void;
}
export default function Input({ label, value, setValue }: InputProps) {
  return (
    <div className="flex flex-col mt-3">
      <label
        htmlFor={label}
        className="block mb-2 font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        id={label}
        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-base"
        type="number"
        value={value}
        onChange={(e) => setValue(+e.target.value)}
      />
    </div>
  );
}
