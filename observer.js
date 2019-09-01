class Observer {
    constructor(data) {
        this.observe(data);
    }
    observe(data) {
        if (!data || typeof data !== 'object') {
            return;
        }
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key]);
        });
    }
    defineReactive(obj, key, value) {
        let self = this;
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get() {
                return value;
            },
            set(newValue) {
                if (newValue != value) {
                    // observe if is an object
                    self.observe(newValue);
                    value = newValue;
                }
            }
        });
    }
}