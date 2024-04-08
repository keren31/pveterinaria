const withMT = require("@material-tailwind/react/utils/withMT");

module.exports =withMT({
  content: [
    "./src/*/.{js,jsx,ts,tsx}",
     "./node_modules/@nextui-org/theme/dist/*/.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    
  ],
});