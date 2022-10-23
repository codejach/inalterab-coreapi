import Role from "../models/role";

export const getRoles = async (params = {}) => {
  try {
    const model = await Role.find(params)
      .populate({
        path: "access",
        model: "Access",
        populate: {
          path: "actions",
          model: "Action",
        },
      })
      .exec();

    if (!model) {
      return null;
    }

    return model;
  } catch (_) {
    return null;
  }
};
