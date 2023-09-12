"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var app = express();
app.get('/', function (req, res) {
    res.send('Hello World!');
});
var port = 3000;
app.listen(port, function () { return console.log("Express is listening on port ".concat(port)); });
//# sourceMappingURL=app.js.map