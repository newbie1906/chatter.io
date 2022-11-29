// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import colors from "vuetify/lib/util/colors";
import { createVuetify } from "vuetify";

export default createVuetify({
  theme: {
    defaultTheme: "main",
    themes: {
      main: {
        dark: false,
        colors: {
          primary: colors.lightBlue.base,
          secondary: colors.lime.base,
        },
      },
    },
  },
});
