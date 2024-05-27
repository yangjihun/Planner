import { useState, useEffect } from "react";

const Auction = () => {
  const [maxValue, setMaxValue] = useState(0);
  const [secondMaxValue, setSecondMaxValue] = useState(0);
  const [currentTime, setCurrentTime] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      let seconds = now.getSeconds();

      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      const timeString = `${hours}:${minutes}:${seconds}`;
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const saveValue = () => {
    const enteredValue = parseInt(inputValue);
    if (enteredValue > maxValue) {
      setSecondMaxValue(maxValue);
      setMaxValue(enteredValue);
    } else if (enteredValue > secondMaxValue) {
      setSecondMaxValue(enteredValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      saveValue();
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-scary-gradient bg-[length:200%_200%] animate-bg-move text-white overflow-hidden">
      <header className="p-4">
        <div className="text-center text-3xl font-bold">경매장</div>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center relative">
        <div className="text-center mb-4">
          <div
            id="currentTime"
            className="text-7xl font-digital-7 text-bold p-3 rounded-md"
            style={{ fontFamily: "DS-DIGITAL" }}
          >
            {currentTime}
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-80">
          <div className="mt-0">
            <p className="mb-2">
              저장된 최대 값: <span id="maxValue">{maxValue}원</span>
            </p>
            <p className="mb-4">
              저장된 두 번째로 큰 값:{" "}
              <span id="secondMaxValue">{secondMaxValue}원</span>
            </p>
          </div>
          <input
            type="number"
            id="bidInput"
            placeholder="값을 입력하세요"
            className="w-full p-2 mb-4 rounded-lg bg-gray-700 text-white"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            id="bidbutton"
            onClick={saveValue}
            className="w-full p-2 bg-red-700 hover:bg-red-800 rounded-lg text-white"
          >
            저장하기
          </button>
        </div>
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-20 left-10 w-10 h-10 bg-white rounded-full opacity-30 animate-ghost-float"></div>
          <div className="absolute top-40 right-20 w-10 h-10 bg-white rounded-full opacity-30 animate-ghost-float"></div>
          <div className="absolute top-60 left-1/2 w-10 h-10 bg-white rounded-full opacity-30 animate-ghost-float"></div>
          <div className="absolute bottom-40 right-5 w-8 h-8 bg-white rounded-full opacity-30 animate-ghost-float"></div>
          <div className="absolute top-50 left-1/4 w-10 h-10 bg-white rounded-full opacity-30 animate-ghost-float"></div>
        </div>
      </main>
    </div>
  );
};

export default Auction;
