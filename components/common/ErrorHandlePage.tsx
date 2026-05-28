import { ErrorProps } from "next/error";

export function ErrorPage({errorMsg}:ErrorProp) {
    
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-bold text-red-500">
                Something Went Wrong
            </h1>

            <p className="text-gray-400">{errorMsg}</p>

            <button
                onClick={() => window.location.reload()}
                className="rounded-md bg-white px-4 py-2 text-black"
            >
                Retry
            </button>
        </div>
    )
}


interface ErrorProp {
    errorMsg: string;
}