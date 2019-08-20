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
const getCategories = async () => CategoryModel.find();
const updateCategory = async (_id, update) => CategoryModel.findOneAndUpdate({ _id }, update, { new : true });
const deleteCategory = async _id => CategoryModel.findOneAndDelete({ _id });

export { save, getCategoryById, getCategories, updateCategory, deleteCategory };
