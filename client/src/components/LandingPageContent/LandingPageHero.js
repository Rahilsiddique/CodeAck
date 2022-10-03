import React from "react";

const LandingPageHero = () => {
  return (
    <section
      className="bg-white dark:bg-midGreen h-screen overflow-y-hidden flex items-center"
      id="home"
    >
      <div className="py-8 px-20 mx-auto max-w-screen-xl text-center">
        <h1 className="mb-11 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-whiteLike">
          ONLINE CODING ASSESMENT
        </h1>
        <p className="mb-8 text-lg font-normal text-whiteLike lg:text-xl sm:px-16 xl:px-48 dark:text-whiteLike">
          We at code<span className="text-crimsonLike font-semibold">A</span>ck
          are building a platform for making the procedure of taking online
          coeding assesment as easy as possible
        </p>
      </div>
    </section>
  );
};

export default LandingPageHero;
