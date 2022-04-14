import * as React from "react";
import Svg, { Path } from "react-native-svg";

function Logo(props) {
  return (
    <Svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path d="M91.5 152L153.421 51.5H29.5792L91.5 152Z" fill="#F58800" />
      <Path
        d="M57.6495 117.362L154.319 49.6168L40.6109 0.553936L57.6495 117.362Z"
        fill="#F4A138"
      />
    </Svg>
  );
}

export default Logo;
