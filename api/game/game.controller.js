const gameService = require('./game.service')
const logger = require('../../services/logger.service')

//?- GET LIST
async function getGames(req, res) {
    try {
        logger.debug('Getting Games')
        const games = await gameService.query()
        res.json(games)
    } catch (error) {
        logger.error('Failed to get Games', error)
        res.status(500).send({ err: 'Failed to get Games' })
    }
}

//?- GET BY ID
async function getGame(req, res) {
    try {
        logger.debug('Getting Game')
        const { gameId } = req.params
        const game = await gameService.getById(gameId)
        res.json(game)
    } catch (error) {
        logger.error('Failed to get Game', error)
        res.status(500).send({ err: 'Failed to get Game' })
    }
}

//?- CREATE
async function addGame(req, res) {
    try {
        logger.debug('Adding game')
        const game = req.body
        const addedGame = await gameService.add(game)
        res.json(addedGame)
    } catch (error) {
        logger.error('Failed to add Game', error)
        res.status(500).send({ err: 'Failed to add Game' })
    }
}

//?- UPDATE
async function updateGame(req, res) {
    try {
        logger.debug('Updating game')
        const game = req.body
        const updatedGame = await gameService.update(game)
        res.json(updatedGame)
    } catch (error) {
        logger.error('Failed to update Game', error)
        res.status(500).send({ err: 'Failed to update Game' })
    }
}

//?- DELETE
async function removeGame(req, res) {
    try {
        logger.debug('Removing game')
        const { gameId } = req.params
        const removedGame = await gameService.remove(gameId)
        res.json(removedGame)
    } catch (error) {
        logger.error('Failed to remove Game', error)
        res.status(500).send({ err: 'Failed to remove Game' })
    }
}

module.exports = {
    getGames,
    getGame,
    addGame,
    updateGame,
    removeGame
}  