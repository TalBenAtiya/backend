const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId

async function query() {
    try {
        const collection = await dbService.getCollection('games')
        var games = await collection.find({}).toArray()
        return games
    } catch (err) {
        logger.error('cannot find games', err)
        throw err
    }
}

async function getById(gameId) {
    try {
        const collection = await dbService.getCollection('games')
        const game = await collection.findOne({ _id: gameId })
        return game
    } catch (err) {
        logger.error(`while finding game ${gameId}`, err)
        throw err
    }
}

async function remove(gameId) {
    try {
        const collection = await dbService.getCollection('game')
        await collection.deleteOne({ _id: ObjectId(gameId) })
        return gameId
    } catch (err) {
        logger.error(`cannot remove game ${gameId}`, err)
        throw err
    }
}

async function add(game) {
    try {
        const collection = await dbService.getCollection('game')
        game.style = 'clr' + utilService.getRandomIntInclusive(1, 17)
        game.cmpsOrder = ["member", "status", "priority", "timeline", "attachments"]
        game.groups = [{ id: utilService.makeId(), title: 'Group 1', tasks: [] }]
        await collection.insertOne(game)
        return game
    } catch (err) {
        logger.error('cannot insert game', err)
        throw err
    }
}

async function update(game) {
    try {
        const gameId = ObjectId(game._id)
        delete game._id
        const collection = await dbService.getCollection('game')
        await collection.updateOne({ _id: gameId }, { $set: { ...game } })
        return { _id: gameId, ...game }
    } catch (err) {
        logger.error(`cannot update game ${game._id}`, err)
        throw err
    }
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
}