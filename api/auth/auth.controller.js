const authService = require('./auth.service')
const logger = require('../../services/logger.service')

async function verifyUsername(req, res) {
        const {username} = req.query
    try {
        const isVerified = await authService.verifyUsername(username)
        res.send(isVerified)
    } catch (err) {
        logger.error(`User was not verify ${username}` + err)
        res.status(401).send({ err: 'Failed to verify' })
    }
}

async function login(req, res) {
    const { username, password } = req.body
    try {
        const user = await authService.login(username, password)
        const loginToken = authService.getLoginToken(user)
        logger.info('User login: ', user)
        res.cookie('loginToken', loginToken)
        res.json(user)
    } catch (err) {
        logger.error('Failed to Login ' + err)
        res.status(404).send({ err: 'Failed to Login' })
    }
}

async function signup(req, res) {
    try {
        const { username, password, email = [] } = req.body
        const account = await authService.signup(username, password, email)
        logger.debug(`auth.route - new account created: ` + JSON.stringify(account))
        const user = await authService.login(username, password)
        const loginToken = authService.getLoginToken(user)
        logger.info('User login: ', user)
        res.cookie('loginToken', loginToken)
        res.json(user)
    } catch (err) {
        logger.error('Failed to signup ' + err)
        res.status(500).send({ err: 'Failed to signup' })
    }
}

async function logout(req, res) {
    try {
        logger.info(`User Logged out`)
        res.clearCookie('loginToken')
        res.send({ msg: 'Logged out successfully' })
    } catch (err) {
        logger.error(`Failed to logout`)
        res.status(500).send({ err: 'Failed to logout' })
    }
}

module.exports = {
    verifyUsername,
    login,
    signup,
    logout
}