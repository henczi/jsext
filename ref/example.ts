class A { value = 1; }

const id1 = (new A).indirectRef().indirectRef().indirectRef();
console.log(id1) // Ref<Ref<Ref<A>>>
console.log(id1.deRef()) // Ref<Ref<A>>
console.log(id1.deRef().deRef()) // // Ref<A>
console.log(id1.deRef().deRef().deRef()) // A
console.log(id1.deRefAll()) // A