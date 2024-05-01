import Admin from "../models/Admin.js";

export const createAdmin = async (req, res) => {
  const newAdmin = new Admin(req.body);
  try {
    const saveAdmin = await newAdmin.save();
    res.status(200).json({
      success: true,
      message: "Successfully Created",
      data: saveAdmin,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed To Create" });
  }
};

export const getAdmin = async (req, res) => {
  try {
    const users = await Admin.find();
    res.status(200).json({
      success: true,
      message: "Successfully retrieved users",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve users",
      error: error.message,
    });
  }
};

export const getAdminById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await Admin.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, message: "User found", data: user });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve user",
      error: error.message,
    });
  }
};

export const updateAdmin = async (req, res) => {
  const id = req.params.id;
  try {
    const updateUser = await Admin.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updateUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update",
      error: error.message,
    });
  }
};

export const deleteAdmin = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedUser = await Admin.findByIdAndDelete(id);
    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
      error: error.message,
    });
  }
};
