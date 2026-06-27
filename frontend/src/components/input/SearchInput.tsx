import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useRef, useState } from "react";
import type { PlaceAutocompleteProps } from "../../types/index";

export const SearchInput = ({
  onPlaceSelect,
  placeholder,
  type,
  value,
  callFunc,
  className, 
  onBlur,
}: PlaceAutocompleteProps & { className?: string  }) => {

  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary("places");


  useEffect(() => {
    if (!places || !inputRef.current) return;
      console.log('Places library loaded') // add this to confirm


    const options: google.maps.places.AutocompleteOptions = {
      fields: ["geometry", "name", "formatted_address", "place_id"],
    };

    const ac = new places.Autocomplete(inputRef.current, options);
    setAutocomplete(ac);
  }, [places]);

  useEffect(() => {
    if (!autocomplete) return;

    const listener = autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      onPlaceSelect(place);
    });

    return () => {
      listener.remove();
    };
  }, [autocomplete, onPlaceSelect]);

  return (
    <input
      ref={inputRef}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => callFunc(e.target.value)}
      className={className} 
      onBlur={onBlur}
    />
  );
};