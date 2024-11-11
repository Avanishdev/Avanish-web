const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    place: { type: String, required: true },
    area: { type: Number, required: true }, // Assuming area is measured in square units
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    hospitalsNearby: { type: [String], required: true },
    collegesNearby: { type: [String], required: true },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    likes: { type: Number, default: 0 }
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;