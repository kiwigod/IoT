// object
class GirlGroup {
    constructor(name, members) {
        this.name = name;
        this.members = members;
    }

    memberByIndex(index) {
        return this.members[index];
    }
}
exid = new GirlGroup("EXID", ["Solji", "LE", "Hani", "Hyelin", "Jeonghwa"]);

// function
var combine = (a, b) => { return a + b; }

// json
var gg = JSON.parse('{ "group": "EXID", "members": ["Solji", "LE", "Hani", "Hyelin", "Jeonghwa"] }');


console.log("JSON parse");
console.log('{ "group": "EXID", "members": ["Solji", "LE", "Hani", "Hyelin", "Jeonghwa"] }');
console.log(combine("group name: ", gg.group));
console.log(combine("first member: ", exid.memberByIndex(0)));

