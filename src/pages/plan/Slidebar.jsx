import { useState } from 'react';
import SlidebarPlanner from './SlidebarPlanner';
import SlidebarMyList from './SlidebarMyList';

function Slidebar({ selectedDates, onDrop, name }) {
  const [isPlanner, setPlanner] = useState(true);
  const [isMyList, setMyList] = useState(false);
  const [myList, setMyListState] = useState([{ title: 'My List', items: [] }]);
  /*  데이터 json형식으로 변환
  const sendData = () => {
    console.log(selectedDates);
  };
  */

  const handle = () => {
    if (navigator.share) {
        navigator.share({
            title: 'favicon',
            url: './plan',
        });
    } else{
        alert("공유하기가 지원되지 않는 환경 입니다.");
    }
  }
  const Planner = () => {
    setMyList(false);
    setPlanner(true);
  };

  const MyList = () => {
    setMyList(true);
    setPlanner(false);
  };

  const handleDrop = (updatedLists) => {
    onDrop(updatedLists);
  };

  return (
    <div className="font-sans bg-gray-200 h-full w-full shadow-md border border-gray-200">
      <div className="flex justify-between text-2xl font-bold mb-6 text-gray-800">
        <button className={`pt-6 pb-4 flex justify-center w-1/2 ${isPlanner ? "" : 'bg-gray-100 rounded-br-xl'}`} onClick={Planner}>Planner</button>
        <button className={`pt-6 pb-4 flex justify-center w-1/2 ${isPlanner ? "bg-gray-100 rounded-bl-xl" : ''}`} onClick={MyList}>My-List</button>
      </div>
      {isPlanner ?
        <SlidebarPlanner selectedDates={selectedDates} onDrop={handleDrop} /> :
        <SlidebarMyList myList={myList} setMyList={setMyListState} />
      }
      <div className="flex justify-center items-center h-16">
        <button className="w-1/2 h-full bg-blue-500 text-white rounded-lg flex items-center justify-center shadow hover:bg-blue-600 transition" onClick={() => {handle()}}>
          공유하기
        </button>
      </div>
    </div>
  );
}

export default Slidebar;
