// THIS IS FOR TESTING ONLY
// Run interactively inside the backend container:
// node scripts/createAdmin.js

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

const bcrypt = require("bcrypt");
const readline = require("readline");
const sequelize = require("../utils/database");
const Admin = require("../models/Admin");

function ask(prompt, hidden = false) {
    return new Promise((resolve) => {
        const input = process.stdin;
        let answer = "";

        process.stdout.write(prompt);
        input.resume();

        if (hidden && input.isTTY) {
            input.setRawMode(true);
        }

        const onData = (chunk) => {
            for (const character of chunk.toString()) {
                if (character === "\u0003") {
                    process.stdout.write("\nCancelled.\n");
                    process.exit(1);
                }

                if (character === "\r" || character === "\n") {
                    if (hidden && input.isTTY) input.setRawMode(false);
                    input.removeListener("data", onData);
                    input.pause();
                    process.stdout.write("\n");
                    resolve(answer);
                    return;
                }

                if (character === "\u007f" || character === "\b") {
                    answer = answer.slice(0, -1);
                    if (hidden) process.stdout.write("\b \b");
                    continue;
                }

                answer += character;
                process.stdout.write(hidden ? "*" : character);
            }
        };

        input.on("data", onData);
    });
}

async function main() {
    try {
        const firstName = (await ask("First name: ")).trim();
        const lastName = (await ask("Last name: ")).trim();
        const email = (await ask("Email: ")).trim().toLowerCase();
        const password = await ask("Password (input hidden): ", true);
        const confirmation = await ask("Confirm password (input hidden): ", true);

        if (!firstName || !lastName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            throw new Error("Please enter valid first name, last name and email values.");
        }

        if (password.length < 12 || Buffer.byteLength(password, "utf8") > 72) {
            throw new Error("Password must be at least 12 characters and no more than 72 UTF-8 bytes.");
        }

        if (password !== confirmation) {
            throw new Error("Passwords do not match.");
        }

        await sequelize.authenticate();

        const existingAdmin = await Admin.findOne({ where: { email } });
        if (existingAdmin) {
            throw new Error("An administrator with that email already exists.");
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const admin = await Admin.create({
            first_name: firstName,
            last_name: lastName,
            email,
            password_hash: passwordHash,
        });

        process.stdout.write(`Administrator created successfully (ID: ${admin.admin_id}).\n`);
    } finally {
        await sequelize.close();
    }
}

main().catch((error) => {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
});