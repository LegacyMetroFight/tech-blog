const { Model, DataTYoes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

//create our User model
class User extends Model {
  // set up method to run on instance data (per user) to check password
  checkPassword(loginPW) {
    return bcrypt.compareSync(loginPW, this.password);
  }
}

// define table columns and configuration
User.init(
  {
    // define an id cilumn
    id: {
      // use the special Sequelize DataTypes object provide what tye of data it is
      type: DataType.INTEGER,
      // equivalent of SQL 'NOT NULL'
      allowNull: false,
      // instruct that this is the Primary Key
      primaryKey: true,
      // turn on auto increment
      autoIncrement: true
    },
    //define a username column
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    //define a password column
    password: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        // this means the password must be at least four characters long 
        len: [4]
      }
    }
  },
  {
    hooks: {
      // set up beforeCreate lifecycle 'hook' functionality
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;

      },
      // set up beforeUpdate lifecycle 'hook' functionality
      async beforeUpdate*(updateUserData) {
        updateUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      }
    },
    // table configuration options go here (https://sequelize.org/v5/manual/models-definition.html#configuration))

    //pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    // dont automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    // dont pluralize name of database table
    freezeTableName: true,
    // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    underscored: true,
    // make it so our model name stays lowercase in the database
    moduleName: 'user'
  }
);

module.exports = User;



  })

