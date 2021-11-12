/**
 * Ways of creating objects in JS
 * object literal (not good for mor ethat one object)
 * object constructor (Exist only on javascript)
 * class (Exist in every language)
 */

function testObjectLiteral(){
    let dog = {
        name:"Fido",
        age:3, 
    };
    let lola={
        name:"Lola",
        age:3,
    }
    console.log(dog);
    console.log(dog.name); //read 
    dog.age=4; //write 
}

function Dog(name,age){
    this.name= name;
    this.age= age;

}

function testObjectConstructor(){
    //an object constructor is a function that assign attributes to itself
    let fido = new Dog("fido", 3);
    let lola = new Dog("lola", 4);
    console.log(fido,lola);
    //console.log(fido.name); //read
    //fido.age= 4; //write
}

class Pet {
    constructor(name, age, breed) {
        this.name=name;
        this.age=age;
        this.breed=breed;


    }
}


function testClass(){
    let pet1= new Pet("Grumpy",2,"cat");

    console.log(pet1);
    console.log(pet1.name) //read
    pet1.age=3; //write
}

function testAjax() {
    $.ajax({
    url:"https://restclass.azurewebsites.net/api/test",
    type: "GET",
    success: function(response) {
        console.log("Server says:", response);
    },
    error: function(error){
        console.log("Request failed", error);
    }
    });
}

//testAjax();


testObjectConstructor();
testObjectLiteral();
testClass();