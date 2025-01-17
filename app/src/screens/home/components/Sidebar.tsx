import Flexbox from "@app/components/layout/Flexbox";
import { theme } from "@app/theme";
import { Ionicons } from "@expo/vector-icons";

export const Sidebar = () => {
  return (
    <Flexbox
      height="100%"
      width="100%"
      style={{ position: "absolute" }}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap="xLarge"
    >
      <Ionicons name="heart" size={35} color={theme.color.white} />
      <Ionicons name="chatbubble-ellipses" size={30} color={theme.color.white} />
      <Ionicons name="bookmark" size={30} color={theme.color.white} />
    </Flexbox>
  );
};
