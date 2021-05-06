"use strict";

const debug = require('debug')
const service = require('./service')
const { post, get } = require('../libs/request')
const LocalStrategy = require("passport-local").Strategy;

module.exports = function(passport) {
    // used to serialize the user for the session
    passport.serializeUser((user, done) => {
        const log = require("debug")("passport:serializeUser");
        log("serializeUser", user);
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(async (id, done) => {
        const log = require("debug")("passport:deserializeUser");
        log("deserializeUser", id);
        try {
            const url = service.api + "esima/pengguna/" + id
            log('url', url)
            let user = await get(url)
            log('response', user.data)
            log("user", user.data);
            done(null, user);
        } catch (error) {
            done(error, false);
        }
    });

    // LOCAL STRATEGY
    passport.use(
        new LocalStrategy(async (nip, password, done) => {
            const log = require("debug")("passport:LocalStrategy");
            log("LocalStrategy", { nip, password });
            try {
                const url = service.api + "esima/pengguna/login"
                const body = { nip, password }
                log(url, body)
                let user = await post(url, body)
                log('response', user)
                // if (!user) return done(null, false);
                // if (!check_password(user.local.password, password)) return done(null, false);
                log("user", user);
                return done(null, user)
            } catch (error) {
                done(error);
            }
        })
    );

    // PASSPORT JWT
    // passport.use(
    //     new JWTStrategy(
    //         {
    //             jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    //             secretOrKey: myConfig.session_secret
    //         },
    //         (jwtPayload, done) => {
    //             // console.log('jwtPayload', jwtPayload)
    //             // find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    //             if (jwtPayload) return done(null, jwtPayload);
    //             else return done(false, null);
    //         }
    //     )
    // );
};
