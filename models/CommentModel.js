import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;
const commentSchema = new mongoose.Schema(
    {
        userId: { type: ObjectId, required: true},
        postId: { type: ObjectId, required: true},
        message: { type: String, trim: true, required: true }
    },
    { timestamps: true }
);

const CommentModel = mongoose.model('Comment', commentSchema);

const save = async model => new CommentModel(model).save();
const getComments = async filter => CommentModel.find(filter);
const updateComment = async (_id, update) => CommentModel.findOneAndUpdate({ _id }, update, { new : true });
const deleteComment = async _id => CommentModel.findOneAndDelete({ _id });

export { save, getComments, updateComment, deleteComment };
