// hooks/useAddressInput.ts
import { useState, useCallback } from "react";

export const useAddressInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null)
  const [coords, setCoords]               = useState<{ lat: number; lng: number } | null>(null)

  const handlePlaceSelect = useCallback(
    (place: google.maps.places.PlaceResult) => {
      setSelectedPlace(place);
      setInputValue(place.formatted_address ?? "");

    const lat = place.geometry?.location?.lat()
    const lng = place.geometry?.location?.lng()
    
    if(!lat || !lng) return 
    setCoords({ lat: lat, lng: lng})
    },
    []
  );

  const handleInputChange = useCallback((value: string) => {
    setInputValue(value);
    setSelectedPlace(null);
  }, []);

  const reset = useCallback(() => {
    setInputValue("");
    setSelectedPlace(null);
  }, []);

  return {
    coords,
    inputValue,
    selectedPlace,
    handlePlaceSelect,   
    handleInputChange,  
    reset,
  };
};