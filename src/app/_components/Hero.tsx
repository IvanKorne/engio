import React from "react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="mx-auto h-screen max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Documents & Diagrams
            <span className="sm:block"> Explore your Creativity. </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl sm:text-xl/relaxed">
            Your one stop shop for a collaborative canvas, markdown editor, and
            diagram-as-code builder
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded-lg border border-blue-600 bg-blue-600 px-8 py-3 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
              href="#"
            >
              Get Started
            </a>
            <Button className="block rounded-lg h-full border border-pink-700 bg-pink-700 px-8 py-3 text-sm font-medium text-white hover:bg-pink-600 focus:outline-none focus:ring active:text-opacity-75 sm:w-auto">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
