
const LoadingScreen = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-96'>

        <h1 className="scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-8xl">
            LOADING...
        </h1>
        <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
            This May take a while since I'm using a free tier to host the API
        </h3>

    </div>
  )
}

export default LoadingScreen