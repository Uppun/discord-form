const path = require('path');
const express = require('express');

module.exports = (app) => {
    if (process.env.NODE_ENV === 'production') {
        console.log('production build')
        app.use(express.static(path.join(__dirname, '../build')));
    }
        app.use(express.static(path.join(__dirname, '../public')));
}

