const HeroSection = () => {
  return (
    <div className="pl-10 py-6 mr-20">
      <div className="text-center text-heading font-space">
        <p className="text-2xl">
          Bring your Local Cricket Tournament Online with
        </p>
        <p className="text-7xl mt-8 font-black cursor-pointer heading-gradient drop-shadow-[0_0_20px_rgba(204,102,255,0.9)]">
          CricScore
        </p>
        <p className="text-md mt-8">
          Say goodbye to paper scoring and messy updates.
          <br /> CricScore makes it easy to score, manage, <br />
          and share live match updates with your audience in real time.
        </p>

        {/* cta button  */}
        <button className=" text-black mt-10 w-60 p-3 rounded-xl text-lg font-bold bg-gradient-to-r from-[#cc66ff] to-[#00dbde] cursor-pointer hover:drop-shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-300">
          Start Scoring
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
