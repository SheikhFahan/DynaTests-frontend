import React from 'react'

const HeroBanner = () => {
  return (
    <section class= "bg-gradient-to-t from-gray-700 via-white to-gray-400 ">
    <div class="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
      <div class="mx-auto max-w-3xl text-center">
        <h1
          class="bg-gradient-to-r from-gray-300 via-gray-500 to-gray-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
        >
          What is DynaTests?
  
          <span class="sm:block">  How does it work? </span>
        </h1>
  
        <p class="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
          A tool thats tests your knowledge and grows in difficulty as you grow in knowledge with the ability of showing you the  visual representation of your progress.
        </p>
  
        <div class="mt-8 flex flex-wrap justify-center gap-4">
        <a
                        href="/register"
                        className="bg-transparent hover:bg-black 300 text-black hover:text-black rounded shadow hover:shadow-lg py-2 px-4 border border-black hover:border-transparent"
                    >
                        Get Started
                    </a>

        </div>
      </div>
    </div>
  </section>
  )
}

export default HeroBanner