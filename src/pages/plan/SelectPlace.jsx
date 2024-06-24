import { useState, useEffect } from 'react';

function SelectPlace({ placesData, pick, onDragStart, onFilterChange, isKind, onPlaceClick }) {
  const [filteredData, setFilteredData] = useState([]);
  const [activeCategory, setActiveCategory] = useState('korean');
  const [Kind, setKind] = useState(false);

  useEffect(() => {
    const filterResults = () => {
      let tops;
      if(activeCategory==="western"){
        tops = [{name:"이민성 치킨",address:"중구 을지로 12길 38",location: {lat: 37.5610364, lng: 126.9823871},type: "korean"},
        {name:"민성파스타",address:"중구 오장동 101-24",location: {lat: 37.5610364, lng: 126.9823871},type: "korean"}];
      }
      else if(activeCategory==="korean"){
        tops = [{name:"이민성 김밥",address:"중구 을지로 12길 38",location: {lat: 37.5610364, lng: 126.9823871},type: "korean"},
        {name:"이민성 쌈밥",address:"중구 오장동 101-24",location: {lat: 37.5610364, lng: 126.9823871},type: "korean"}];
      }
      else if(activeCategory==="chinese"){
        tops = [{name:"짬뽕은 이민성",address:"중구 을지로 12길 38",location: {lat: 37.5610364, lng: 126.9823871},type: "korean"},
        {name:"민성각",address:"중구 오장동 101-24",location: {lat: 37.5610364, lng: 126.9823871},type: "korean"}];
      }
      else if(activeCategory==="cafe"){
        tops = [{name:"MGC 민성커피",address:"중구 을지로 12길 38",location: {lat: 37.5610364, lng: 126.9823871},type: "korean"},
        {name:"민성벅스",address:"중구 오장동 101-24",location: {lat: 37.5610364, lng: 126.9823871},type: "korean"}];
      }
      
      const filteredResults = tops.concat(placesData.filter(item =>
        item.name.toLowerCase().includes(pick.toLowerCase())
      ));
      
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
          className="flex items-center justify-between mb-4 sticky cursor-pointer top-0 bg-green-100 z-10 p-4 rounded-lg shadow-md">        
        <span className="text-gray-700 font-semibold">착한 식당</span>
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
          onClick={() => onPlaceClick(location)} // 추가된 부분
          onDragStart={(e) => {
            onDragStart(location);
            e.dataTransfer.setData("text/plain", JSON.stringify(location));
          }}
        >
          <div className=" relative flex flex-col justify-center h-full">
            <p className="text-lg font-semibold text-gray-800">{location.name}</p>
            {filteredData[0].address===location.address ? <p className='absolute right-0 top-0 text-xs text-gray-500 border border-1 border-gray-300 pl-1 pr-1 rounded-xl'>광고</p> : ''}
            {filteredData[1].address===location.address ? <p className='absolute right-0 top-0 text-xs text-gray-500 border border-1 border-gray-300 pl-1 pr-1 rounded-xl'>광고</p> : ''}
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
