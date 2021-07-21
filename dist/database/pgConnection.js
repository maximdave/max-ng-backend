"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pgConnection = void 0;
const CommentModel_1 = require("../entity/CommentModel");
const MovieModel_1 = require("../entity/MovieModel");
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pgConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield typeorm_1.createConnection({
            type: 'postgres',
            entities: [CommentModel_1.CommentModel, MovieModel_1.MovieModel],
            synchronize: true,
            ssl: {
                rejectUnauthorized: false
            }
        });
        console.log('Connected to Postgres');
    }
    catch (error) {
        console.error(error);
        throw new Error('Unable to connect to Postgres');
    }
});
exports.pgConnection = pgConnection;
//# sourceMappingURL=pgConnection.js.map