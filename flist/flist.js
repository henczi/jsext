const TYPE_ID_KEY = "__FList_Type_UID__";

class FList {
  typedList = {}
  constructor() { }

  add(it) {
    const ctr = it.constructor
    const typeId = createOrGetTypeId(ctr);
    if (this.typedList.hasOwnProperty(typeId)) {
      this.typedList[typeId].push(it);
    } else {
      this.typedList[typeId] = [it];
    }
  }

  *ofType(typeCtr) {
    const typeId = getTypeId(typeCtr);
    if (typeId && this.typedList.hasOwnProperty(typeId)) {
      yield* iter(this.typedList[typeId]);
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

function getTypeId(typeCtr) {
  return typeCtr.prototype[TYPE_ID_KEY];
}

function createOrGetTypeId(typeCtr) {
  let typeId = getTypeId(typeCtr);
  if (!typeId) {
    typeId = creatTypeId(typeCtr.name);
    typeCtr.prototype[TYPE_ID_KEY] = typeId;
  }
  return typeId;
}

function creatTypeId(ctrName) {
  return `${ctrName}-${+new Date}`;
}