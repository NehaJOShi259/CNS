// Assignment 12

// 1. Create collection and insert one employee
db.employee.insertOne({
  name: "Ram",
  empId: 101,
  department: "Computer",
  salary: 50000,
  address: "Delhi",
  dependents: ["Rita", "Rohan"]
});

// 2. Insert multiple employees
db.employee.insertMany([
  {
    name: "Sita",
    empId: 102,
    department: "Mechanical",
    salary: 48000,
    address: "Pune",
    dependents: ["Mini"]
  },
  {
    name: "John",
    empId: 103,
    department: "Computer",
    salary: 52000,
    address: "Chennai",
    dependents: []
  },
  {
    name: "Leena",
    empId: 104,
    department: "Civil",
    salary: 47000,
    address: "Mumbai",
    dependents: ["Karan", "Meena"]
  }
]);

// 3. Display all documents
print("All Employees:");
printjson(db.employee.find().toArray());

// 4. Increase salary by 10% for employees in Computer department
db.employee.updateMany(
  { department: "Computer" },
  { $mul: { salary: 1.10 } }
);
print("Salaries updated for Computer department");

// 5. Update address of employee named Ram
db.employee.updateOne(
  { name: "Ram" },
  { $set: { address: "Bangalore" } }
);
print("Address of Ram updated");

// 6. Delete employee named Leena
db.employee.deleteOne({ name: "Leena" });
print("Leena deleted");

// 7. Highest salary in Mechanical department
print("Highest salary in Mechanical department:");
printjson(
  db.employee.find({ department: "Mechanical" })
    .sort({ salary: -1 }).limit(1).toArray()
);

// 8. Count number of dependents per employee
print("Number of dependents for each employee:");
printjson(
  db.employee.aggregate([
    {
      $project: {
        name: 1,
        dependentsCount: { $size: "$dependents" }
      }
    }
  ]).toArray()
);

// 9. Total number of employees
print("Total number of employees:");
printjson(db.employee.countDocuments());
