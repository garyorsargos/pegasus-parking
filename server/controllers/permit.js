const Users = require("../models/user");
const Permits = require("../models/permit");

const setPermit = async (req, res) => {
  try {
    const { permit, licence, expiration } = req.body;
    console.log("Request Headers: ", req.headers);
    console.log("Request Body: ", req.body);
    console.log("Request User: ", req.user);
    const userId = req.user.userId;
    if (!permit || !licence || !expiration) {
      return res.status(400).json({ error: "All Permit fields are required." });
    }

    const user = await Users.findOne({ userId: userId });
    if (!user) {
      return res.status(401).json({ error: "User not found or unauthorized." });
    }
    const newPermit = new Permits({ permit, licence, expiration });

    //save this user to the database
    await newPermit.save();

    // Append the new Permit ID
    user.permits.push(newPermit._id);

    //save this user to the database
    await user.save();

    return res.status(200).json({
      message: "Permit Successful!",
      permit: newPermit,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred with the permits." });
  }
};

const getPermits = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await Users.findOne({ userId: userId }).populate("permits");
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    return res.status(200).json({
      permits: user.permits,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An errr occurred while fetching permits" });
  }
};

const getPermitStrings = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await Users.findOne({ userId: userId }).populate("permits");
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    const permitStrs = user.permits.map((permit) => permit.permit);
    return res.status(200).json({
      permits: permitStrs,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching permits" });
  }
};

const deletePermit = async (req, res) => {
  try {
    const { permitId } = req.body;
    const userId = req.user.userId;

    if (!permitId) {
      return res.status(400).json({ error: "the Permit Id most be provided." });
    }

    const user = await Users.findOne({ userId: userId });
    if (!user) {
      return res.status(401).json({ error: "Permit not found." });
    }

    //removes the permit reference from The User's Permit array field
    await Users.findOneAndUpdate(
      { userId: userId },
      { $pull: { permits: permitId } },
      { new: true }, // returns the modified document (optional)
    );

    //removes the value from the Permits Collection
    await Permits.findByIdAndDelete(permitId);

    return res.status(200).json({
      message: "Permit deleted!",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred with the permits." });
  }
};

const editPermit = async (req, res) => {
  try {
    const { permitId, permit, licence, expiration } = req.body;
    const userId = req.user.userId;

    if (!permitId || !permit || !licence || !expiration) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Check if the user exists
    const user = await Users.findOne({ userId: userId });
    if (!user || !user.permits.includes(permitId)) {
      return res.status(401).json({ error: "User not authorized to edit this permit." });
    }

    // Update the permit
    const updatedPermit = await Permits.findByIdAndUpdate(
      permitId,
      { permit, licence, expiration },
      { new: true } // Return the updated document
    );

    if (!updatedPermit) {
      return res.status(404).json({ error: "Permit not found." });
    }

    return res.status(200).json({
      message: "Permit updated successfully!",
      permit: updatedPermit,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred while updating the permit." });
  }
};

module.exports = {
  setPermit,
  deletePermit,
  getPermits,
  getPermitStrings,
  editPermit,
};
