# mini MVVM
A mock-up MVVM similar to VUE

# How to use
Clone or download the repository
```bash
git clone https://github.com/cn-wx/MVVM.git
cd MVVM
```
Import the file
```html
<script src="dist/scripts/mvvm.min.js"></script>
```

and ... use it like this.
```html
<div id="app">
  <div class="input">
    vm.message.a: <input type="text" m-model="message.a">
  </div>
  <div class="output">
    <h1>{{message.a}}</h1>
  </div>
</div>

<script>
  let vm = new MVVM({
    el: '#app',
    data: {
      message: {
        a: 'Mini MVVM'
      }
    }
  });
</script>
```
