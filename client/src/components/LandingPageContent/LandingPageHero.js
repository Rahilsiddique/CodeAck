import React from "react";
import { Link } from "react-router-dom";

const LandingPageHero = () => {
  return (
    <section
      className="bg-midGreen dark:bg-midGreen h-screen overflow-y-hidden flex items-center"
      id="home"
    >
      <div className="py-8 px-20 mx-auto max-w-screen-xl text-center ">
        <h1 className="mb-11 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-t from-red-800 via-red-400 to-white">
          ONLINE CODING ASSESMENT
        </h1>
        <p className="mb-8 text-lg text-whiteLike font-normal lg:text-xl sm:px-16 xl:px-48 dark:text-whiteLike ">
          We at code<span className="text-[crimson] font-semibold">A</span>ck 
          are building a platform for making the procedure of taking online
          coding assesment as easy as possible.
        </p>
        <button className="border-2 border-ligthGreen px-6 py-4 rounded-lg text-2xl text-midGreen bg-ligthGreen hover:bg-midGreen duration-300 hover:text-whiteLike active:translate-y-2">
          <Link to="/login">Log in</Link>
        </button> 
      </div>
    </section>
  );
};

export default LandingPageHero;

