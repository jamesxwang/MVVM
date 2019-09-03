class Dep {
    constructor() {
        this.subscribe = [];
    }
    addSubscribe(watcher) {
        this.subscribe.push(watcher);
    }
    notify() {
        this.subscribe.forEach(watcher => watcher.update());
    }
}