import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
    {
        username: { type: String, trim: true, unique: true, required: true },
        firstName: { type: String, trim: true, required: true },
        lastName: { type: String, trim: true, required: true },
        email: { type: String, trim: true, unique: true, required: true },
        rehashedPassword: { type: String, required: true },
    },
    { timestamps: true }
);

userSchema.pre('save', async function callback(next) {
    if (this.rehashedPassword) {
        this.rehashedPassword = await bcrypt.hash(
            this.rehashedPassword,
            parseInt(process.env.PASSWORD_HASHING_ROUNDS, 10),
        );
    }
    next();
});

const UserModel = mongoose.model('User', userSchema);

const save = async model => new UserModel(model).save();
const getUserByEmail = async email => UserModel.findOne({ email });
const getUserById = async _id => UserModel.findById({ _id });
const getUsers = async _id => UserModel.find();
const updateUser = async (_id, update) => UserModel.findOneAndUpdate({ _id }, update, { new : true });
const deleteUser = async _id => UserModel.findOneAndDelete({ _id });

const comparePassword = async (userPassword, rehashedPassword) => {
    return bcrypt.compare(userPassword, rehashedPassword);
};

export { save, getUserByEmail, getUserById, getUsers, updateUser, deleteUser, comparePassword  };
