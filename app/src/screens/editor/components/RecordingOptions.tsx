import Flexbox from "@app/components/layout/Flexbox";
import {
  Animated,
  LayoutRectangle,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { theme } from "@app/theme";
import { useEffect, useRef, useState } from "react";

const routes = [
  { key: "60s", title: "60s" },
  { key: "30s", title: "30s" },
  { key: "15s", title: "15s" },
  { key: "photo", title: "Photo" },
];

export const CameraRecordingOptions = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(3);

  const [tabWidths, setTabWidths] = useState<number[]>([0, 0, 0, 0]);
  const [allWidthsPopulated, setAllWidthsPopulated] = useState(false);

  const translateX = useRef(new Animated.Value(0)).current;
  const centerIndicatorWidth = useRef(new Animated.Value(0)).current;
  const centerIndicatorBorderRadius = useRef(new Animated.Value(0)).current;

  const [centerIndicatorLayout, setCenterIndicatorLayout] =
    useState<LayoutRectangle | null>(null);

  const handleIndexChange = (newIndex: number, duration = 500) => {
    setIndex(newIndex);

    const tabWidth = tabWidths[newIndex];

    if (centerIndicatorLayout && tabWidth) {
      const totalWidth = tabWidths.reduce((acc, width) => acc + width, 0);

      const initialOffset =
        totalWidth < layout.width ? (layout.width - totalWidth) / 2 : 0;

      const totalWidthBefore = tabWidths
        .slice(0, newIndex)
        .reduce((acc, width) => acc + width, 0);

      const tabWidth = tabWidths[newIndex];

      const targetX =
        layout.width / 2 - totalWidthBefore - tabWidth / 2 - initialOffset;

      Animated.timing(translateX, {
        toValue: targetX,
        duration,
        useNativeDriver: true,
      }).start();

      Animated.timing(centerIndicatorWidth, {
        toValue: tabWidth / 100,
        duration,
        useNativeDriver: true,
      }).start();

      Animated.timing(centerIndicatorBorderRadius, {
        toValue: 17 / 2,
        duration,
        useNativeDriver: true,
      }).start();
    }
  };

  useEffect(() => {
    if (tabWidths.every((width) => width > 0) && !allWidthsPopulated) {
      handleIndexChange(3, 0);
      setAllWidthsPopulated(true);
    }
  }, [tabWidths, allWidthsPopulated]);

  return (
    <Flexbox
      flex={1}
      alignItems="center"
      justifyContent="center"
      position="relative"
      style={{ opacity: allWidthsPopulated ? 1 : 0 }}
    >
      <Flexbox width="100%" position="absolute" alignItems="center">
        <View onLayout={(e) => setCenterIndicatorLayout(e.nativeEvent.layout)}>
          <Animated.View
            style={[
              {
                height: 17,
                width: 100,
                backgroundColor: theme.color.white,
              },
              {
                transform: [{ scaleX: centerIndicatorWidth }],
              },
              ,
            ]}
          />
        </View>
      </Flexbox>
      <Animated.View
        style={[
          { flexDirection: "row" },
          {
            transform: [{ translateX }],
          },
        ]}
      >
        {routes.map((route, i) => {
          return (
            <Text
              key={route.key}
              onLayout={(e) => {
                const width = e.nativeEvent.layout.width;

                setTabWidths((prevTabWidths) => {
                  const nextTabWidths = [...prevTabWidths];
                  nextTabWidths[i] = width;
                  return nextTabWidths;
                });
              }}
              onPress={() => handleIndexChange(i)}
              style={[
                {
                  color: theme.color.white,
                  paddingHorizontal: theme.space.xSmall,
                  borderRadius: theme.borderRadius.pill,
                },
                index === i && {
                  color: "#000000",
                },
              ]}
            >
              {route.title ?? ""}
            </Text>
          );
        })}
      </Animated.View>
    </Flexbox>
  );
};
