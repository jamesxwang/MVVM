class MVVM {
    constructor (options) {
        this.$el = options.el;
        this.$data = options.data;

        if (this.$el) {
            new Observer(this.$data);
            // proxying data to instances
            this.proxyData(this.$data);
            new Compiler(this.$el, this);
        }
    }

    proxyData(data) {
        Object.keys(data).forEach(key=>{
            Object.defineProperty(this,key,{
                get() {
                    return data[key];
                },
                set(newValue) {
                    data[key] = newValue;
                }
            })
        })
    }
}
