import { useState, useEffect } from 'react';

function SelectPlace({ placesData, pick, onDragStart, onFilterChange, isKind }) {
  const [filteredData, setFilteredData] = useState([]);
  const [activeCategory, setActiveCategory] = useState('korean');
  const [Kind, setKind] = useState(false);

  useEffect(() => {
    const filterResults = () => {
      const filteredResults = placesData.filter(item =>
        item.name.toLowerCase().includes(pick.toLowerCase())
      );
      setFilteredData(filteredResults);
    };

    filterResults();
  }, [pick, placesData, activeCategory]);

  useEffect(() => {}, [activeCategory]);

  useEffect(() => {
    isKind(Kind);
  }, [Kind, isKind]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    onFilterChange(category);
  };

  const toggleKind = () => {
    const newKindState = !Kind;
    setKind(newKindState);
    handleCategoryChange(activeCategory);
  };

  return (
    <div className="w-full p-4 pt-0 space-y-4 overflow-y-auto" style={{ minHeight: '500px', maxHeight: '500px' }}>
      <div 
          onClick={toggleKind}
          className="flex items-center justify-between mb-4 sticky cursor-pointer top-0 bg-green-100 z-10 p-4 rounded-lg shadow-md">        <span className="text-gray-700 font-semibold">착한 식당</span>
        <button
          className={`relative inline-flex items-center h-6 rounded-full w-11 transition ${Kind ? 'bg-green-500' : 'bg-gray-300'}`}
        >
          <span
            className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${Kind ? 'translate-x-6' : 'translate-x-1'}`}
          />
        </button>
      </div>
      <div className="flex space-x-2 mb-4 sticky top-12 bg-white z-10 p-2">
        {['korean', 'chinese', 'western', 'cafe'].map(category => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`flex-1 py-2 px-4 text-center rounded-lg transition text-nowrap font-semibold ${activeCategory === category ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
          >
            {category === 'korean' && '한식'}
            {category === 'chinese' && '중식'}
            {category === 'western' && '양식'}
            {category === 'cafe' && '카페'}
          </button>
        ))}
      </div>
      {filteredData.map((location) => (
        <div
          className="p-4 bg-white rounded-lg shadow-md cursor-pointer hover:bg-gray-50 transition w-full"
          draggable="true"
          key={location.id}
          onDragStart={(e) => {
            onDragStart(location);
            e.dataTransfer.setData("text/plain", JSON.stringify(location));
          }}
        >
          <div className="flex flex-col justify-center h-full">
            <p className="text-lg font-semibold text-gray-800">{location.name}</p>
            <div className="text-sm text-gray-600 overflow-hidden text-ellipsis">
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
