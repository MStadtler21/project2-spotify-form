
module.exports = function (sequelize, DataTypes) {
	const Comment = sequelize.define("Comment", {
		text: {
			type: DataTypes.TEXT,
			allowNull: false,
			validate: {
				len: [1, 100]
			}
		},
		displayName: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1, 50]
			}
		}
	});

	Comment.associate = function (models) {
	// 	Comment.belongsTo(models.User, {
	// 		foreignKey: {
	// 			allowNull: false
	// 		}
	// 	});
		
		//if we dont like naming, can rename to spotify_id bc will be album id.
		Comment.belongsTo(models.Album, {
			foreignKey: {
				allowNull: false
			}
		});
	};

	return Comment;
};
