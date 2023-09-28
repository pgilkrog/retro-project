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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var auth_1 = __importDefault(require("../middleware/auth"));
var multer_1 = __importDefault(require("multer"));
var index_1 = require("../models/index");
var router = express_1.default.Router();
var jsonParser = body_parser_1.default.json();
// const upload = multer({ dest: 'uploads'})
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        var originalname = Date.now() + '-' + file.originalname;
        var filename = originalname.trim().replace(/\s+/g, "-");
        cb(null, filename);
    }
});
// File filter function to only allow images and PDFs
var fileFilter = function (req, file, cb) {
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
        cb(null, true);
    }
    else {
        cb(new Error('Invalid file type. Only images and PDFs are allowed.'));
    }
};
// Set up Multer middleware
var upload = (0, multer_1.default)({ storage: storage, fileFilter: fileFilter });
// @route       GET files
// @desc        Get all files
router.get('/', auth_1.default, jsonParser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var fetchedItems, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, index_1.File.find()];
            case 1:
                fetchedItems = _a.sent();
                res.json({ files: fetchedItems });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log(error_1.message);
                res.status(500).send('server error');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// @route       POST api/files/upload
// @desc        Uploads a file
router.post('/upload', auth_1.default, upload.single('image'), jsonParser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.send({ file: req.file });
        return [2 /*return*/];
    });
}); });
// @route       POST api/files/upload
// @desc        Uploads a file object to db
router.post('/', auth_1.default, jsonParser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, originalName, size, type, url, userId, newFile, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.query, name = _a.name, originalName = _a.originalName, size = _a.size, type = _a.type, url = _a.url, userId = _a.userId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                newFile = new index_1.File({
                    name: name,
                    originalName: originalName,
                    size: size,
                    type: type,
                    url: url,
                    userId: userId
                });
                return [4 /*yield*/, newFile.save()];
            case 2:
                _b.sent();
                res.json(newFile);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                res.status(500).send('server error');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// @route       DELETE api/files/:id
// @desc        Delete file by id
router.delete('/:id', auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deleteItem, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, index_1.File.findByIdAndDelete({ _id: req.params.id })];
            case 1:
                deleteItem = _a.sent();
                res.send({ item: deleteItem });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.log(error_3.message);
                res.status(500).send('server error');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// @route       PUT api/files/:id
// @desc        Update file by id
router.put('/:id', auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, fileToUpdate, updateFile, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                fileToUpdate = req.query;
                return [4 /*yield*/, index_1.File.findByIdAndUpdate(id, fileToUpdate, { new: true })];
            case 1:
                updateFile = _a.sent();
                if (!updateFile)
                    return [2 /*return*/, res.status(404).send({ error: 'File not found' })];
                res.send(updateFile);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.log(error_4.message);
                res.status(500).send('server error');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
module.exports = router;
