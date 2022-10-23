import Response from "../libs/response";
import { getRoles } from "../services/permissionService";

export const _get = async (req, res) => {
  const { role } = req.params;
  const params = role ? { name: role } : {};

  const result = await getRoles(params);

  Response.Success({ res, result });
};
