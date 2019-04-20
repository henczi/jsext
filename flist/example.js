class A { }
class B { }

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
