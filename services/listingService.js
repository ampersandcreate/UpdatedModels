const db = require('../models/database');

const ListingService = function() {}; // eslint-disable-line

ListingService.prototype.getAllListingsForBuilding = async(buildingId) => {
    try {
        const result = await db.listing.findAll({
            where: {
                buildingId
            }
        });
        return result;
    } catch (error) {
        throw (error);
    }
};

ListingService.prototype.createListingForBuilding = async(params) => {
    try {
        const {
            number,
            description,
            rent,
            squareFeet,
            numberOfBedrooms,
            numberOfBathrooms,
            requiresGuarantor,
            requiresThirdMonthsRent,
            hasRoommates,
            haveKeys,
            buildingId
        } = params;
        const newListing = {
            number,
            description,
            rent,
            squareFeet,
            numberOfBedrooms,
            numberOfBathrooms,
            requiresGuarantor,
            requiresThirdMonthsRent,
            hasRoommates,
            haveKeys,
            buildingId
        };
        const listing = await db.listing.create(newListing);
        const result = await db.listing.findOne({
            id: listing.id
        });
        return result;
    } catch (error) {
        throw (error);
    }
};

ListingService.prototype.getListing = async(id) => {
    try {
        const result = await db.listing.findOne({
            where: {
                id
            }
        });
        return result;
    } catch (error) {
        throw (error);
    }
};
module.exports = new ListingService();