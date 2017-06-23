import logger from "winston";
import Q from "q";
import { Channel } from "../model/channels";

export function inGroup(group, user) {
    return user.groups.indexOf(group) >= 0;
}

// #
// A promise returning function that returns the list
// of viewable channels for a user.
// #
export function getUserViewableChannels(user) {
    // if admin allow all channel
    if (inGroup("admin", user)) {
        return Channel.find({}).exec();
    } else {
        // otherwise figure out what this user can view
        return Channel.find({ txViewAcl: { $in: user.groups } }).exec();
    }
}

// #
// A promise returning function that returns the list
// of rerunnable channels for a user.
// #
export function getUserRerunableChannels(user) {
    // if admin allow all channel
    if (inGroup("admin", user)) {
        return Channel.find({}).exec();
    } else {
        // otherwise figure out what this user can rerun
        return Channel.find({ txRerunAcl: { $in: user.groups } }).exec();
    }
}
