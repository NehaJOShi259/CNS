// 1. Create student collection and insert sample records
db.student.insertMany([
  { name: "Ram", marks: 95, cgpa: 9, branch: "Computer", city: "Delhi" },
  { name: "Sita", marks: 78, cgpa: 7, branch: "IT", city: "Mumbai" },
  { name: "Anita", marks: 88, cgpa: 9.5, branch: "Computer", city: "Chennai" },
  { name: "Ravi", marks: 70, cgpa: 7, branch: "Mechanical", city: "Mumbai" },
  { name: "Geeta", marks: 85, cgpa: 8.5, branch: "Electronics", city: "Pune" }
]);

// 2. Display all documents in the student collection
print("2. All students:");
printjson(db.student.find().toArray());

// 3. Update marks of student “Ram”
db.student.updateOne({ name: "Ram" }, { $set: { marks: 98 } });
print("3. After updating Ram's marks:");
printjson(db.student.find({ name: "Ram" }).toArray());

// 4. Fetch documents having CGPA 9 or branch as Computer
print("4. Students with CGPA 9 or branch Computer:");
printjson(db.student.find({ $or: [ { cgpa: 9 }, { branch: "Computer" } ] }).toArray());

// 5. Fetch documents not having branch as “IT”
print("5. Students NOT in branch IT:");
printjson(db.student.find({ branch: { $ne: "IT" } }).toArray());

// 6. Fetch documents having CGPA 7 and city as “Mumbai”
print("6. Students with CGPA 7 and city Mumbai:");
printjson(db.student.find({ cgpa: 7, city: "Mumbai" }).toArray());

// 7. Fetch documents NOT having CGPA 9 or branch as Computer
print("7. Students NOT having CGPA 9 or branch Computer:");
printjson(db.student.find({ $nor: [ { cgpa: 9 }, { branch: "Computer" } ] }).toArray());

// 8. Add new document using save() method
db.student.save({ name: "Vikram", marks: 82, cgpa: 8, branch: "Civil", city: "Bangalore" });
print("8. After adding Vikram:");
printjson(db.student.find({ name: "Vikram" }).toArray());

// 9. Remove document of “Sita”
db.student.deleteOne({ name: "Sita" });
print("9. After removing Sita:");
printjson(db.student.find().toArray());

// 10. Fetch document having highest CGPA from Computer branch
var topStudent = db.student.find({ branch: "Computer" }).sort({ cgpa: -1 }).limit(1).toArray();
print("10. Student with highest CGPA in Computer branch:");
printjson(topStudent);
