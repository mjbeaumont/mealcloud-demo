module.exports = {
  purge: ["./src/views/*.vue", "./src/components/**/*.vue", "./src/App.vue"],
  theme: {
    extend: {
      colors: {
        primary: "#1e988b",
        secondary: "#064c44"
      },
      fontFamily: {
        avenir: ["Avenir Next", "serif"]
      }
    }
  },
  variants: {},
  plugins: []
};
