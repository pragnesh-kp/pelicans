import { Setting } from "../models/setting.model.js";

export const getAll = async (req, res) => res.json(await Setting.getAll());
export const update = async (req, res) => res.json(await Setting.upsertMany(req.body));
