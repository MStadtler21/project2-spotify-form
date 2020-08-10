// const sequelize = require("../config/connection");
// const { DataTypes } = require("../config/connection");

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define("User", {
		displayName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		imgURL: {
			type: DataTypes.STRING,
			allowNull: true
		},
		albums: {
			type: DataTypes.STRING,
			// allowNull: false
		},
		spotifyUserId: {
			type: DataTypes.STRING,
			allowNull: false
		}
	});

	User.associate = function (models) {
		User.hasMany(models.Comment, {
			foreignKey: {
				allowNull: false
			}
		});
	};

	return User;
};