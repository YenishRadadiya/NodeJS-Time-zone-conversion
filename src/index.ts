// index.ts
import readline from 'readline';
import timeZones from './timezone';

function parseTime(input: string): { hour: number; minute: number } {
    const [time, modifier] = input.trim().split(' ');
    let [hour, minute] = time.split(':').map(Number);
    if (modifier.toLowerCase() === 'pm' && hour !== 12) hour += 12;
    if (modifier.toLowerCase() === 'am' && hour === 12) hour = 0;
    return { hour, minute };
}

function convertTime(
    currentTime: string,
    fromTz: string,
    toTz: string
): string {
    const fromOffset = timeZones[fromTz.toUpperCase()]?.offset;
    const toOffset = timeZones[toTz.toUpperCase()]?.offset;

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

function askInput(prompt: string): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise(resolve => rl.question(prompt, answer => {
        rl.close();
        resolve(answer);
    }));
}

async function main() {
    try {
        const currentTime = await askInput('CURRENT_TIME (e.g. 12:00 AM): ');
        const currentTimezone = await askInput('CURRENT_TIMEZONE (e.g. IST): ');
        const convertToTimezone = await askInput('CONVERT_TO_TIMEZONE (e.g. PT): ');

        const result = convertTime(currentTime, currentTimezone, convertToTimezone);
        console.log(`\nCONVERTED_TIME = ${result}`);
    } catch (error: any) {
        console.error('Error:', error.message);
    }
}

main();
