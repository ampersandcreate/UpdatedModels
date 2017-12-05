const responseHelper = require('../helpers/responseHelper');
const ListingService = require('../services/listingService');

const ListingsController = {};

ListingsController.index = async(req, res, next) => {
    try {
        const { buildingId } = req.params;
        const result = await ListingService.getAllListingsForBuilding(buildingId);
        responseHelper.setSuccessResponse(result, res);
    } catch (error) {
        next(error);
    }
};

ListingsController.create = async(req, res, next) => {
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
            haveKeys
        } = req.body;
        const { buildingId } = req.params;
        const result = await ListingService.createListingForBuilding({
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
        });
        responseHelper.setSuccessResponse(result, res);
    } catch (error) {
        next(error);
    }
};


ListingsController.show = async(req, res, next) => {
    try {
        const { id } = req.params;
        const result = await ListingService.getListing(id);
        responseHelper.setSuccessResponse(result, res);
    } catch (error) {
        next(error);
    }
};

module.exports = ListingsController;