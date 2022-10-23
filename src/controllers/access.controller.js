import Response from "../libs/response";
import { getAccess } from "../services/permissionService";

export const _get = async (req, res) => {
  const { access } = req.params;
  const params = access ? { name: access } : {};

  const result = await getAccess(params);

  Response.Success({ res, result });
};
