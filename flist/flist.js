class FList {
  typedList = {}
  constructor() { }

  add(it) {
    const t = it.constructor.name;
    if (this.typedList.hasOwnProperty(t)) {
      this.typedList[t].push(it);
    } else {
      this.typedList[t] = [it];
    }
  }

  *all() {
    for (var item of Object.keys(this.typedList))
      yield* iter(this.typedList[item])
  }

}

function* iter(iterable) {
  var i = 0;
  for (var item of iterable)
    yield item;
}
