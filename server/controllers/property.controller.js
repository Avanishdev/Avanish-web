const Property = require("../models/property.model.js");
const User = require("../models/user.model.js");
const transporter = require("../utils/nodemailer.js");
//for buyer's
const getPropertiesForBuyer = async (req, res) => {
    const {
        title,
        description,
        priceMin,
        priceMax,
        location,
        areaMin,
        areaMax,
        bedrooms,
        bathrooms,
        nearbyHospitals,
        nearbyColleges,
        page,
        limit
    } = req.query;

    const filters = {};

    if (title) filters.title = new RegExp(title, 'i');
    if (description) filters.description = new RegExp(description, 'i');
    if (priceMin) filters.price = { ...filters.price, $gte: priceMin };
    if (priceMax) filters.price = { ...filters.price, $lte: priceMax };
    if (location) filters.location = new RegExp(location, 'i');
    if (areaMin) filters.area = { ...filters.area, $gte: areaMin };
    if (areaMax) filters.area = { ...filters.area, $lte: areaMax };
    if (bedrooms) filters.bedrooms = bedrooms;
    if (bathrooms) filters.bathrooms = bathrooms;
    if (nearbyHospitals) filters.nearbyHospitals = new RegExp(nearbyHospitals, 'i');
    if (nearbyColleges) filters.nearbyColleges = new RegExp(nearbyColleges, 'i');

    try {
        const properties = await Property.find(filters)
            .skip((page - 1) * limit)
            .limit(Number(limit));
        return res.status(200).json({
            properties,
            total,
            page: Number(page),
            pages: Math.ceil(total / limit),
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const addProperty = async (req, res) => {
    const { title, description, price, location, place, area, bedrooms, bathrooms, hospitalsNearby, collegesNearby } = req.body;
    const sellerId = req.user._id;

    const property = new Property({
        title,
        description,
        price,
        location,
        place,
        area,
        bedrooms,
        bathrooms,
        hospitalsNearby,
        collegesNearby,
        sellerId
    });

    try {
        await property.save();
        return res.status(201).json({ property });
    } catch (err) {
        console.log(`Error from the property route ${err}`);
        res.status(400).json({ msg: err.message });
    }
};

const getAllProperties = async (req, res) => {
    const sellerId = req.user._id;

    try {
        const properties = await Property.find({ sellerId });
        return res.status(200).json({ properties });
    } catch (err) {
        console.log(`Error from property route ${err}`);
        res.status(500).json({ msg: err.message });
    }
};

const getProperty = async (req, res) => {
    const { id } = req.params;

    try {
        const property = await Property.findById(id);
        if (!property) return res.status(404).json({ msg: 'Property not found' });
        return res.status(200).json({ property });
    } catch (err) {
        console.log(`Error from property route ${err}`);
        res.status(500).send({ msg: err.message });
    }
};

const updateProperty = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const property = await Property.findOneAndUpdate(
            { _id: id, sellerId: req.user._id },
            updates,
            { new: true, runValidators: true }
        );
        if (!property) return res.status(404).json({ msg: 'Property not found' });
        return res.status(201).json({ property });
    } catch (err) {
        console.log(`Error from property route ${err}`);
        res.status(400).send(err.message);
    }
};

const deleteProperty = async (req, res) => {
    const { id } = req.params;

    try {
        const property = await Property.findOneAndDelete({ _id: id, sellerId: req.user._id });
        if (!property) return res.status(404).json({ msg: 'Property not found' });
        return res.status(203).json({ property });
    } catch (err) {
        console.log(`Error from property route ${err}`);
        res.status(500).json({ msg: err.message });
    }
};

const getPropertyWithSeller = async (req, res) => {
    const { id } = req.params;

    try {
        const property = await Property.findById(id).populate('sellerId', 'firstName lastName email phone');
        if (!property) return res.status(404).json({ msg: 'Property not found' });
        return res.status(200).json({ property });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

const addLikeProperty = async (req, res) => {
    const { id } = req.params;

    try {
        const property = await Property.findById(id);
        if (!property) return res.status(404).json({ msg: 'Property not found' });

        property.likes += 1;
        await property.save();

        return res.status(200).json({ property });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

const interestedInProperty = async (req, res) => {
    const { id } = req.params;
    const buyerId = req.user.userId;

    try {
        const property = await Property.findById(id).populate('sellerId');
        if (!property) return res.status(404).json({ msg: 'Property not found' });

        const seller = property.sellerId;
        const buyer = await User.findById(buyerId);

        if (!buyer) return res.status(404).json({ msg: 'Buyer not found' });

        const buyerMailOptions = {
            from: process.env.MAIL_USER,
            to: buyer.email,
            subject: 'Property Interest - Seller Details',
            text: `You are interested in the property: ${property.title}.
        Seller Details:
        Name: ${seller.name}
        Email: ${seller.email}
        Phone: ${seller.phone}`
        };

        const sellerMailOptions = {
            from: process.env.MAIL_USER,
            to: seller.email,
            subject: 'New Interest in Your Property',
            text: `A buyer is interested in your property: ${property.title}.
        Buyer Details:
        Name: ${buyer.name}
        Email: ${buyer.email}
        Phone: ${buyer.phone}`
        };

        await transporter.sendMail(buyerMailOptions);
        await transporter.sendMail(sellerMailOptions);

        res.status(200).json({ message: 'Interest noted, emails sent to buyer and seller.' });
    } catch (err) {
        console.log(`Error in property route ${err}`);
        res.status(500).json({ msg: err.message });
    }
}

module.exports = {
    addProperty,
    getAllProperties,
    getProperty,
    updateProperty,
    deleteProperty,
    //buyer
    getPropertiesForBuyer,
    getPropertyWithSeller,
    //like
    addLikeProperty,
    //interested
    interestedInProperty,
}