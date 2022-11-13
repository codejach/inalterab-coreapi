import Access from "../models/access";
import Action from "../models/action";
import Role from "../models/role";

export const getAccess = async (params = {}) => {
  try {
    const model = await Access.find(params).exec();

    if (!model) {
      return null;
    }

    return model;
  } catch (_) {
    return null;
  }
}

export const getAction = async (params = {}) => {
  try {
    const model = await Action.find(params).exec();

    if (!model) {
      return null;
    }

    return model;
  } catch (_) {
    return null;
  }
}

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
