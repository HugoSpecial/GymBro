import userModel from "../models/userModel.js";

class UserController {
  getUser = async (req, res) => {
    try {
      res.json({
        success: true,
        user: {
          id: req.user._id,
          name: req.user.name,
          email: req.user.email,
          createAccountAt: req.user.createAccountAt,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  };

  updateUser = async (req, res) => {
    try {
      const { name, email } = req.body;

      const user = await userModel
        .findByIdAndUpdate(
          req.user._id,
          { name, email },
          { new: true, runValidators: true }
        )
        .select("-password");

      res.json({ success: true, message: "Profile updated", user });
    } catch (error) {
      res
        .status(500)
        .json({
          success: false,
          message: "Server error",
          error: error.message,
        });
    }
  };

  deleteUserAccount = async (req, res) => {
    try {
      await userModel.findByIdAndDelete(req.user._id);
      res.clearCookie("token"); // removemos o token do cookie
      res.json({ success: true, message: "Account deleted" });
    } catch (error) {
      res
        .status(500)
        .json({
          success: false,
          message: "Server error",
          error: error.message,
        });
    }
  };
}

export default new UserController();
