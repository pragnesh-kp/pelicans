import * as service from "../services/user.service.js";

export const list = async (req, res) => res.json(await service.list(req.query));
export const get = async (req, res) => res.json(await service.get(req.params.id));
export const create = async (req, res) => res.status(201).json(await service.create(req.body));
export const update = async (req, res) => res.json(await service.update(req.params.id, req.body, req.user));
export async function remove(req, res) {
  await service.remove(req.params.id, req.user, req.query.reassign);
  res.status(204).end();
}
