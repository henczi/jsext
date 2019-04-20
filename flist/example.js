class A { }
class B { }
class C { }

list = new FList;

list.add(new A);
list.add(new A);
list.add(new B);
list.add(new B);
list.add(new A);
list.add(new A);

for (item of list.all())
  console.log(item);

// A
// A
// A
// A
// B
// B

for (item of list.ofType(B))
  console.log(item);

// B
// B

for (item of list.ofType(C))
  console.log(item);

// <empty>