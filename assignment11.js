// Assignment 11

// 1. Insert student documents
db.student.insertMany([
  {
    name: "Amit",
    roll: 101,
    prn: "PRN001",
    branch: "Computer",
    marks: { TOC: 85, DBMS: 78, OS: 90 }
  },
  {
    name: "Nina",
    roll: 102,
    prn: "PRN002",
    branch: "IT",
    marks: { TOC: 88, DBMS: 82, OS: 79 }
  },
  {
    name: "Ravi",
    roll: 103,
    prn: "PRN003",
    branch: "Computer",
    marks: { TOC: 92, DBMS: 76, OS: 85 }
  },
  {
    name: "Simran",
    roll: 104,
    prn: "PRN004",
    branch: "IT",
    marks: { TOC: 70, DBMS: 91, OS: 88 }
  },
  {
    name: "John",
    roll: 105,
    prn: "PRN005",
    branch: "Mechanical",
    marks: { TOC: 67, DBMS: 72, OS: 69 }
  }
]);

// 2. Display all students
print("2. All student documents:");
printjson(db.student.find().toArray());

// 3. Find student strength per branch
print("3. Strength of students per branch:");
printjson(
  db.student.aggregate([
    { $group: { _id: "$branch", count: { $sum: 1 } } }
  ]).toArray()
);

// 4. Branch-wise toppers (based on TOC marks)
print("4. Branch-wise TOC toppers:");
printjson(
  db.student.aggregate([
    { $sort: { "marks.TOC": -1 } },
    { $group: {
      _id: "$branch",
      topper: { $first: "$$ROOT" }
    }}
  ]).toArray()
);

// 5. Max marks in each subject
print("5. Max marks in each subject:");
printjson(
  db.student.aggregate([
    {
      $group: {
        _id: null,
        maxTOC: { $max: "$marks.TOC" },
        maxDBMS: { $max: "$marks.DBMS" },
        maxOS: { $max: "$marks.OS" }
      }
    }
  ]).toArray()
);

// 6. Average marks of each subject
print("6. Average marks of each subject:");
printjson(
  db.student.aggregate([
    {
      $group: {
        _id: null,
        avgTOC: { $avg: "$marks.TOC" },
        avgDBMS: { $avg: "$marks.DBMS" },
        avgOS: { $avg: "$marks.OS" }
      }
    }
  ]).toArray()
);

// 7. Student with min marks in TOC
print("7. Student with min TOC marks:");
printjson(
  db.student.find().sort({ "marks.TOC": 1 }).limit(1).toArray()
);

// 8. Create indexes on roll and PRN
db.student.createIndex({ roll: 1 });
db.student.createIndex({ prn: 1 });
print("8. Indexes created on roll and PRN");

// 9. Display all indexes
print("9. All indexes:");
printjson(db.student.getIndexes());

// 10. Drop index on roll number
db.student.dropIndex("roll_1");
print("10. Index on roll dropped");
