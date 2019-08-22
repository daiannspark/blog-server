import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;
const postSchema = new mongoose.Schema(
    {
        title: { type: String, trim: true, required: true },
        message: { type: String, trim: true, required: true },
        image: { type: String, required: true},
        categoryId: { type: ObjectId, required: true},
        userId: { type: ObjectId, required: true}
    },
    { timestamps: true }
);

const PostModel = mongoose.model('Post', postSchema);

const save = async model => new PostModel(model).save();
const getPostById = async _id => PostModel.findById({ _id });
const getPosts = async _id => PostModel.find();
const updatePost = async (_id, update) => PostModel.findOneAndUpdate({ _id }, update, { new : true });
const deletePost = async _id => PostModel.findOneAndDelete({ _id });

export { save, getPostById, getPosts, updatePost, deletePost };
