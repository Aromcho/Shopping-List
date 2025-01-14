import ShopList from "../models/shopList.model.js";

// Retrieve all ShopList from the database.
export const getItems = async (req, res, next) => {
    try {
        const shopListItems = await ShopList.find();
        return res.status(200).json(shopListItems);
    } catch (error) {
        next(error);
    }
}

// Find by user id
export const getItemsByUserId = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const shopListItems = await ShopList.find({ userId });
        return res.status(200).json(shopListItems);
    } catch (error) {
        next(error);
    }
}

// Create and Save a new ShopList
export const createItem = async (req, res, next) => {
    try {
        const {userId, name, amount, typeAmount } = req.body;
        const shopListItem = new ShopList({
            userId,
            name,
            amount,
            typeAmount
        }
        );
        await shopListItem.save();
        return res.status(201).json(shopListItem);
    } catch (error) {
        next(error);
    }
}

export const updateItem = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userId, name, amount, typeAmount } = req.body;
        const shopListItem = await ShopList.findByIdAndUpdate(id, { userId, name, amount, typeAmount }, { new: true });
        return res.status(200).json(shopListItem);
    } catch (error) {
        next(error);
    }
}

export const deleteItem = async (req, res, next) => {
    try {
        const { id } = req.params;
        await ShopList.findByIdAndDelete(id);
        return res.status(204).json({ message: "Item successfully deleted" });
    } catch (error) {
        next(error);
    }
}
