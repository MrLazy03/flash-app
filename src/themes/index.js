import { DefaultTheme } from "@react-navigation/native";

const theme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: "#051526",
    background: "#fff",
    card: "#051526",
    primaryText: "white",
    secondaryText: "black",
    border: "rgb(199, 199, 204)",
    notification: "#39AFEA",
    statusbar: "#051526",
    inputBackground: "gray",
    buttonBackground: "#034285",
    ChatListItemCard: "white",
  },
  fontSize: {
    large: 22,
    mediume: 20,
    small: 15,
  },

  fontFamily: {
    primary: "Open Sans",
  },
};

export default theme;
