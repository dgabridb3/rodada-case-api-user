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
const app_1 = __importDefault(require("./app"));
const connection_1 = __importDefault(require("./connection"));
app_1.default.get("/teste", (req, res) => {
    res.status(200).send("ok");
});
app_1.default.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let erroCode = 500;
    try {
        const result = yield (0, connection_1.default)("funcionarios")
            .select("*");
        if (!result) {
            erroCode = 400;
            throw new Error("nenhum nome encontrado");
        }
        res.status(200).send(result);
    }
    catch (Error) {
        res.status(erroCode).send(Error.message);
    }
}));
app_1.default.post("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome, sobreNome, participacao } = req.body;
    let erroCode = 500;
    try {
        yield (0, connection_1.default)("funcionarios")
            .insert({
            nome,
            sobreNome,
            participacao
        });
        if (!nome || !sobreNome || !participacao) {
            erroCode = 400;
            throw new Error("algum dado faltando");
        }
        res.status(201).send("usuario criado");
    }
    catch (error) {
        res.status(erroCode).send(error.message);
    }
}));
app_1.default.delete("/user/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let erroCode = 500;
    try {
        const id = req.params.id;
        yield (0, connection_1.default)("funcionarios")
            .delete()
            .where({ id });
        if (!id)
            throw new Error("o id não foi passado");
        res.status(201).send("Usuario apagado");
    }
    catch (error) {
        res.status(erroCode).send(error.message);
    }
}));
//# sourceMappingURL=index.js.map