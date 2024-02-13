import React from 'react';
import hero from '../Images/hero.png'
import HeroBanner from './HeroBanner';
const Hero = () => {
    return (
        <div className="bg-white  text-black py-5 md:py-20 lg:py-32 px-14 ">
            <div className="mx-auto flex flex-col md:flex-row items-center mb-28">
                <div className="flex flex-col w-full md:w-1/2 justify-center items-center md:items-start p-4 md:p-8 ">
                    <h2 className="text-2xl md:text-4xl lg:text-5xl leading-relaxed md:leading-snug mb-2 text-black ">
                    "Education is the kindling of a flame, not the filling of a vessel." <br/>- Socrates
                    </h2>
                    <p className="text-sm md:text-base lg:text-lg text-black  mb-4">
                        Explore your favorite subjects and  board on a journey of learning with DynaTests.
                    </p>
                    <a
                        href="#"
                        className="bg-transparent hover:bg-black 300 text-black hover:text-black rounded shadow hover:shadow-lg py-2 px-4 border border-black hover:border-transparent"
                    >
                        Explore Now
                    </a>
                </div>
                <div className="p-4 md:p-8 md:w-1/2 justify-center ">
                    <div className="h-48 flex flex-wrap content-center ">
                        <img
                            className="inline-block mt-8 md:mt-0 md:p-8 lg:p-0 w-full md:w-auto"
                            src={hero}
                            alt="TechFest Image 1"
                        />
                    </div>
                </div>
            </div>
            <HeroBanner />
        </div>
    );
};

export default Hero;

