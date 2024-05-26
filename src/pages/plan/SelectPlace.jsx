import { useState, useEffect } from 'react';
import placeData from "./서울식당.json";

function SelectPlace({ placesData, pick, onDragStart, onFilterChange }) {
  const [filteredData, setFilteredData] = useState([]);
  const [activeCategory, setActiveCategory] = useState('tourist'); // 초기 카테고리 설정

  useEffect(() => {
    const filterResults = () => {
      const touristResults = placeData.filter(item =>
        item.name.toLowerCase().includes(pick.toLowerCase())
      );
      const restaurantResults = placesData.filter(item =>
        item.name.toLowerCase().includes(pick.toLowerCase())
      );
      const koreanResults = placesData.filter(item =>
        item.name.toLowerCase().includes(pick.toLowerCase())
      );
      const chineseResults = placesData.filter(item =>
        item.name.toLowerCase().includes(pick.toLowerCase())
      );
      const westernResults = placesData.filter(item =>
        item.name.toLowerCase().includes(pick.toLowerCase())
      );
      const cafeResults = placesData.filter(item =>
        item.name.toLowerCase().includes(pick.toLowerCase())
      );

      switch (activeCategory) {
        case 'tourist':
          setFilteredData(touristResults);
          break;
        case 'restaurant':
          setFilteredData(restaurantResults);
          break;
        case '한식':
          setFilteredData(koreanResults);
          break;
        case '중식':
          setFilteredData(chineseResults);
          break;
        case '양식':
          setFilteredData(westernResults);
          break;
        case 'cafe':
          setFilteredData(cafeResults);
          break;
        default:
          setFilteredData([]);
      }
    };

    filterResults();
  }, [pick, placesData, activeCategory]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    onFilterChange(category);
  };

  return (
    <div className="w-full p-4 space-y-4 overflow-y-auto" style={{ minHeight: '500px', maxHeight: '500px' }}>
      <div className="flex space-x-1 mb-4 sticky top-0">
        <button
          onClick={() => handleCategoryChange('tourist')}
          className={`flex-1 p-2 text-center rounded-lg transition text-nowrap ${
            activeCategory === 'tourist' ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          착한<br />식당
        </button>
        <button
          onClick={() => handleCategoryChange('restaurant')}
          className={`flex-1 p-2 text-center rounded-lg transition text-nowrap ${
            activeCategory === 'restaurant' ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          식당
        </button>
        <button
          onClick={() => handleCategoryChange('한식')}
          className={`flex-1 p-2 text-center rounded-lg transition text-nowrap ${
            activeCategory === '한식' ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          한식
        </button>
        <button
          onClick={() => handleCategoryChange('중식')}
          className={`flex-1 p-2 text-center rounded-lg transition text-nowrap ${
            activeCategory === '중식' ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          중식
        </button>
        <button
          onClick={() => handleCategoryChange('양식')}
          className={`flex-1 p-2 text-center rounded-lg transition text-nowrap ${
            activeCategory === '양식' ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          양식
        </button>
        <button
          onClick={() => handleCategoryChange('cafe')}
          className={`flex-1 p-2 text-center rounded-lg transition text-nowrap ${
            activeCategory === 'cafe' ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          카페
        </button>
      </div>
      {filteredData.map((location) => (
        <div
          className="p-4 bg-white rounded-lg shadow cursor-pointer hover:bg-gray-100 transition w-4/4"
          draggable="true"
          key={location.id}
          onDragStart={() => onDragStart(location)}
        >
          <div className="flex flex-col justify-center h-full">
            <div className="text-lg font-semibold">{location.name}</div>
            <div className="text-sm text-gray-500 overflow-hidden text-ellipsis">
              {location.address}
            </div>
            <div className="hidden time mt-2 items-center space-x-2">
              <input
                className="w-20 p-2 border border-gray-300 rounded"
                type="time"
                placeholder="00:00"
              />
              <span>-</span>
              <input
                className="w-20 p-2 border border-gray-300 rounded"
                type="time"
                placeholder="00:00"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SelectPlace;
