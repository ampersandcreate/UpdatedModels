'use strict';

var JWTStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

var db = require('../models/database'),
    config = require('./../config');

// Hooks the JWT Strategy.
function hookJWTStrategy(passport) {
    var options = {};
    options.secretOrKey = config.keys.secret;
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    options.ignoreExpiration = false;
    passport.use(new JWTStrategy(options, function(JWTPayload, callback, raw = true) {
        db.user.findOne({
                attributes: ['id', 'email', 'role'],
                where: { email: JWTPayload.email },
                raw: true
            })
            .then(function(user) {
                if (!user) {
                    callback(null, false);
                    return;
                }

                callback(null, user);
            });
    }));
}


module.exports = hookJWTStrategy;