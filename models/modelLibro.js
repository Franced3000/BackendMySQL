const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  });

const Libro = sequelize.define('libri', {
  titolo: {
    type: DataTypes.STRING
  },
  autore: {
    type: DataTypes.STRING
  },
  anno_pubblicazione: {
    type: DataTypes.INTEGER
  },
  isbn: {
    type: DataTypes.STRING
  },
  url: {
    type: DataTypes.STRING
  },
  lingua: {
    type: DataTypes.STRING
  },
  formato: {
    type: DataTypes.STRING
  },
  data_modifica: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'libri' // Specifica il nome della tabella
});

module.exports = Libro;
