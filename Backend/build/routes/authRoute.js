"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var express_validator_1 = require("express-validator");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var index_1 = require("../models/index");
var config = __importStar(require("../config/default.json"));
var router = express_1.default.Router();
var jsonParser = body_parser_1.default.json();
// Constants
var TOKEN_EXPIRES = 3600;
// @route       GET api/auth
// @desc        Get logged in user
router.post('/refreshToken/', jsonParser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user_1, payload, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.body.id;
                return [4 /*yield*/, index_1.User.findById(id).select('-password')];
            case 1:
                user_1 = _a.sent();
                if (!user_1) {
                    return [2 /*return*/, res.status(400).json({ msg: 'Invalid credentials!' })];
                }
                payload = {
                    user: {
                        _id: user_1._id
                    }
                };
                // Make a json web token
                jsonwebtoken_1.default.sign(payload, config.jwtSecret, {
                    expiresIn: TOKEN_EXPIRES
                }, function (err, token) {
                    if (err) {
                        return res.status(500).send(err.message);
                    }
                    res.json({ token: token, user: user_1 });
                });
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(500).send('Server error');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// @route       GET api/auth
// @desc        Log user in
router.post('/login/', jsonParser, [
    (0, express_validator_1.body)('email', 'Please include a valid email').isEmail(),
    (0, express_validator_1.body)('password', 'Password is required').exists()
], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _a, email, password, user_2, isMatch, payload, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({ errors: errors.array() })];
                }
                _a = req.body, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, index_1.User.findOne({ email: email })];
            case 2:
                user_2 = _b.sent();
                if (!user_2) {
                    return [2 /*return*/, res.status(400).json({ msg: 'Invalid Email!' })];
                }
                return [4 /*yield*/, bcryptjs_1.default.compare(password, user_2.password)];
            case 3:
                isMatch = _b.sent();
                if (!isMatch) {
                    return [2 /*return*/, res.status(400).json({ msg: 'Invalid Password!' })];
                }
                payload = {
                    user: {
                        _id: user_2._id
                    }
                };
                // Make a json web token
                jsonwebtoken_1.default.sign(payload, config.jwtSecret, {
                    expiresIn: TOKEN_EXPIRES
                }, function (err, token) {
                    if (err) {
                        return res.status(500).send(err.message);
                    }
                    res.json({ token: token, user: user_2 });
                });
                return [3 /*break*/, 5];
            case 4:
                err_2 = _b.sent();
                res.status(500).send('server error');
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// @route       GET api/auth
// @desc        Regiser user
router.post('/', jsonParser, [
    (0, express_validator_1.body)('email').isEmail(),
    (0, express_validator_1.body)('password').isLength({ min: 6 })
], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _a, firstName, lastName, email, password, fetchedUser, salt, userSettings, user, _b, payload, id_1, role_1, error_1;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                errors = (0, express_validator_1.validationResult)(req.body);
                if (!errors.isEmpty())
                    return [2 /*return*/, res.status(400).json({ erros: errors.array() })];
                _a = req.body, firstName = _a.firstName, lastName = _a.lastName, email = _a.email, password = _a.password;
                _d.label = 1;
            case 1:
                _d.trys.push([1, 7, , 8]);
                return [4 /*yield*/, index_1.User.findOne({ email: email })];
            case 2:
                fetchedUser = _d.sent();
                if (fetchedUser) {
                    return [2 /*return*/, res.status(400).json({ msg: 'Email already exists' })];
                }
                return [4 /*yield*/, bcryptjs_1.default.genSalt(10)];
            case 3:
                salt = _d.sent();
                userSettings = new index_1.UserSettings({
                    backgroundColour: '#435452',
                    backgroundImage: '',
                    useBackground: false,
                    theme: 'standard'
                });
                _b = index_1.User.bind;
                _c = {
                    firstName: firstName,
                    lastName: lastName,
                    email: email
                };
                return [4 /*yield*/, bcryptjs_1.default.hash(password, salt)];
            case 4:
                user = new (_b.apply(index_1.User, [void 0, (_c.password = _d.sent(),
                        _c.installedPrograms = ['645be25c282005257c879cbc'],
                        _c.settings = userSettings._id,
                        _c)]))();
                console.log("CREATED USERSETTINGS", userSettings);
                console.log("CREATED USER", user);
                return [4 /*yield*/, userSettings.save()];
            case 5:
                _d.sent();
                return [4 /*yield*/, user.save()];
            case 6:
                _d.sent();
                payload = {
                    user: {
                        _id: user._id
                    }
                };
                id_1 = user._id;
                role_1 = user.type;
                jsonwebtoken_1.default.sign(payload, config.jwtSecret, {
                    expiresIn: TOKEN_EXPIRES
                }, function (err, token) {
                    if (err) {
                        return res.status(500).send(err.message);
                    }
                    res.json({ token: token, id: id_1, role: role_1 });
                });
                return [3 /*break*/, 8];
            case 7:
                error_1 = _d.sent();
                res.status(500).send(error_1);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
module.exports = router;
