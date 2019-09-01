class Compile {
    constructor(el, vm) {
        this.el = this.isElementNode(el) ? el : document.querySelector(el);
        this.vm = vm;
        if (this.el) {
            let fragment = this.nodeToFragment(this.el);
            this.compile(fragment);
            this.el.appendChild(fragment);
        }
    }

    isElementNode(node) {
        return node.nodeType === 1;
    }

    compile(fragment) {
        let childNodes = fragment.childNodes;
        Array.from(childNodes).forEach(node => {
            if (this.isElementNode(node)) {
                this.compileElement(node);
                this.compile(node);
            } else {
                this.compileText(node);
            }
        });
    }

    /**
     * Element with v-model / v-text / v-html etc.
     * @param {*} node 
     */
    compileElement(node) {
        let attrs = node.attributes;
        Array.from(attrs).forEach(attr => {
            let attrName = attr.name;
            if (this.isDirective(attrName)) {
                let expr = attr.value;
                let [, type] = attrName.split('-');
                CompileUtil[type](node, this.vm, expr);
            }
        });
    }

    /**
     * Element with {{ }}
     * @param {*} node 
     */
    compileText(node) {
        let expr = node.textContent;
        let reg = /\{\{([^}]+)\}\}/g;
        if (reg.test(expr)) {
            CompileUtil['text'](node, this.vm, expr);
        }
    }

    isDirective(name) {
        return name.includes('v-');
    }

    nodeToFragment(el) {
        let fragment = document.createDocumentFragment();
        let firstChild;
        while (firstChild = el.firstChild) {
            fragment.appendChild(firstChild);
        }
        return fragment;
    }
}

CompileUtil = {
    getVal(vm, expr) {
        expr = expr.split('.');
        return expr.reduce((prev, next) => {
            return prev[next];
        }, vm.$data);
    },
    getTextVal(vm, expr) {
        return expr.replace(/\{\{([^}]+)\}\}/g, (...arguments) => {
            return this.getVal(vm, arguments[1]);
        });
    },
    text(node, vm, expr) {
        let updateFn = this.updater['textUpdater'];
        let value = this.getTextVal(vm, expr);
        updateFn && updateFn(node, value);
    },
    model(node, vm, expr) {
        let updateFn = this.updater['modelUpdater'];
        updateFn && updateFn(node, this.getVal(vm, expr));
    },
    updater: {
        textUpdater(node, value) {
            node.textContent = value;
        },
        modelUpdater(node, value) {
            node.value = value;
        }
    }
}