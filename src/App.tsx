import { useEffect, useState } from "react";

interface Size {
  width: number | undefined;
  height: number | undefined;
}

function useWindowSize(): Size {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState<Size>({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

function App() {

  const size = useWindowSize()

  const [choice, setChoice] = useState<string>("")
  const [house, setHouse] = useState<string>("")
  const [result, setResult] = useState<string>("")
  const [selector, setSelector] = useState<boolean>(false)
  const [score, setScore] = useState<number>(+localStorage.getItem('score'))

  const generateChoice = () : string => {
    const rand = Math.floor(Math.random() * 100) + 1
    if (rand % 3 === 0)
      return "Rock"
    else if (rand % 3 === 1)
      return "Paper"
    else
      return "Scissors"
  }

  const pickRock = (ia: string) => {
    if (ia === "Scissors")
      return "Win"
    else if (ia === "Paper")
      return "Loose"
  }

  const pickPaper = (ia: string) => {
    if (ia === "Rock")
      return "Win"
    else if (ia === "Scissors")
      return "Loose"
  }

  const pickScissors = (ia: string) => {
    if (ia === "Paper")
      return "Win"
    else if (ia === "Rock")
      return "Loose"
  }

  const checkingResult = (choice: string, ia_choice: string) => {
    if (choice === ia_choice)
      return "Draw"
    if (choice === "Rock")
      return pickRock(ia_choice)
    else if (choice === "Paper")
      return pickPaper(ia_choice)
    else if (choice === "Scissors")
      return pickScissors(ia_choice)
  }

  const handleClick = (value: string) => {

    const ia_choice = generateChoice()
    console.log("Ia:", ia_choice)
    const res = checkingResult(value, ia_choice)
    
    console.log("Result:", res)

    setSelector(true)
    if (res === "Win")
    {
      const newScore = score + 1
      setScore(newScore)
      localStorage.setItem('score', newScore.toString())
    }
    setChoice(value)
    setResult(res)
    setHouse(ia_choice)
  }

  const handleRematch = () => {
    setSelector(false)
  }

  const RockComponentMobile = (
      <div className="w-full h-full border-[15px] border-[#DC2E4E] rounded-full flex justify-center items-center bg-white">
        <img src="../icon-rock.svg" width="80" height="80" alt="Rock"/>
      </div>
  )

  const PaperComponentMobile = (
      <div className="w-full h-full border-[15px] border-[#4865F4] rounded-full flex justify-center items-center bg-white">
        <img src="../icon-paper.svg" width="80" height="80" alt="Paper"/>
      </div>
  )

  const ScissorsComponentMobile = (
      <div className="w-full h-full border-[15px] border-[#EC9E0E] rounded-full flex justify-center items-center bg-white">
        <img src="../icon-scissors.svg" width="80" height="80" alt="Scissors"/>
      </div>
  )

  const RockComponent = (
    <div className="w-2/3 h-4/5 border-[15px] border-[#DC2E4E] rounded-full flex justify-center items-center bg-white">
      <img src="../icon-rock.svg" width="115" height="115" alt="Rock"/>
    </div>
)

const PaperComponent = (
    <div className="w-2/3 h-4/5 border-[15px] border-[#4865F4] rounded-full flex justify-center items-center bg-white">
      <img src="../icon-paper.svg" width="115" height="115" alt="Paper"/>
    </div>
)

const ScissorsComponent = (
    <div className="w-2/3 h-4/5 border-[15px] border-[#EC9E0E] rounded-full flex justify-center items-center bg-white">
      <img src="../icon-scissors.svg" width="115" height="115" alt="Scissors"/>
    </div>
)

  const ResultPageMobile = (
    <>
    <div className="w-4/5 md:w-1/2 h-1/6 border border-gray-400 rounded-xl mx-auto mt-5 md:mt-8 lg:mt-12 flex justify-between items-center px-5">
      <div className="w-1/4 h-full grow flex flex-col justify-center text-white font-bold text-2xl ont-['Barlow_Semi_Condensed'] truncate">
        <span>ROCK</span>
        <span>PAPER</span>
        <span>SCISSORS</span>
      </div>
      <div className="w-1/3 md:w-1/5 h-4/5 border rounded-xl bg-white text-center py-2 flex flex-col justify-between">
        <span className="font-['Barlow_Semi_Condensed'] text-sm text-[#2A46C0] truncate">SCORE</span>
        <span className="font-['Barlow_Semi_Condensed'] text-5xl text-[#3B4363] truncate">{score}</span>
      </div>
    </div>
    <div className="w-full h-full flex flex-wrap justify-center mt-20">
      <div className="w-4/5 md:w-2/3 h-1/3 flex">
        <div className="w-1/2 h-full flex justify-around flex-col pr-2">
          <div className="w-full h-2/4 flex justify-center items-center">
            {choice === "Rock" ? RockComponentMobile : choice === "Paper" ? PaperComponentMobile : choice === "Scissors" ? ScissorsComponentMobile : <></>}
          </div>
          <div className="w-full h-1/4 flex justify-center">
            <span className="font-['Barlow_Semi_Condensed'] text-sm text-white font-semibold">YOU PICKED</span>
          </div>
        </div>
        <div className="w-1/2 h-full flex justify-around flex-col pl-2">
          <div className="w-full h-2/4 flex justify-center items-center">
          {house === "Rock" ? RockComponentMobile : house === "Paper" ? PaperComponentMobile : house === "Scissors" ? ScissorsComponentMobile : <></>}
          </div>
          <div className="w-full h-1/4 flex justify-center">
            <span className="font-['Barlow_Semi_Condensed'] text-sm text-white font-semibold">THE HOUSE PICKED</span>
          </div>
        </div>
      </div>
      <div className="w-full h-full flex justify-center">
          <div className="w-full h-1/2 flex flex-col items-center">
            <span className="font-['Barlow_Semi_Condensed'] text-4xl text-white font-bold pb-3">{result === "Win" ? "YOU WIN" : result === "Loose" ? "YOU LOOSE" : result === "Draw" ? "DRAW" : "ERROR"}</span>
            <button className="w-2/3 h-1/6 border rounded-lg bg-white text-[#2A46C0] font-['Barlow_Semi_Condensed'] hover:scale-110" onClick={handleRematch}>PLAY AGAIN</button>
          </div>
      </div>
    </div>
    
  </>
  )

  const ResultPage = (
    <>
      <div className="w-4/5 md:w-1/2 h-1/6 border border-gray-400 rounded-xl mx-auto mt-5 md:mt-8 lg:mt-12 flex justify-between items-center px-5">
        <div className="w-1/4 h-full grow flex flex-col justify-center text-white font-bold text-2xl ont-['Barlow_Semi_Condensed'] truncate">
          <span>ROCK</span>
          <span>PAPER</span>
          <span>SCISSORS</span>
        </div>
        <div className="w-1/3 md:w-1/5 h-4/5 border rounded-xl bg-white text-center py-2 flex flex-col justify-between">
          <span className="font-['Barlow_Semi_Condensed'] text-sm text-[#2A46C0] truncate">SCORE</span>
          <span className="font-['Barlow_Semi_Condensed'] text-5xl text-[#3B4363] truncate">{score}</span>
        </div>
      </div>
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-4/5 md:w-2/3 h-2/3 flex">
          <div className="w-1/3 h-full flex flex-col justify-around">
            <div className="w-full h-1/4 flex justify-center items-center">
              <span className="font-['Barlow_Semi_Condensed'] text-base text-white font-semibold">YOU PICKED</span>
            </div>
            <div className="w-full h-2/4 flex justify-center items-center">
              {choice === "Rock" ? RockComponent : choice === "Paper" ? PaperComponent : choice === "Scissors" ? ScissorsComponent : <></>}
            </div>
          </div>
          <div className="w-1/3 h-full flex justify-center items-center">
            <div className="w-full h-1/2 flex flex-col justify-center items-center">
              <span className="font-['Barlow_Semi_Condensed'] text-4xl text-white font-bold pb-3">{result === "Win" ? "YOU WIN" : result === "Loose" ? "YOU LOOSE" : result === "Draw" ? "DRAW" : "ERROR"}</span>
              <button className="w-full h-1/6 border rounded-lg bg-white text-[#2A46C0] font-['Barlow_Semi_Condensed'] hover:scale-110" onClick={handleRematch}>PLAY AGAIN</button>
            </div>
          </div>
          <div className="w-1/3 h-full flex flex-col justify-around">
          <div className="w-full h-1/4 flex justify-center items-center">
              <span className="font-['Barlow_Semi_Condensed'] text-base text-white font-semibold">THE HOUSE PICKED</span>
            </div>
            <div className="w-full h-2/4 flex justify-center items-center">
            {house === "Rock" ? RockComponent : house === "Paper" ? PaperComponent : house === "Scissors" ? ScissorsComponent : <></>}
            </div>
          </div>
        </div>
      </div>
    </>
  )

  const GamePage = (
    <>
      <div className="w-4/5 md:w-1/2 h-1/6 border border-gray-400 rounded-xl mx-auto mt-5 md:mt-8 lg:mt-12 flex justify-between items-center px-5">
        <div className="w-1/4 h-full grow flex flex-col justify-center text-white font-bold text-2xl ont-['Barlow_Semi_Condensed'] truncate">
          <span>ROCK</span>
          <span>PAPER</span>
          <span>SCISSORS</span>
        </div>
        <div className="w-1/3 md:w-1/5 h-4/5 border rounded-xl bg-white text-center py-2 flex flex-col justify-between">
          <span className="font-['Barlow_Semi_Condensed'] text-sm text-[#2A46C0] truncate">SCORE</span>
          <span className="font-['Barlow_Semi_Condensed'] text-5xl text-[#3B4363] truncate">{score}</span>
        </div>
      </div>
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-4/5 md:w-1/3 h-1/2 flex relative">
          <img className="m-auto" src="../bg-triangle.svg" alt="Triangle" />
          <button className="w-5/12 h-1/3 sm:h-1/2 border-[15px] border-[#DC2E4E] rounded-full flex justify-center items-center bg-white absolute top-[60%] sm:top-1/2 left-1/2 -translate-x-1/2 hover:scale-110"
            onClick={() => handleClick("Rock")}>
          <img src="../icon-rock.svg" alt="Rock"/>
        </button>
        <button className="w-5/12 h-1/3 sm:h-1/2 border-[15px] border-[#4865F4] rounded-full flex justify-center items-center bg-white absolute bottom-2/3 left-0 hover:scale-110"
          onClick={() => handleClick("Paper")}>
          <img src="../icon-paper.svg" alt="Paper"/>
        </button>
        <button className="w-5/12 h-1/3 sm:h-1/2 border-[15px] border-[#EC9E0E] rounded-full flex justify-center items-center bg-white absolute bottom-2/3 right-0 hover:scale-110"
          onClick={() => handleClick("Scissors")}>
          <img src="../icon-scissors.svg" alt="Scissors"/>
        </button>
        </div>
      </div>
    </>
  )

  return (
    <>
      {!selector ? GamePage : size.width > 600 ? ResultPage : ResultPageMobile}
    </>
  );
}

export default App;
