export default function FormAction({
    handleSubmit,
    type = 'Button',
    action = 'submit',
    text
}) {
    return (
        <>
            {type === 'Button' ? (
                <button
                    type={action}
                    className="group relative w-1/5 mx-auto flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-grey-500 mt-10"
                    onClick={handleSubmit} // Use onClick instead of onSubmit
                >
                    {text}
                </button>
            ) : (
                <></>
            )}
        </>
    );
}
