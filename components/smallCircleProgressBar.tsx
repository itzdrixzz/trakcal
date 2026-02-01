import React from "react";
import { Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

type CircleProgressProps = {
  progress: number; // 0..1

  size?: number;
  text: string;
  strokeWidth?: number;

  color?: string;
  trackColor?: string;

  showText?: boolean;
  textColor?: string;

  rotation?: number;

  containerClassName?: string;
  textClassName?: string;
};

const SmallCircleProgress = ({
  progress,
  size = 120,
  text = "",
  strokeWidth = 12,
  color = "#1e1a24",
  trackColor = "#e5e7eb",
  showText = true,
  textColor = "#000",
  rotation = -90,
  containerClassName = "",
  textClassName = "",
}: CircleProgressProps) => {
  const clamped = Math.max(0, Math.min(1, progress));

  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - clamped);

  return (
    <View
      className={`items-center justify-center ${containerClassName}`}
      style={{ width: size, height: size }}
    >
      <Svg width={size} height={size}>
        {/* Track */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Progress */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={dashOffset}
          originX={center}
          originY={center}
          rotation={rotation}
        />
      </Svg>

      {showText && (
        <Text
          className={`absolute font-semibold ${textClassName}`}
          style={{
            fontSize: size * 0.35,
            color: textColor,
          }}
        >
          {text}
        </Text>
      )}
    </View>
  );
};

export default SmallCircleProgress;
