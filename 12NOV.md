db.students.find({hobbies:"cricket"})
db.students.find({Hobbies:{$all:["Walking","Reading"]}})
db.students.find({Hobbies:{$in:["Walking","Reading"]}})
