import * as axios from "axios";

// const getRandomNumber = () => {
//     return Math.floor(Math.random() * (1000 - 3000)) + 3000;
// }
//
// let randomNumber = getRandomNumber();

const instance = axios.create({
    baseURL: `https://randomuser.me/api/?nat=us&results=5000&seed=foobar&inc=name,email,login,picture,registered`
})

export const getUsers = async () => {
    const response = await instance.get()
    return response.data.results;
}