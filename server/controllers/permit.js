const Users = require("../models/user");
const Permits = require("../models/permit");
const createApiResponse = require('../utils/apiResponse');
const MessageTypes = require('../utils/messageTypes');

const setPermit = async (req, res) => {
  try {
    const { permit, licence, expiration } = req.body;
    const userId = req.user.userId;

    if (!permit || !licence || !expiration) {
      return res.status(400).json(createApiResponse(false, MessageTypes.ERROR, "All Permit fields are required."));
    }

    const user = await Users.findOne({ userId: userId });
    if (!user) {
      return res.status(401).json(createApiResponse(false, MessageTypes.ERROR, "User not found or unauthorized."));
    }
    const newPermit = new Permits({ permit, licence, expiration });

    //save this user to the database
    await newPermit.save();

    // Append the new Permit ID
    user.permits.push(newPermit._id);

    //save this user to the database
    await user.save();

    return res.status(200).json(createApiResponse(true, MessageTypes.SUCCESS, "Permit Successful!", newPermit));
  } catch (error) {
    console.error(error);
    return res.status(500).json(createApiResponse(false, MessageTypes.ERROR, "An error occurred with the permits."));
  }
};

const getPermits = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await Users.findOne({ userId: userId }).populate("permits");
    if (!user) {
      return res.status(401).json(createApiResponse(false, MessageTypes.ERROR, "User not found"));
    }
    return res.status(200).json(createApiResponse(true, null, null, user.permits));
  } catch (error) {
    console.error(error);
    return res.status(500).json(createApiResponse(false, MessageTypes.ERROR, "An error occurred while fetching permits"));
  }
};

const getPermitStrings = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await Users.findOne({ userId: userId }).populate("permits");
    if (!user) {
      return res.status(401).json(createApiResponse(false, MessageTypes.ERROR, "User not found"));
    }
    const permitStrs = user.permits.map((permit) => permit.permit);
    return res.status(200).json(createApiResponse(true, null, null, permitStrs));
  } catch (error) {
    console.error(error);
    return res.status(500).json(createApiResponse(false, MessageTypes.ERROR, "An error occurred while fetching permits"));
  }
};

const deletePermit = async (req, res) => {
  try {
    const { permitId } = req.body;
    const userId = req.user.userId;

    if (!permitId) {
      return res.status(400).json(createApiResponse(false, MessageTypes.ERROR, "The Permit Id must be provided."));
    }

    const user = await Users.findOne({ userId: userId });
    if (!user) {
      return res.status(401).json(createApiResponse(false, MessageTypes.ERROR, "Permit not found."));
    }

    //removes the permit reference from The User's Permit array field
    await Users.findOneAndUpdate(
      { userId: userId },
      { $pull: { permits: permitId } },
      { new: true }, // returns the modified document (optional)
    );

    //removes the value from the Permits Collection
    await Permits.findByIdAndDelete(permitId);

    return res.status(200).json(createApiResponse(true, MessageTypes.SUCCESS, "Permit deleted!"));
  } catch (error) {
    console.error(error);
    return res.status(500).json(createApiResponse(false, MessageTypes.ERROR, "An error occurred with the permits."));
  }
};

const editPermit = async (req, res) => {
  try {
    const { permitId, permit, licence, expiration } = req.body;
    const userId = req.user.userId;

    if (!permitId || !permit || !licence || !expiration) {
      return res.status(400).json(createApiResponse(false, MessageTypes.ERROR, "All fields are required."));
    }

    // Check if the user exists
    const user = await Users.findOne({ userId: userId });
    if (!user || !user.permits.includes(permitId)) {
      return res.status(401).json(createApiResponse(false, MessageTypes.ERROR, "User not authorized to edit this permit."));
    }

    // Update the permit
    const updatedPermit = await Permits.findByIdAndUpdate(
      permitId,
      { permit, licence, expiration },
      { new: true } // Return the updated document
    );

    if (!updatedPermit) {
      return res.status(404).json(createApiResponse(false, MessageTypes.ERROR, "Permit not found."));
    }

    return res.status(200).json(createApiResponse(true, MessageTypes.SUCCESS, "Permit updated successfully!", updatedPermit));
  } catch (error) {
    console.error(error);
    return res.status(500).json(createApiResponse(false, MessageTypes.ERROR, "An error occurred while updating the permit."));
  }
};

module.exports = {
  setPermit,
  deletePermit,
  getPermits,
  getPermitStrings,
  editPermit,
};