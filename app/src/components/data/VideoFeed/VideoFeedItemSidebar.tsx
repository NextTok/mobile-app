import Flexbox from "@app/components/layout/Flexbox";
import { theme } from "@app/theme";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";

const IconShadow = styled(Flexbox)``;

const Icon = ({
  counter,
  ...restProps
}: React.ComponentProps<typeof Ionicons> & { counter: string }) => {
  return (
    <Flexbox gap="xxSmall" alignItems="center">
      <IconShadow
        style={{
          shadowColor: "#000000",
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.3,
          shadowRadius: 2,
          elevation: 3,
        }}
      >
        <Ionicons color={theme.color.white} {...restProps} />
      </IconShadow>
      <Text
        style={{
          color: theme.color.white,
          fontSize: 12,
          textShadowColor: "rgba(0, 0, 0, 1)",
          textShadowRadius: 4,
          textShadowOffset: {
            width: 0,
            height: 0,
          },
          paddingHorizontal: 10,
        }}
      >
        {counter}
      </Text>
    </Flexbox>
  );
};

export const VideoFeedItemSidebar = () => {
  const height = useBottomTabBarHeight();
  return (
    <Flexbox
      height="100%"
      width="100%"
      style={{
        position: "absolute",
        paddingBottom: height + theme.space.medium,
      }}
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-end"
      gap="xLarge"
    >
      <Icon counter="75k" name="heart" size={35} color={theme.color.white} />
      <Icon
        name="chatbubble-ellipses"
        size={30}
        color={theme.color.white}
        counter="587"
      />
      <Icon
        counter="2035"
        name="bookmark"
        size={30}
        color={theme.color.white}
      />
      <Icon
        counter="4137"
        name="arrow-redo"
        size={30}
        color={theme.color.white}
      />
    </Flexbox>
  );
};
