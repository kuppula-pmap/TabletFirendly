export default function() {
  function initPush(arrayName, obj, toPush) {
    if (obj[arrayName] === undefined) {
      obj[arrayName] = [];
    }
    obj[arrayName].push(toPush);
  }

  function multiInitPush(arrayName, obj, toPushArray) {
    let len;
    len = toPushArray.length;
    if (obj[arrayName] === undefined) {
      obj[arrayName] = [];
    }
    while (len-- > 0) {
      obj[arrayName].push(toPushArray.shift());
    }
  }

  /**
   * Create a new FlatToNested object.
   *
   * @constructor
   * @param {object} config The configuration object.
   */
  function FlatToNested(config) {
    this.config = config = config || {};
    this.config.id = config.id || 'Id';
    this.config.parent = config.parent || 'ParentId';
    this.config.children = config.children || 'Children';
  }

  /**
   * Convert a hierarchy from flat to nested representation.
   *
   * @param {array} flat The array with the hierachy flat representation.
   */
  FlatToNested.prototype.convert = (flat) => {
    // console.log(this.config);
    // console.log(flat);
    let i, len, temp, roots, id, parent, nested, pendingChildOf, flatEl;
    i = 0;
    roots = [];
    temp = {};
    pendingChildOf = {};

    for (i, len = flat.length; i < len; i++) {
      flatEl = flat[i];
      id = flatEl.Id;
      parent = flatEl.ParentId;
      temp[id] = flatEl;
      if (parent === undefined || parent === null || parent === id) {
        // Current object has no parent, so it's a root element.
        roots.push(flatEl);
      } else {
        if (temp[parent] !== undefined) {
          // Parent is already in temp, adding the current object to its children array.
          initPush('Children', temp[parent], flatEl);
        } else {
          // Parent for this object is not yet in temp, adding it to pendingChildOf.
          initPush(parent, pendingChildOf, flatEl);
        }
        delete flatEl.ParentId;
      }
      if (pendingChildOf[id] !== undefined) {
        // Current object has children pending for it. Adding these to the object.
        multiInitPush('Children', flatEl, pendingChildOf[id]);
      }
    }

    if (roots.length === 1) {
      nested = roots[0];
    } else if (roots.length > 1) {
      nested = {};
      nested.Children = roots;
    } else {
      nested = {};
    }
    return nested;
  };

  return FlatToNested;
}
