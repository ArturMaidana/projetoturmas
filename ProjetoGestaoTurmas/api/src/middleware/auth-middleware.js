const jwt = require('jsonwebtoken');

const { HttpHelper } = require('../utils/http-helper');

function authMiddleware(request, response, next) {
    const httpHelper = new HttpHelper(response);

    try {
        const token = request.headers.authorization;

        if (token) {
            const accessToken = token.split(' ')[1];
            jwt.verify(
                accessToken,
                process.env.TOKEN_SECRET,
                (error, user) => {
                    if (error) {
                        return httpHelper.unauthorized();
                    }
                    request.userId = user.id;
                    next();
                }
            );
        } else {
            return httpHelper.notFound('Token de acesso não foi encontrado!');
        }
    } catch (error) {
        return httpHelper.internalError(error);
    }
}

module.exports = { authMiddleware };
