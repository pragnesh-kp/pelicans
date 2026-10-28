import * as service from "../services/page.service.js";

export const getAll = async (req, res) => res.json(await service.getAll());
export const getById = async (req, res) => res.json(await service.getById(req.params.id));
export const getBySlug = async (req, res) => res.json(await service.getBySlug(req.params.slug));
export const create = async (req, res) => res.status(201).json(await service.create({ ...req.body, author_id: req.user.id }));
export const update = async (req, res) => res.json(await service.update(req.params.id, req.body));
export const remove = async (req, res) => {
  await service.remove(req.params.id);
  res.status(204).end();
};
