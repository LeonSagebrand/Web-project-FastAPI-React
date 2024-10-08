export default function FormExtra() {
  return (
    <div className="flex items-center justify-center space-x-4"> 
      <div className="flex items-center">
        <input
          id="remember-me"
          name="remember-me"
          type="checkbox"
          className="h-4 w-4 text-gray-800 focus:ring-grey-500 border-gray-300 rounded"
        />
        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
          Remember me
        </label>
      </div>

      <div className="text-sm">
        <a href="#" className="font-bold text-gray-800 hover:text-gray-600">
          Forgot your password?
        </a>
      </div>
    </div>
  );
}
