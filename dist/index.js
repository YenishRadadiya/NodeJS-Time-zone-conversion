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
// index.ts
const readline_1 = __importDefault(require("readline"));
const timezone_1 = __importDefault(require("./timezone"));
function parseTime(input) {
    const [time, modifier] = input.trim().split(' ');
    let [hour, minute] = time.split(':').map(Number);
    if (modifier.toLowerCase() === 'pm' && hour !== 12)
        hour += 12;
    if (modifier.toLowerCase() === 'am' && hour === 12)
        hour = 0;
    return { hour, minute };
}
function convertTime(currentTime, fromTz, toTz) {
    var _a, _b;
    const fromOffset = (_a = timezone_1.default[fromTz.toUpperCase()]) === null || _a === void 0 ? void 0 : _a.offset;
    const toOffset = (_b = timezone_1.default[toTz.toUpperCase()]) === null || _b === void 0 ? void 0 : _b.offset;
    if (fromOffset === undefined || toOffset === undefined) {
        throw new Error('Invalid timezone provided.');
    }
    const { hour, minute } = parseTime(currentTime);
    const totalMinutes = hour * 60 + minute;
    const offsetDiff = (toOffset - fromOffset) * 60;
    const convertedTotalMinutes = (totalMinutes + offsetDiff + 1440) % 1440;
    const convertedHour = Math.floor(convertedTotalMinutes / 60);
    const convertedMinute = convertedTotalMinutes % 60;
    const hour12 = convertedHour % 12 || 12;
    const ampm = convertedHour < 12 ? 'AM' : 'PM';
    return `${hour12}:${convertedMinute.toString().padStart(2, '0')} ${ampm}`;
}
function askInput(prompt) {
    const rl = readline_1.default.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise(resolve => rl.question(prompt, answer => {
        rl.close();
        resolve(answer);
    }));
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const currentTime = yield askInput('CURRENT_TIME (e.g. 12:00 AM): ');
            const currentTimezone = yield askInput('CURRENT_TIMEZONE (e.g. IST): ');
            const convertToTimezone = yield askInput('CONVERT_TO_TIMEZONE (e.g. PT): ');
            const result = convertTime(currentTime, currentTimezone, convertToTimezone);
            console.log(`\nCONVERTED_TIME = ${result}`);
        }
        catch (error) {
            console.error('Error:', error.message);
        }
    });
}
main();
//# sourceMappingURL=index.js.map