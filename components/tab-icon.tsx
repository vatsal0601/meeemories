import * as React from "react";
import type { SvgProps } from "react-native-svg";

interface Icon extends SvgProps {
  solid?: boolean;
}

interface TabProps {
  focused: boolean;
  icon: React.FC<Icon>;
  size: number;
}

const Tab = ({ focused, icon: Icon, size }: TabProps) => {
  if (focused)
    return (
      <Icon
        width={size}
        height={size}
        fill={focused ? "#fbbf24" : "#9ca3af"}
        solid
      />
    );

  return (
    <Icon width={size} height={size} stroke={focused ? "#fbbf24" : "#9ca3af"} />
  );
};

export default Tab;
