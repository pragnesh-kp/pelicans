import * as service from "../services/post.service.js";

// Public website
export const listPublished = async (req, res) => res.json(await service.listPublished(req.query));
export const getBySlug = async (req, res) => res.json(await service.getPublishedBySlug(req.params.slug));

// Admin panel
export const listAdmin = async (req, res) => res.json(await service.listAdmin(req.query));
export const getForEdit = async (req, res) => res.json(await service.getForEdit(req.params.id, req.user));
export const create = async (req, res) => res.status(201).json(await service.create(req.body, req.user));
export const update = async (req, res) => res.json(await service.update(req.params.id, req.body, req.user));
export async function remove(req, res) {
  await service.remove(req.params.id, req.user);
  res.status(204).end();
}
