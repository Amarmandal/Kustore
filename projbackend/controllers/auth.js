const User = require('../models/user');
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

exports.signup = (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
    	const msgParam = errors.array()[0].param;
        return res.status(422).json({
            error: `${errors.array()[0].msg} ${msgParam[0].toUpperCase() + msgParam.slice(1)}`
        })
    }

    const user = new User(req.body);
    user.save((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                err: "Not able to save user in DB",
            });
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id,
        });
    });
};

exports.signin = (req, res) => {
    const errors = validationResult(req);
    const { email, password } = req.body;

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: `${errors.array()[0].param} ${errors.array()[0].msg}`
        })
    }

    //{email} is same as {email: email}
    User.findOne({email}, (err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: "User email doesn't exist"
            })
        }

        if(!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and password do not match"
            })
        }

        //CREATE TOKEN
        const token = jwt.sign({ _id: user._id }, process.env.SECRET);

        //put token into cookies
        res.cookie("token", token, {expire: new Date() + 9999});

        //SEND RESPONSE TO FRONT END
        const { _id, name, email, role } = user;

        //If key and value are same then we can just pass in key. Here {token} ==> {token: token}
        return res.json({ token, user : {_id, name, email, role}});

    })

}

exports.signout = (req, res) => {
    res.clearCookie("token");

    res.json({
        message: "User signout Successfully"
    });
}

//protected routes
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    //Replaced by requesProperty in newer version but backward compatible
    userProperty: "auth"
});

//custom middlewares
exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!checker) {
        return res.status(403).json({
            error: "ACCESS DENIED"
        });
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "You are not ADMIN, Access denied"
        });
    }
    next();
};
