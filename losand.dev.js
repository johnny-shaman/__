(() => {
  "use strict";

  let _ = function (v, re) {
    return Object.create(_.prototype, {
      "@": {
        configurable: true,
        writable: true,
        value: v
      },
      re: {
        configurable: true,
        writable: true,
        value: re
      },
      cached: {
        configurable: true,
        writable: true,
        value: undefined
      }
    });
  };

  Object.defineProperties(_.prototype, {
    by: {
      configurable: true,
      get () {
        return this.map(w => w.constructor);
      }
    },
    be: {
      configurable: true,
      value (f, ...v) {
        return f(this._, ...v) ? this : this.map(t => undefined);
      }
    },
    is: {
      configurable: true,
      value (t) {
        return this.be(v => _(v).by._ === t);
      }
    },
    isnt: {
      configurable: true,
      value (t) {
        return this.be(v => _(v).by._ !== t);
      }
    },
    "": {
      configurable: true,
      get () {
        return this["@"] === undefined || this["@"] === null;
      }
    },
    fullen: {
      configurable: true,
      get () {
        return !(this.vals._.includes(undefined) || this.vals._.includes(null));
      }
    },
    join: {
      configurable: true,
      get () {
        return this[""] ? this["@"] : this["@"].valueOf();
      }
    },
    _: {
      configurable: true,
      get () {
        return this.join;
      }
    },
    $: {
      configurable: true,
      value (f, ...v) {
        return this[""] ? this : this.map(f, ...v).re;
      }
    },
    $$: {
      configurable: true,
      value (f, ...v) {
        return this[""] ? this : this.fit(f, ...v).re;
      }
    },
    map: {
      configurable: true,
      value (f, ...v) {
        return this[""] ? this : _(f(this["@"], ...v), this);
      }
    },
    fit: {
      configurable: true,
      value (f, ...v) {
        return this[""] ? this : _(f(...v, this["@"]), this);
      }
    },
    bind: {
      configurable: true,
      value (f, ...v) {
        return this.map(f, ...v)._;
      }
    },
    link: {
      configurable: true,
      value (f, ...v) {
        return this.fit(f, ...v)._;
      }
    },
    keys: {
      configurable: true,
      get () {
        return this.map(Object.keys);
      }
    },
    vals: {
      configurable: true,
      get () {
        return this.map(Object.values);
      }
    },
    entries: {
      configurable: true,
      get () {
        return this.map(Object.entries);
      }
    },
    get: {
      configurable: true,
      value (...k) {
        return this.map(t => k.foldL((p, c) => _(p)[""] ? undefined : p[c], t));
      }
    },
    set: {
      configurable: true,
      value (v, ...k) {
        return this.$(
          t => _(k).map(l => l.pop()).bind(
            l => _(
              k.foldL(
                (p, c) => _(p[c])[""] ? _(p).draw({[c]: {}})._[c] : p[c], t
              )
            )
            .draw({[l]: v})
          )
        );
      }
    },
    been: {
      configurable: true,
      get () {
        return new Proxy(this, {
          get (t, k, r) {
            switch (k) {
              case "to": return t;
              case "_" : return t._;
              default: switch (t.get(k).by._) {
                case Function : return (...v) => t.$(w => w[k](...v)).been;
                default: return (v, ...l) => (l.unshift(k), t.set(v, ...l).been);
              }
            }
          }
        });
      }
    },
    draw: {
      configurable: true,
      value (...o) {
        return this.map(Object.assign, ...o);
      }
    },
    cast: {
      configurable: true,
      value (...o) {
        return this.fit(Object.assign, ...o);
      }
    },
    hold: {
      configurable: true,
      value (...v) {
        return this.bind(
          o => v.foldL(
            (p, c) => _(o[c])[""] ? p : p.draw({[c]: o[c]}), this.other()
          )
        );
      }
    },
    crop: {
      configurable: true,
      value (...v) {
        return this.hold(...this.keys._.filter(k => !v.includes(k)));
      }
    },
    pick: {
      configurable: true,
      value (o) {
        return this.bind(a => _(o).hold(...a));
      }
    },
    drop: {
      configurable: true,
      value (o) {
        return this.bind(a => _(o).crop(...a));
      }
    },
    valid: {
      configurable: true,
      get () {
        return this.hold(...this.keys._);
      }
    },
    turn: {
      configurable: true,
      get () {
        return this.keys.bind(
          a => a.foldL((p, c) => p.draw({[this["@"][c]]: c}), _({}))
        );
      }
    },
    relate: {
      configurable: true,
      value (o) {
        return this.$(t => _.pair.set(t, o).set(o, t));
      }
    },
    swap: {
      configurable: true,
      get () {
        return this.map(m => _.pair.get(m));
      }
    },
    define: {
      configurable: true,
      value (o = {}) {
        return this.map(Object.defineProperties, o);
      }
    },
    create: {
      configurable: true,
      value (o = {}) {
        return this.map(Object.create, o);
      }
    },
    other: {
      configurable: true,
      value (o = {}) {
        return this.map(m => Object.create(_(m).by.from._, o));
      }
    },
    depend: {
      configurable: true,
      value (o) {
        return this.bind(m => _(o).create().draw(m));
      }
    },
    give: {
      configurable: true,
      value (f) {
        return this.$(t => _(t).entries.$(i => i.forEach(([k, v]) => f(k, v))));
      }
    },
    list: {
      configurable: true,
      get () {
        return this.map(
          o => _(o.length)[""]
          ? _(o).draw({length: _(o).keys._.length}).list._
          : Array.from(o)
        );
      }
    },
    json: {
      configurable: true,
      get () {
        return JSON.stringify(this._);
      }
    },
    from: {
      configurable: true,
      get () {
        return this.bind(m => _(m.prototype || Object.getPrototypeOf(m)));
      }
    },
    affix: {
      configurable: true,
      value (o) {
        return this.$(m => _(m).from.draw(o));
      }
    },
    annex: {
      configurable: true,
      value (o) {
        return this.$(m => _(m).from.define(o));
      }
    },
    fork: {
      configurable: true,
      value (f) {
        return this.bind(
          m => _(f).draw({prototype: _(m).from.create({
            constructor: {
              configurable: true,
              writable: true,
              enumerable: false,
              value: f
            }
          }).draw(f.prototype)._})
        );
      }
    },
    hybrid: {
      configurable: true,
      value (o) {
        return this.bind(
          m => _(m).draw({prototype: _(m).from.from.create({
            constructor: {
              configurable: true,
              writable: true,
              enumerable: false,
              value: _(m).from.by._
            }
          }).draw(o, _(m).from._)._})
        );
      }
    },
    part: {
      configurable: true,
      value (...v) {
        return _(v).fullen
        ? this.map(f => f(...v))
        : (...vv) => this.part(...v.adaptL(...vv));
      }
    },
    done: {
      configurable: true,
      value (...v) {
        return this.cached === undefined
        ? _(this).draw({cached: this.map(f => f(...v))})._.cached
        : this.cached;
      }
    },
    redo: {
      configurable: true,
      value (...v) {
        return _(this).draw({cached: undefined})._.done(...v);
      }
    },
    apply: {
      configurable: true,
      value (...v) {
        return this.map(t => v.foldL((a, f) => f(a), t));
      }
    }
  });

  _(_).draw({
    pair: new Map(),
    version: "1.5.0",
    lib: "losand",
    get _ () {
      return void 0;
    }
  });

  _(Array).annex({
    each: {
      configurable: true,
      get () {
        return this.forEach;
      }
    },
    foldL: {
      configurable: true,
      get () {
        return this.reduce;
      }
    },
    foldR: {
      configurable: true,
      get () {
        return this.reduceRight;
      }
    },
    aMap: {
      configurable: true,
      value (a) {
        return Array.prototype.concat.call(
          [],
          ...(
            this.foldL((p, c) => c.constructor === Function || p, false)
            ? this
            : a
          )
        .map(
          f => (
            this.foldL((p, c) => c.constructor === Function || p, false)
            ? a.map(f)
            : this.map(f)
          )
        ));
      }
    },
    adaptL: {
      configurable: true,
      value (...a) {
        return this.map(v => !(v === undefined || v === null) ? v : a.shift());
      }
    },
    adaptR: {
      configurable: true,
      value (...a) {
        return this.adaptL(...a.reverse());
      }
    },
    adapt: {
      configurable: true,
      get () {
        return this.adaptL;
      }
    },
    adaptRight: {
      configurable: true,
      get () {
        return this.adaptR;
      }
    },
    flat: {
      configurable: true,
      get () {
        return this.foldL((a, v) => v instanceof Array ? Array.prototype.concat.call(a, v) : (a.push(v), a), []);
      }
    }
  });

  _(String).annex({
    json: {
      configurable: true,
      get () {
        try {
          return _(JSON.parse(this));
        } catch (e) {
          return _(this);
        }
      }
    }
  });

  _(Number).annex({
    _ : {
      configurable: true,
      value (n, s = 1) {
        return [...function* (v) {
          yield v;
          while (v + s <= n) {
            yield v += s;
          }
        }(this.valueOf())];
      }
    }
  });

  _(this).is(Object).$(() => _(_).annex({
    on: {
      configurable: true,
      value (d) {
        _(d).give(this["@"].on.bind(this["@"]));
        return this;
      }
    },
    once: {
      configurable: true,
      value (d) {
        _(d).give(this["@"].once.bind(this["@"]));
        return this;
      }
    }
  }));

  _(this).by._ === Object ? module.exports = _ : this._ = _;
})();
