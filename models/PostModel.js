import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;
const postSchema = new mongoose.Schema(
    {
        title: { type: String, trim: true, unique: true, required: true },
        message: { type: String, trim: true, required: true },
        image: { type: String, required: true},
        categoryId: { type: ObjectId, required: true},
        createdAt: { type: Date, required: true},
        updatedAt: { type: Date, required: true},

    }
);

const PostModel = mongoose.model('Post', postSchema);

const save = async model => new PostModel(model).save();
const getPostById = async _id => PostModel.findById({ _id });
const getPosts = async _id => PostModel.find();

export { save, getPostById, getPosts };
