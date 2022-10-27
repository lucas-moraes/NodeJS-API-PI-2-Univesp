import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";

export const MapPin = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 256 256" {...props}>
    <Path fill="none" d="M0 0h256v256H0z" />
    <Path
      d="M208 104c0 72-80 128-80 128s-80-56-80-128a80 80 0 0 1 160 0Z"
      fill={props.fill}
      stroke={props.stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={24}
    />
    <Circle
      cx={128}
      cy={104}
      r={32}
      fill={props.stroke}
      stroke={props.stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={24}
    />
  </Svg>
);
