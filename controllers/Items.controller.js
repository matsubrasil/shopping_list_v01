const Item = require('./../models/Items');

const index = async (req, res) => {
  try {
    const results = await Item.find();
    return res.status(200).json({ success: true, data: results });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const store = async (req, res) => {
  try {
    const { name } = req.body;

    const newItem = await Item.create({ name });

    return res.status(200).json({ success: true, data: newItem });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const del = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ success: false, error: 'Item not found' });
    }
    // console.log('item', item);
    const response = await item.remove();
    // console.log('response', response);
    return res.status(200).json({ success: true, data: 'Item removed' });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const ItemsController = {
  index,
  store,
  del,
};
module.exports = ItemsController;
