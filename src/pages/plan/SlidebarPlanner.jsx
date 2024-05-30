
function SlidebarPlanner({ selectedDates, onDrop }){
  const handleDeleteItem = (dateIndex, itemIndex) => {
    const updatedDates = selectedDates.map((date, i) => {
      if (i === dateIndex) {
        return {
          ...date,
          items: date.items.filter((_, j) => j !== itemIndex),
        };
      }
      return date;
    });

    // 상태를 업데이트하기 위해 부모 컴포넌트로 콜백 함수를 전달합니다.
    onDrop(updatedDates);
  };

  const handleStartTimeChange = (dateIndex, itemIndex, value) => {
    const updatedDates = selectedDates.map((date, i) => {
      if (i === dateIndex) {
        return {
          ...date,
          items: date.items.map((item, j) => {
            if (j === itemIndex) {
              return { ...item, startTime: value };
            }
            return item;
          }),
        };
      }
      return date;
    });

    onDrop(updatedDates);
  };

  const handleEndTimeChange = (dateIndex, itemIndex, value) => {
    const updatedDates = selectedDates.map((date, i) => {
      if (i === dateIndex) {
        return {
          ...date,
          items: date.items.map((item, j) => {
            if (j === itemIndex) {
              return { ...item, endTime: value };
            }
            return item;
          }),
        };
      }
      return date;
    });

    onDrop(updatedDates);
  };

  return(
    <div className="pl-6 pr-6 pb-6 space-y-6 h-full overflow-y-auto mt-6 mb-6 rounded-lg" style={{ maxHeight: '500px' }}>
      {selectedDates.map((date, dateIndex) => (
        <div
          className="p-4 bg-gray-50 rounded-lg shadow hover:bg-gray-100 transition cursor-pointer"
          key={dateIndex}
          onDrop={(e) => {
            e.preventDefault();
            onDrop(dateIndex);
          }}
          onDragOver={(e) => e.preventDefault()}
        >
          <div className="flex flex-col mb-4">
            <h3 className="text-lg font-semibold text-gray-700">{date.date}</h3>
            <h3 className="text-lg font-semibold text-gray-700">{date.cost}원</h3>
          </div>
          {date.items && date.items.map((item, itemIndex) => (
            <div className="flex justify-between items-center mt-4 cursor-pointer" key={itemIndex}>
              <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white font-bold">
                {itemIndex + 1}
              </div>
              <div className="relative border-2 border-gray-200 rounded-lg p-2 w-56 h-24 text-sm font-semibold bg-white shadow-sm">
                <div className="text-gray-800 w-4/4 flex justify-between">
                  {item.name}
                  <button
                    className="px-2 py-1 bg-red-500 text-white text-xs rounded-md hover:bg-red-600 transition-colors duration-200 ease-in-out shadow focus:outline-none focus:ring-2 focus:ring-red-300"
                    onClick={() => handleDeleteItem(dateIndex, itemIndex)}
                  >
                    삭제
                  </button>
                </div>
                <div className="text-xs text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">
                  {item.address}
                </div>
                <div className="absolute bottom-0 left-0 w-full flex justify-between items-center p-1 bg-gray-50 rounded-b-lg">
                  <input
                    className="w-28 p-1 pl-0 border border-gray-300 rounded-md text-xs"
                    type="time"
                    value={item.startTime || ''}
                    onChange={(e) => handleStartTimeChange(dateIndex, itemIndex, e.target.value)}
                  />
                  <span className="mx-1">-</span>
                  <input
                    className="w-28 p-1 pl-0 border border-gray-300 rounded-md text-xs"
                    type="time"
                    value={item.endTime || ''}
                    onChange={(e) => handleEndTimeChange(dateIndex, itemIndex, e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default SlidebarPlanner