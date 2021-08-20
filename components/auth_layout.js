export default function AuthLayout({children}) {


    return <div className="flex h-screen flex-row md:space-x-2 p-4 justify-center items-center">

        <div className="md:w-1/2 w-full flex justify-center items-center">
            {children}
        </div>
        <div className="hidden md:flex md:w-1/2 bg-gray-100 h-screen">

        </div>
    </div>

}