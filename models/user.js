// const sequelize = require("../config/connection");
// const { DataTypes } = require("../config/connection");

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define("User", {
		displayName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		imgURI: {
			type: DataTypes.STRING,
			allowNull: false
		},
		albums: {
			type: DataTypes.STRING,
			allowNull: false
		},
		spotifyUserId: {
			type: DataTypes.STRING,
			allowNull: false
		}
	});

	return User;
}