#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let api = "https://opentdb.com/api.php?amount=5&category=9&type=multiple";
let fetchdata = async () => {
    let fetchdata = await fetch(api);
    let res = await fetchdata.json();
    return res.results;
};
let data = await fetchdata();
let marks = 0;
let student = await inquirer.prompt({
    name: "name", type: "input",
    message: "Please Enter your name",
});
for (let i = 0; i < 4; i++) {
    let answers = [...data[i].incorrect_answers, data[i].correct_answer];
    let quiz = await inquirer.prompt({
        name: "answer", type: "list",
        message: data[i].question,
        choices: answers.map(val => val)
    });
    if (quiz.answer == data[i].correct_answer) {
        marks = marks + 10;
    }
}
console.log(chalk.greenBright.bold(`${student.name} ! your Obtained marks are ${marks}`));
