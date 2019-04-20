function SliceableArray(array) {
  return new Proxy(
    array,
    {
      get: function (obj, prop) {
        var [from, to, step] = prop.split(':');
        if (to == undefined)
          return obj[from];
        return obj.slice(from || 0, to || undefined).filter((_, i) => i % (step || 1) == 0)
      }
    }
  );
}