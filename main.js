"use strict";
exports.__esModule = true;
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
console.log(await prisma.set.findMany());
