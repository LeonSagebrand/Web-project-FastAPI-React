
const fixedInputClass="rounded-md appearance-none relative block w-1/3 mx-auto px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"

export default function Input({
  handleChange,
  value,
  labelText,
  labelFor,
  name,
  type,
  isRequired = false,
  placeholder,
  customClass
}) {
  const id = name; // 

  return (
      <div className="my-5">
          <label htmlFor={labelFor} className="sr-only">
              {labelText}
          </label>
          <input
              onChange={handleChange}
              value={value}
              id={id} // Use 
              name={name}
              type={type}
              required={isRequired}
              className={fixedInputClass + customClass}
              placeholder={placeholder}
          />
      </div>
  );
}
