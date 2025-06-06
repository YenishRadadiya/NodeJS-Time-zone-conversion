# 🕒 Timezone Converter CLI (Node + TypeScript)

This is a simple CLI-based Timezone Converter built using **Node.js and TypeScript**, without using any external libraries. It takes a given time and timezone, and converts it to another timezone using predefined UTC offsets.

---

## 🚀 Features

- Converts time from one timezone to another based on UTC offset.
- Uses a custom timezone map (no external libraries like Luxon or Moment).
- Accepts dynamic input via CLI.
- Supports both 12-hour format and common timezone abbreviations.

---

## 📦 Folder Structure

```
timezone-converter/
├── dist/               # Compiled JavaScript files
├── src/
│   ├── index.ts        # Main CLI logic
│   └── timeZones.ts    # Timezone offset map
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📥 Installation

```bash
git clone https://github.com/your-username/timezone-converter.git
cd timezone-converter
npm install
```

---

## 🛠️ Build the project

```bash
npm run build
```

---

## 🧪 Run the CLI

```bash
node dist/index.js
```

Example interaction:

```
CURRENT_TIME (e.g. 12:00 AM): 12:00 AM
CURRENT_TIMEZONE (e.g. IST): IST
CONVERT_TO_TIMEZONE (e.g. PT): PT

CONVERTED_TIME = 10:30 AM
```

---

## 🧠 How It Works

- `timeZones.ts` contains a map of commonly used timezones and their UTC offsets.
- Input time is parsed from 12-hour format (e.g., 12:00 AM or 6:45 PM).
- Conversion is done using basic offset math without relying on Date or Temporal objects.
- Output is given in 12-hour format (e.g., 10:30 AM).

---

## 🧩 Supported Timezones

A few examples:

- `IST` - Indian Standard Time (UTC +5.5)
- `PT`, `PST`, `PDT` - Pacific Time (UTC -8 / -7)
- `EST`, `EDT` - Eastern Time (UTC -5 / -4)
- `CET`, `CEST` - Central Europe
- `GMT`, `UTC`, `JST`, `AEST`, `NZDT`, etc.

> See full list in `timeZones.ts`.

---
