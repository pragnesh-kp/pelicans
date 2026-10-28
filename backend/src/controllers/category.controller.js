import * as service from "../services/category.service.js";

export const list = async (req, res) => res.json(await service.list());
export const getBySlug = async (req, res) => res.json(await service.getBySlug(req.params.slug));
export const create = async (req, res) => res.status(201).json(await service.create(req.body));
export const update = async (req, res) => res.json(await service.update(req.params.id, req.body));
export async function remove(req, res) {
  await service.remove(req.params.id);
  res.status(204).end();
}
