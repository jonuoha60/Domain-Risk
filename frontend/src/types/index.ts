export interface PlaceAutocompleteProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult) => void
  placeholder: string;
  type: string;
  value: string;
  callFunc: (value: string) => void;
  onBlur?: () => void
}

export interface RiskCategory {
  category: string
  score:    number        // 0-100
  level:    'low' | 'medium' | 'high'
  summary:  string
}

export interface ScanResult {
  imageUrl:   string
  direction:  string
  heading:    number
  risks:      RiskCategory[]
  overallScore: number
  vision:     any
}

export interface riskFactor {
  description: string;
  score: number
}

export type SafeSearchLikelihood = 'VERY_UNLIKELY' | 'UNLIKELY' | 'POSSIBLE' | 'LIKELY' | 'VERY_LIKELY'

export interface SafeSearch {
  adult:    SafeSearchLikelihood
  medical:  SafeSearchLikelihood
  racy:     SafeSearchLikelihood
  spoof:    SafeSearchLikelihood
  violence: SafeSearchLikelihood
}

export interface WeatherData {
  condition:    string | null;
  icon:         string | null;
  temperature:  { degrees: number; unit: string } | null;
  feelsLike:    { degrees: number; unit: string } | null;
  humidity:     number | null;
  uvIndex:      number | null;
  wind:         { direction: { degrees: number; cardinal: string }; speed: { value: number; unit: string } } | null;
  precipitation: { probability: { percent: number; type: string } } | null;
  isDaytime:    boolean | null;
  timeZone:     string | null;
}

export interface UseWeatherResult {
  weather:  WeatherData | null;
  loading:  boolean;
  error:    string | null;
  refetch:  () => void;
}