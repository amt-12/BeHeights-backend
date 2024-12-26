
const me = async (req, res, next) => {
  try {
    res.status(200).json({
      message: "Server Working...",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = me;