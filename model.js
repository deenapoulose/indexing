const mongoose = require("mongoose");
const locschema= mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    coordinates: {
      type: [Number],
    },
    type: {
      type: String,
      default: "Point",
    },
  },
  category: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("loc",locschema);
