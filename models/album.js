module.exports = (sequelize, DataTypes) => {
	const Album = sequelize.define("Album", {
		spotifyId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false
		},
		artist: {
			type: DataTypes.STRING,
			allowNull: false
		},
		imgURIsmall: {
			type: DataTypes.STRING
		},
		imgURIMed: {
			type: DataTypes.STRING
		},
		imgURILarge: {
			type: DataTypes.STRING
		}

	});
	return Album;
}
