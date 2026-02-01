import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import Svg, { Circle } from "react-native-svg";

type CircleProgressProps = {
  progress: number; // 0..1

  size?: number;
  strokeWidth?: number;

  color?: string;
  trackColor?: string;

  showText?: boolean;
  textColor?: string;

  rotation?: number;

  containerClassName?: string;
  textClassName?: string;
};

const CircleProgress = ({
  progress,
  size = 120,
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

      {showText && <Ionicons name="flame" className="absolute" size={32} />}
    </View>
  );
};

export default CircleProgress;
