import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import Sidebar from "./Sidebar";
import "./Plan.css";
import kind_china from "./서울_중식.json"; // 서울식당.json 파일을 가져옴
import kind_korea from "./서울_한식.json";
import kind_usa from "./서울_양식.json";
import kind_cafe from "./서울_카페.json";
const containerStyle = {
  width: "100%",
  height: "100vh",
};

function Plan({ name }) {
  const location = useLocation();
  const [center, setCenter] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [placesData, setPlacesData] = useState([]);
  const [filteredPlacesData, setFilteredPlacesData] = useState([]);
  const [currentAddress, setCurrentAddress] = useState(''); // 현재 주소 상태 추가
  const mapRef = useRef(null);
  const geocoder = useRef(null);
  const [isClick, setIsClick] = useState("korean");
  const [isKind, setIsKind] = useState(false);
  const [draggedElement, setDraggedElement] = useState(null); // 추가된 부분

  useEffect(() => {
    if (location.state && location.state.center && location.state.center.coords) {
      const initialCenter = {
        lat: location.state.center.coords.lat,
        lng: location.state.center.coords.lng,
      };
      setCenter(initialCenter);
      if (geocoder.current) {
        geocodeLatLng(initialCenter);
      }
    } else {
      console.error("Invalid location state");
    }
  }, [location]);

  useEffect(() => {
    handleFilterChange();
  }, [isClick, isKind]);

  const onLoad = (map) => {
    mapRef.current = map;
    geocoder.current = new window.google.maps.Geocoder();
    searchNearbyPlaces(map.getCenter(), 'korean'); // 기본 검색어를 '한식'으로 설정

    if (center) {
      geocodeLatLng(center);
    }
  };

  const searchNearbyPlaces = (location, keyword) => {
    const service = new window.google.maps.places.PlacesService(mapRef.current);
    const request = {
      location: location,
      radius: '2000',
      type: ['restaurant'],
      keyword: keyword,
    };
    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const placesInfo = results.map(place => ({
          name: place.name,
          address: place.vicinity,
          location: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          },
          type: keyword
        }));
        setPlacesData(placesInfo);
        setFilteredPlacesData(placesInfo);
      } else {
        console.error("Places search failed: ", status);
      }
    });
  };

  const handleDragEnd = useCallback(() => {
    if (mapRef.current) {
      const newCenter = mapRef.current.getCenter();
      const newCenterLat = newCenter.lat();
      const newCenterLng = newCenter.lng();

      if (newCenterLat !== center.lat || newCenterLng !== center.lng) {
        const newCenterCoords = {
          lat: newCenterLat,
          lng: newCenterLng,
        };
        setCenter(newCenterCoords);
        if (isKind) {
          loadKindPlacesData(geocoder.current); // tourist 카테고리일 때 JSON 파일을 로드하여 지도에 표시
        } else {
          searchNearbyPlaces(newCenter, isClick); // 기본 검색어를 '한식'으로 설정 / 여기 수정해야됨
        }
        geocodeLatLng(newCenterCoords);
      }
    }
  }, [center, isKind]);

  const geocodeLatLng = (coords) => {
    if (geocoder.current) {
      geocoder.current.geocode({ location: coords }, (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            const addressComponents = results[0].address_components;
            const formattedAddress = formatAddress(addressComponents);
            setCurrentAddress(formattedAddress);
          } else {
            setCurrentAddress('No address found');
          }
        } else {
          setCurrentAddress('Geocoder failed due to: ' + status);
        }
      });
    }
  };

  const formatAddress = (addressComponents) => {
    const country = addressComponents.find(component => component.types.includes("country"))?.long_name || '';
    const administrativeAreaLevel1 = addressComponents.find(component => component.types.includes("administrative_area_level_1"))?.long_name || '';
    const administrativeAreaLevel2 = addressComponents.find(component => component.types.includes("administrative_area_level_2"))?.long_name || '';
    const locality = addressComponents.find(component => component.types.includes("locality"))?.long_name || '';
    const sublocalityLevel1 = addressComponents.find(component => component.types.includes("sublocality_level_1"))?.long_name || '';

    return `${country} ${administrativeAreaLevel1} ${administrativeAreaLevel2} ${locality} ${sublocalityLevel1}`;
  };

  const getLatLng = (address, geocoder) => {
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK && results.length > 0) {
          const location = results[0].geometry.location;
          resolve({ lat: location.lat(), lng: location.lng() });
        } else {
          console.error("Geocode was not successful for the following reason: " + status);
          resolve(null);
        }
      });
    });
  };

  const loadKindPlacesData = async (geocoder) => {
    let geocodedPlaces;
    if (isClick === "korean") {
      geocodedPlaces = await Promise.all(
        kind_korea.map(async (place) => {
          const coords = await getLatLng(place.address, geocoder);
          if (coords) {
            return {
              ...place,
              location: coords,
            };
          } else {
            console.warn(`Geocoding failed for address: ${place.address}`);
            return null;
          }
        })
      );
    } else if (isClick === "chinese") {
      geocodedPlaces = await Promise.all(
        kind_china.map(async (place) => {
          const coords = await getLatLng(place.address, geocoder);
          if (coords) {
            return {
              ...place,
              location: coords,
            };
          } else {
            console.warn(`Geocoding failed for address: ${place.address}`);
            return null;
          }
        })
      );
    } else if (isClick === "western") {
      geocodedPlaces = await Promise.all(
        kind_usa.map(async (place) => {
          const coords = await getLatLng(place.address, geocoder);
          if (coords) {
            return {
              ...place,
              location: coords,
            };
          } else {
            console.warn(`Geocoding failed for address: ${place.address}`);
            return null;
          }
        })
      );
    } else if (isClick === "cafe") {
      geocodedPlaces = await Promise.all(
        kind_cafe.map(async (place) => {
          const coords = await getLatLng(place.address, geocoder);
          if (coords) {
            return {
              ...place,
              location: coords,
            };
          } else {
            console.warn(`Geocoding failed for address: ${place.address}`);
            return null;
          }
        })
      );
    }

    const validPlaces = geocodedPlaces.filter(place => place !== null);
    setPlacesData(validPlaces);
    setFilteredPlacesData(validPlaces);
  };

  const FilterChange = (category) => {
    setIsClick(category);
  }

  const handleFilterChange = () => {
    let keyword = '';
    switch (isClick) {
      case 'korean':
        keyword = 'korean';
        break;
      case 'chinese':
        keyword = 'chinese';
        break;
      case 'western':
        keyword = 'western';
        break;
      case 'cafe':
        keyword = 'cafe';
        break;
      default:
        keyword = 'korean';
    }
    if (isKind) {
      loadKindPlacesData(geocoder.current); // JSON 파일을 로드하여 지도에 표시
    }
    else if (mapRef.current) {
      searchNearbyPlaces(mapRef.current.getCenter(), keyword);
    }
  };

  const handleLoadError = (error) => {
    console.error("Error loading Google Maps API script:", error);
  };

  const handleDragStart = (element) => {
    setDraggedElement(element);
  };

  const handleDropToSlidebar = (index) => {
    if (Array.isArray(index)) {
      setSelectedDates(index);
    } else if (draggedElement) {
      setSelectedDates((prevDates) =>
        prevDates.map((date, i) =>
          i === index ? { ...date, items: [...(date.items || []), draggedElement] } : date
        )
      );
      setDraggedElement(null);
    }
  };

  const handlePlaceClick = (place) => {
    if (mapRef.current) {
      mapRef.current.panTo(place.location);
    }
    setSelectedPlace(place);
  };

  if (!center) {
    return <div>지도를 표시할 위치 정보가 없습니다.</div>;
  }

  const pinkMarkerIcon = {
    url: "http://maps.google.com/mapfiles/ms/icons/pink-dot.png",
  };

  const createNaverLink = (placeName) => {
    const query = encodeURIComponent(placeName);
    return `https://search.naver.com/search.naver?query=${query}`;
  };

  return (
    <div className="plan-container flex-initial">
      <Sidebar
        currentAddress={currentAddress}
        setSelectedDates={setSelectedDates}
        placesData={placesData}
        onFilterChange={FilterChange}
        name={name}
        isKind={setIsKind}
        selectedDates={selectedDates}
        handleDropToSlidebar={handleDropToSlidebar}
        handleDragStart={handleDragStart}
        onPlaceClick={handlePlaceClick} // 추가된 부분
      />
      <div className="map">
        <LoadScript
          googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
          libraries={["places"]}
          onError={handleLoadError}
        >
          <div className="map flex align-middle justify-center" style={{ width: "100%", height: "100%" }}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={15}
              onLoad={onLoad}
              onDragEnd={handleDragEnd}
            >
              {filteredPlacesData.map((place, index) => (
                <Marker
                  key={index}
                  position={place.location}
                  onClick={() => setSelectedPlace(place)}
                  icon={isKind ? pinkMarkerIcon : null} // tourist 카테고리일 때 핑크색 아이콘 사용
                />
              ))}

              {selectedPlace && (
                <InfoWindow
                  position={selectedPlace.location}
                  onCloseClick={() => setSelectedPlace(null)}
                >
                  <div className="p-4 max-w-xs">
                    <div className="border-b pb-2 mb-2">
                      <h2 className="text-lg font-bold text-gray-800">{selectedPlace.name}</h2>
                    </div>
                    <div className="text-gray-600">
                      <p>{selectedPlace.address}</p>
                      {selectedPlace.주요품목 && selectedPlace.가격 && (
                        <p>{selectedPlace.주요품목} - {selectedPlace.가격}원</p>
                      )}
                      {selectedPlace.연락처 && <p>연락처: {selectedPlace.연락처}</p>}
                      <p>
                        <a
                          href={createNaverLink("제주 "+selectedPlace.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          네이버에서 검색
                        </a>
                      </p>
                    </div>
                  </div>
                </InfoWindow>
              )}

            </GoogleMap>
          </div>
        </LoadScript>
      </div>
    </div>
  );
}

export default Plan;
