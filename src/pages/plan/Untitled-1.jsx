
function S({ selectedDates, onDrop }){
  
  return(
    <div className="pl-6 pr-6 pb-6 space-y-6 h-full overflow-y-auto mt-6 mb-6 rounded-lg" style={{ maxHeight: '500px' }}>
      {selectedDates.map((date, dateIndex) => (
        <div key={dateIndex}>
          {date.items && date.items.map((item, itemIndex) => (
            <div key={itemIndex}>
              
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default S