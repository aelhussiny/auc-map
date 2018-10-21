var keys = ["name", "department", "title", "email", "phone", "building", "room", "campus"];
var people = [];
for(var i=0; i<document.getElementById("ctl00_ContentPlaceHolder1_DataList1").children[0].children.length; i++) {
    var person = {};
    var info = document.getElementById("ctl00_ContentPlaceHolder1_DataList1").children[0].children[i].children[0].innerText.split("\n");
    for(var j=0; j<8; j++) {
        person[keys[j]] = info[j];
        console.log(person[keys[j]], info[j]);
    }
    people.push(person);
}
people.forEach(function(person){
    keys.forEach(function(key){
        person[key] = person[key].substring(person[key].indexOf(":")+2).replace('"','');
    });
});
var dumpstring = "";
people.forEach(function(person){
    dumpstring += JSON.stringify(person, null, '\t') + ",";
});
dumpstring;