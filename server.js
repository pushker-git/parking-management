const express = require('express');
const logger = require('morgan');

const port = process.env.PORT || 3000;
const app = express();

app.use(logger('dev'));

app.use(express.json());



const db = require("./src/models");

if (process.env.NODE_ENV === 'dev') {
    db.sequelize.sync({ force: false });
}

app.get('/', (req, res) => res.status(200).send({
    message: 'Server is running',
}));

app.use('/api', require('./src/routes'));

app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use((err, req, res) => {
    res.status(err.status || 500);
    res.json({
        'errors': {
            message: err.message,
            error: {}
        }
    });
});

app.listen(port, () => {
    console.log(`App is listening on ${port}`);
});
module.exports = app;