import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
    {
        title: { type: String, trim: true, unique: true, required: true },
        description: { type: String, trim: true, required: true },
    }
);

const CategoryModel = mongoose.model('Category', categorySchema);

const save = async model => new CategoryModel(model).save();
const getCategoryById = async _id => CategoryModel.findById({ _id });
const getCategories = async _id => CategoryModel.find();

export { save, getCategoryById, getCategories };
