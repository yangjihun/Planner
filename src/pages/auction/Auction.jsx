import React, { useState, useEffect } from "react";

const Auction = () => {
  const [auctionPrices, setAuctionPrices] = useState({});
  const [currentTime, setCurrentTime] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

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

    return () => clearInterval(intervalId);
  }, []);

  const saveValue = () => {
    const enteredValue = parseInt(inputValue);
    if (enteredValue % 10000 !== 0) {
      alert("금액은 만원 단위로 입력해주세요.");
      return;
    }
    const key = `${selectedCategory}_${selectedRegion}`;
    setAuctionPrices((prevState) => {
      const currentAuction = prevState[key] || {};
      const { maxValue, secondMaxValue } = currentAuction;

      if (!maxValue || enteredValue > maxValue) {
        return {
          ...prevState,
          [key]: {
            maxValue: enteredValue,
            secondMaxValue:
              maxValue !== undefined
                ? enteredValue !== maxValue
                  ? maxValue
                  : secondMaxValue
                : secondMaxValue,
          },
        };
      } else if (
        !secondMaxValue ||
        (enteredValue > secondMaxValue && enteredValue !== maxValue)
      ) {
        return {
          ...prevState,
          [key]: {
            ...currentAuction,
            secondMaxValue: enteredValue,
          },
        };
      }

      return prevState;
    });

    setInputValue("");
  };

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      saveValue();
    }
  };

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const currentKey = `${selectedCategory}_${selectedRegion}`;
  const currentAuction = auctionPrices[currentKey] || {};

  return (
    <div className="relative min-h-screen flex flex-col bg-scary-gradient bg-[length:200%_200%] animate-bg-move text-white overflow-hidden">
      <header className="p-4">
        <div className="text-center text-3xl font-bold">광고 경매장</div>
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
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-120">
          <div className="font-digital-7 text-2xl mt-0">
            {selectedRegion && selectedCategory && (
              <>
                <p className="mb-2">
                  최고 입찰가:{" "}
                  <span id="maxValue">
                    {numberWithCommas(currentAuction.maxValue || 0)}원
                  </span>
                </p>
                <p className="mb-2">
                  2번째 높은 입찰가 :{" "}
                  <span id="secondMaxValue">
                    {numberWithCommas(currentAuction.secondMaxValue || 0)}원
                  </span>
                </p>
              </>
            )}
          </div>
          <select
            value={selectedRegion}
            onChange={handleRegionChange}
            className="w-full p-2 mb-2 rounded-lg bg-gray-700 text-white"
          >
            <option value="">지역 선택</option>
            <option value="서울특별시">서울특별시</option>
            <option value="부산광역시">부산광역시</option>
            <option value="대구광역시">대구광역시</option>
            <option value="인천광역시">인천광역시</option>
            <option value="광주광역시">광주광역시</option>
            <option value="대전광역시">대전광역시</option>
            <option value="울산광역시">울산광역시</option>
            <option value="세종특별자치시">세종특별자치시</option>
            <option value="경기도">경기도</option>
            <option value="강원도">강원도</option>
            <option value="충청북도">충청북도</option>
            <option value="충청남도">충청남도</option>
            <option value="전라북도">전라북도</option>
            <option value="전라남도">전라남도</option>
            <option value="경상북도">경상북도</option>
            <option value="경상남도">경상남도</option>
            <option value="제주특별자치도">제주특별자치도</option>
          </select>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full p-2 mb-2 rounded-lg bg-gray-700 text-white"
          >
            <option value="">업종 선택</option>
            <option value="한식">한식</option>
            <option value="중식">중식</option>
            <option value="양식">양식</option>
            <option value="일식">일식</option>
            <option value="카페">카페</option>
          </select>
          {selectedRegion && selectedCategory && (
            <>
              <input
                type="text"
                id="bidInput"
                placeholder="만원 단위 금액을 입력하세요"
                className="w-full p-2 mb-4 rounded-lg bg-gray-700 text-white"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                id="bidbutton"
                onClick={saveValue}
                className="w-full p-2 bg-red-700 hover:bg-red-800 rounded-lg text-white"
              >
                저장하기
              </button>
            </>
          )}
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
