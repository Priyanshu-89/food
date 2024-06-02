
import Category from './Category';

const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Category,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  discountPrice: {
    type: Number
  },
  status: {
    type: Boolean,
    default:true,
  },
  coverImage: {
    type: String,
    required: true
  },
  ingredients: {
    type: String,
  }
}, { timestamps: true });

export default mongoose.models.Food || mongoose.model("Food", foodSchema)
