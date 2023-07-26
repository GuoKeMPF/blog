"use strict";

// Disposable Mixin
class Disposable {
  constructor() {
    this.isDisposed = false;
  }
  dispose() {
    this.isDisposed = true;
  }
}

// Activatable Mixin
class Activatable {
  constructor() {
    this.isActive = false;
  }
  activate() {
    this.isActive = true;
  }
  deactivate() {
    this.isActive = false;
  }
}
class SmartObject {
  constructor() {
    this.isDisposed = false;
    this.isActive = false;
  }
  dispose() {
    this.isDisposed = true;
  }
  activate() {
    this.isActive = true;
  }
  deactivate() {
    this.isActive = false;
  }
}