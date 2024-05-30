import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './SlidebarMyList.css'; // 애니메이션 효과를 위한 CSS 파일

function SlidebarMyList({ myList, setMyList }) {
  const [newTitle, setNewTitle] = useState('');
  const [newColor, setNewColor] = useState('#ff9aa2'); 
  const [btnClick, setBtnClick] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const inputRef = useRef(null);
  const colorPickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setBtnClick(false);
      }
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
        setShowColorPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDeleteItem = (listIndex, itemIndex) => {
    const updatedLists = myList.map((list, i) => {
      if (i === listIndex) {
        return {
          ...list,
          items: list.items.filter((_, j) => j !== itemIndex),
        };
      }
      return list;
    });

    setMyList(updatedLists);
  };

  const handleDeleteList = (listIndex) => {
    const updatedLists = myList.filter((_, i) => i !== listIndex);
    setMyList(updatedLists);
  };

  const handleAddItem = () => {
    setMyList([...myList, { title: (newTitle || "My List"), color: newColor, items: [] }]);
    setNewTitle('');
    setNewColor('#ff9aa2');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddItem();
      setBtnClick(false);
    }
  };

  const handleDrop = (e, listIndex) => {
    e.preventDefault();
    const droppedData = JSON.parse(e.dataTransfer.getData("text/plain"));
    const updatedLists = myList.map((list, i) => {
      if (i === listIndex) {
        return {
          ...list,
          items: [...list.items, { name: droppedData.name, address: droppedData.address, startTime: '', endTime: '' }],
        };
      }
      return list;
    });

    setMyList(updatedLists);
  };

  const handleStartTimeChange = (listIndex, itemIndex, value) => {
    const updatedLists = myList.map((list, i) => {
      if (i === listIndex) {
        return {
          ...list,
          items: list.items.map((item, j) => {
            if (j === itemIndex) {
              return { ...item, startTime: value };
            }
            return item;
          }),
        };
      }
      return list;
    });

    setMyList(updatedLists);
  };

  const handleEndTimeChange = (listIndex, itemIndex, value) => {
    const updatedLists = myList.map((list, i) => {
      if (i === listIndex) {
        return {
          ...list,
          items: list.items.map((item, j) => {
            if (j === itemIndex) {
              return { ...item, endTime: value };
            }
            return item;
          }),
        };
      }
      return list;
    });

    setMyList(updatedLists);
  };

  const Btn = () => {
    setBtnClick(true);
  };

  const colors = [
    { name: 'Soft Pink', value: '#ff9aa2' },
    { name: 'Coral', value: '#ff7f50' },
    { name: 'Light Green', value: '#b5ead7' },
    { name: 'Mint', value: '#9de0ad' },
    { name: 'Pale Blue', value: '#a8e6cf' },
    { name: 'Lavender', value: '#cbaacb' },
    { name: 'Lemon', value: '#ffeebb' },
    { name: 'Sky Blue', value: '#a2d5f2' },
];

  

  return (
    <div className="p-6 space-y-6 h-full overflow-y-auto mt-6 mb-6 rounded-lg" style={{ maxHeight: '500px' }}>
      <TransitionGroup>
        {myList.map((list, listIndex) => (
          <CSSTransition key={listIndex} timeout={500} classNames="fade" exit={false}>
            <div
              className="w-full mb-4 border border-gray-200 rounded-lg shadow-sm"
              onDrop={(e) => handleDrop(e, listIndex)}
              onDragOver={(e) => e.preventDefault()}
            >
              <div className="flex items-center justify-between p-4 bg-gray-100 rounded-t-lg">
                <div className="flex items-center">
                  <div className="h-8 w-1 mr-3 rounded" style={{ backgroundColor: list.color || '#ff9aa2' }}></div>
                  <span className="text-lg font-semibold text-gray-700">{list.title}</span>
                </div>
                <button
                  className="px-2 py-1 text-white text-xs rounded-md hover:bg-red-600 transition-colors duration-200 ease-in-out shadow focus:outline-none focus:ring-2 focus:ring-red-300"
                  style={{ backgroundColor: list.color || '#ff9aa2' }}
                  onClick={() => handleDeleteList(listIndex)}
                >
                  <b>삭제</b>
                </button>
              </div>
              <div className="p-4 bg-white min-h-20 rounded-b-lg">
                {list.items.map((item, itemIndex) => (
                  <div className="flex justify-between items-center mt-4" key={itemIndex}>
                    <div className="relative flex border-2 border-gray-200 rounded-lg w-full max-w-80 h-20 text-sm font-semibold bg-white shadow-sm">
                      <div className="h-full w-3 mr-2 rounded-l-md" style={{ backgroundColor: list.color || '#ff9aa2' }}></div>
                      <div className='w-full p-2'>
                        <div className="w-full flex justify-between text-lg mb-2">
                          <span className='w-3/4 max-w-40 overflow-hidden text-ellipsis text-nowrap'>{item.name}</span>
                          <button
                            className="px-2 py-1 max-h-7 text-white text-xs text-nowrap rounded-md hover:bg-red-600 transition-colors duration-200 ease-in-out shadow focus:outline-none focus:ring-2 focus:ring-red-300"
                            style={{ backgroundColor: list.color || '#ff9aa2' }}
                            onClick={() => handleDeleteItem(listIndex, itemIndex)}
                          >
                            삭제
                          </button>
                        </div>
                        <div className="w-3/4 max-w-40 text-xs text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">
                          {item.address}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
      
      {!btnClick && (
        <button className='flex justify-center w-10 h-10 bg-yellow-500 text-white rounded-full shadow hover:bg-yellow-600 transition duration-200' onClick={Btn}>
          <b className="text-3xl">+</b>
        </button>
      )}
      {btnClick && (
        <div ref={inputRef} className="space-y-2 p-4 bg-gray-50 rounded-lg shadow-lg relative">
          <div className="flex items-center space-x-2">
            <div
              className="w-10 h-9 rounded-full border cursor-pointer"
              style={{ backgroundColor: newColor }}
              onClick={() => setShowColorPicker(true)}
            ></div>
            <input
              type="text"
              value={newTitle}
              placeholder="Enter title"
              className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          {showColorPicker && (
            <div ref={colorPickerRef} className="absolute bg-white border rounded p-4 shadow-lg z-10">
              <div className="grid grid-cols-4 gap-2">
                {colors.map((color) => (
                  <div
                    key={color.value}
                    className="w-8 h-8 rounded-full cursor-pointer"
                    style={{ backgroundColor: color.value }}
                    onClick={() => {
                      setNewColor(color.value);
                      setShowColorPicker(false);
                    }}
                  ></div>
                ))}
              </div>
            </div>
          )}
          <button
            className="w-full bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition-colors duration-200"
            onClick={handleAddItem}
          >
            Add Item
          </button>
        </div>
      )}
    </div>
  );
}

export default SlidebarMyList;
