
module.exports = function (sequelize, DataTypes) {
    const Comment = sequelize.define("Comment", {
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1, 100]
            }
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        timePosted: {
            type: DataTypes.DATETIME,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        datePosted: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        spotify_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Album,
                key: "id"
            }
        }
    });

    Comment.associate = function (models) {
        Comment.belongsTo(models.Album, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Comment;
};
