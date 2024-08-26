import {Link} from 'react-router-dom';

export default function Heading({
    heading,
    paragraph,
    linkName,
    linkUrl="#",
    errorMessage,
    signupMessage
}){
    return(
        <div className="mb-10">
            
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                {heading}
            </h2>
            <p className="text-center text-sm text-gray-600 mt-5">
            {paragraph} {' '}
            <Link to={linkUrl} className="font-bold text-gray-800 hover:text-gray-600">
                {linkName}
            </Link>
            </p>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            {signupMessage && <p style={{color: "black"}}>{signupMessage}</p>}
        </div>
    )
}