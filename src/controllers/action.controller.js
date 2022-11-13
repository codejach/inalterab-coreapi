import Response from "../libs/response";
import { getAction } from "../services/permissionService";

export const _get = async (req, res) => {
  const { action } = req.params;
  const params = action ? { name: action } : {};

  const result = await getAction(params);

  Response.Success({ res, result });
};
