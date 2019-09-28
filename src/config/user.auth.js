const jwt = require("jsonwebtoken");

module.exports = function verifyJWT(req, res, next) {
	var token = req.headers["x-access-token"];
	if (!token)
		return res
			.status(401)
			.send({ auth: false, message: "Nenhum token fornecido." });

	jwt.verify(token, process.env.SECRET, function(err, decoded) {
		if (err)
			return res.status(500).send({ auth: false, message: "Token inválido." });

		// se tudo estiver ok, salva no request para uso posterior
		req.userId = decoded.id;
		next();
	});
};