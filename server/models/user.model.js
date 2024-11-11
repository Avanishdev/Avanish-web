const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: false,
    },
    role: {
        type: String,
        enum: ['seller', 'buyer'],
        required: true
    }
});

//premethod
userSchema.pre("save", async function (next) {
    //is Modified don't do anything and simply move to next step
    if (!this.isModified()) {
        //next step which is saving data in database
        next();
    }
    try {
        // console.log(this.password);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
    } catch (error) {
        console.next(error);
    }
});

//jwt token-instance method
userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            //payload
            userId: this._id.toString(),
            email: this.email,
            role: this.role,
        },
            //signature
            process.env.JWT_SECRET_KEY
        )
    } catch (error) {
        console.error(error)
    }
}
//instance method to check password using bcrypt.compare()
userSchema.methods.checkPassword = async function (password) {
    try {
        return bcrypt.compare(password, this.password);
    } catch (error) {
        console.error(error);
    }
}
const User = new mongoose.model("User", userSchema);

module.exports = User;