import { faker } from "@faker-js/faker";
import { User } from "../models/user.model.js";

export const createUserByFaker = async (num) => {
    try {
        const usersPromise = [];

        for (let i = 0; i < num; i++) {
            const tempUser = User.create({
                name: faker.person.fullName(),
                email: faker.internet.email(),
                mobileNumber: "+91" + faker.string.numeric(10),
                password: "password",
                gender: Math.random() < 0.5 ? "Male" : "Female",
            });
            usersPromise.push(tempUser);
        }

        await Promise.all(usersPromise);
        console.log(`${num} Users created & added in db`);

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};
