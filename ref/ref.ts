export class Ref<T> {
  static IDEF = '-W--asdhui,hasdjk iod';
  get idef() { return Ref.IDEF; }
  private ref: Ref<T> | T;

  constructor(data: T) {
      this.ref = data;
  }

  static create<TT>(data: TT): Ref<TT>;
  static create<TT>(data: Ref<TT>): Ref<Ref<TT>>;
  static create<TT>(data: TT | Ref<TT>) {
      return new Ref(data);
  }

  deRef(): Ref<T> | T {
      return this.ref;
  }

  deRefAll(): T {
      let that: Ref<T> | T  = this;
      while ((that as Ref<T>).idef == Ref.IDEF)
          that = (that as Ref<T>).deRef();
      return that as T;
  }
}

declare global {
  interface Object {
    indirectRef<T>(this: T): Ref<T>;
  }
}
Object.prototype.indirectRef = function() { return Ref.create(this); }
