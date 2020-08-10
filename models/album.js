module.exports = (sequelize, DataTypes) => {
	const Album = sequelize.define("Album", {
		spotify_id: {
			type: DataTypes.STRING,
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
		imgURLMed: {
			//gallery
			type: DataTypes.STRING
		},
		imgURLLarge: {
			//albumPage
			type: DataTypes.STRING
		}
		

	});

	Album.associate = function (models) {
		Album.hasMany(models.Comment, {
			foreignKey: {
				allowNull: true
			}
		});
	};
	
	return Album;
};
