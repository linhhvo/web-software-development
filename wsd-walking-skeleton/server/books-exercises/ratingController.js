import { zValidator } from "zValidator";
import { ratingValidator } from "../validators.js";
import * as ratingRepo from "./ratingRepository.js";

const getRatings = async (c) => {
  const bookId = c.req.param('bookId');
  const ratings = await ratingRepo.getAll(bookId);
  return c.json(ratings);
};

const addRating = [zValidator('json', ratingValidator),
  async (c) => {
    const bookId = c.req.param('bookId');
    const rating = await c.req.valid('json');
    const newRating = await ratingRepo.add(bookId, rating);
    return c.json(newRating);
  }
];

const getOneRating = async (c) => {
  const bookId = c.req.param('bookId');
  const ratingId = c.req.param('ratingId');
  const rating = await ratingRepo.getOne(bookId, ratingId);
  return c.json(rating);
};

const updateRating = [zValidator('json', ratingValidator),
  async (c) => {
    const bookId = c.req.param('bookId');
    const ratingId = c.req.param('ratingId');
    const newData = await c.req.valid('json');
    const updatedRating = await ratingRepo.update(bookId, ratingId, newData);
    return c.json(updatedRating);
  }
];

const deleteRating = async (c) => {
  const bookId = c.req.param('bookId');
  const ratingId = c.req.param('ratingId');
  const deletedRating = await ratingRepo.remove(bookId, ratingId);
  return c.json(deletedRating);
};

export { getRatings, addRating, getOneRating, updateRating, deleteRating };