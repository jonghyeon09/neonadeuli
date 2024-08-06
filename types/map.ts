type Lat = number;
type Lng = number;
export type Coordinates = [Lat, Lng];

export type NaverMap = naver.maps.Map;

export type Marker = {
  map: NaverMap | null;
  coordinates: Coordinates | null;
  icon?: ImageIcon;
  onClick?: () => void;
};

export type ImageIcon = {
  url: string;
  size?: naver.maps.Size;
  origin?: naver.maps.Point;
  scaledSize?: naver.maps.Size;
};
