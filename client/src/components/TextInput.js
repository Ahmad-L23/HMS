const TextInput = ({ label, name, type = "text", value, onChange, placeholder, error }) => {
  return (
    <div className="mb-6">
      <label className="text-gray-800 text-sm mb-2 block" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all ${error ? 'border-red-500' : ''}`}
        id={name}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default TextInput;
