// Requirement:
// A student management app that is able to:
// - Show current student list
// - Add new students

var readlineSync = require('readline-sync');
var fs = require('fs');
var students = [];

function loadData() {
    var fileContent = fs.readFileSync('./data.json',{encoding: 'UTF-8'});
    students = (JSON.parse(fileContent));
}

function showStudents() {
    for (var student of students) {
        console.log(student.name, student.age)
    }
}

function showCreateStudent() {
    var name = readlineSync.question('Name: ');
    var age = readlineSync.question('Age: ');
    var student = {
        name: name,
        age: parseInt(age)
    }
    students.push(student);
}

function saveAndExit() {
    var content = JSON.stringify(students);
    fs.writeFileSync('./data.json',content,{encoding: 'UTF-8'})
}

function showMenu() {
    console.log('1. Show all student');
    console.log('2. Create a new student');
    console.log('3. Save and exit')

    var option = readlineSync.question('> ');
    switch (option) {
        case '1':
            showStudents();
            showMenu();
            break;
        case '2':
            showCreateStudent();
            showMenu()
            break;
        case '3':
            saveAndExit();
            break;
        default:
            console.log('Wrong option');
            showMenu();
            break;
    }
}

function main() {
    loadData();
    showMenu();

}

main();