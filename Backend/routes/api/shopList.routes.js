import express from 'express';
import { getItems, getItemsByUserId, createItem, updateItem, deleteItem  } from '../../controllers/shopList.controller.js';

const shopListRouter = express.Router();

shopListRouter.get('/', getItems);
shopListRouter.get('/:userId', getItemsByUserId);
shopListRouter.post('/', createItem);
shopListRouter.put('/:id', updateItem);
shopListRouter.delete('/:id', deleteItem);

export default shopListRouter;