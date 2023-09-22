class School{
  constructor(name, level, numbersOfStudents){
    this._name = name;
    this._level = level;
    this._numberOfStudents = numbersOfStudents;
  }
  
  // Getters
  get name(){
    return this._name;
  }
  
  get level(){
    return this._level;
  }
  
  get numberOfStudents(){
    return this._numberOfStudents;
  }
  
  // Setters
  set numberOfStudents(numberOfStudents){
    if (typeof numberOfStudents === 'number')
      this._numberOfStudents = numberOfStudents;
    else
      console.log('Invalid input: numberOfStudents must be set to a Number.');
  }
  
  // Methods
  quickFacts(){
    console.log(`${this._name} educates ${this._numberOfStudents} students at the ${this._level} school level.`);
  }
  
  static pickSubstituteTeacher(substituteTeachers){
    return substituteTeachers[Math.floor(Math.random() * substituteTeachers.length)];
  }
}




class PrimarySchool extends School{
  constructor(name, numbersOfStudents, pickupPolicy){
    super(name, 'primary', numbersOfStudents);
    this._pickupPolicy = pickupPolicy;
  }

  //Getters
  get pickupPolicy(){
    return this._pickupPolicy;
  }
}




class HighSchool extends School{
  constructor(name, numbersOfStudents, sportsTeams){
    super(name, 'high', numbersOfStudents);
    this._sportsTeams = sportsTeams;
  }

  //Getters
  get sportsTeams(){
    console.log(this._sportsTeams);
  }
}




class Middle extends School{
  constructor(name, level, numbersOfStudents){
    super(name, level, numbersOfStudents);
  }
}




class SchoolCatalog{
  constructor(){
    this._schoolNames = [];
  }

  get schoolNames(){
    return this._schoolNames;
  }

  set schoolNames(name){
    this._schoolNames.push(name);
  }
}




const lorraineHansbury = new PrimarySchool('Lorraine Hansbury', 514, 'Students must be picked up by a parent, guardian, or a family member over the age of 13.');
lorraineHansbury.quickFacts();
School.pickSubstituteTeacher(['Jamal Crawford', 'Lou Williams', 'J. R. Smith', 'James Harden', 'Jason Terry', 'Manu Ginobli']);

const alSmith = new HighSchool('Al E. Smith', 415, ['Baseball', 'Basketball', 'Volleyball', 'Track and Field']);
alSmith.sportsTeams;

const sCatalog = new SchoolCatalog();
sCatalog.schoolNames = lorraineHansbury.name;
sCatalog.schoolNames = alSmith.name;
console.log(sCatalog.schoolNames);

