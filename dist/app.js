"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movieRoutes_1 = __importDefault(require("./routes/movieRoutes"));
const indexRoute_1 = __importDefault(require("./routes/indexRoute"));
const pgConnection_1 = require("./database/pgConnection");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = express_1.default();
pgConnection_1.pgConnection();
app.use(express_1.default.json());
app.use('/', movieRoutes_1.default);
app.use('/', indexRoute_1.default);
app.listen(3000, () => {
    console.log('Now running on port 3000');
});
//# sourceMappingURL=app.js.map