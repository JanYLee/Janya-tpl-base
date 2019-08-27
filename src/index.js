import './index.css';
import './index.less';

@log
class A {
  a = 1;
}

function log(target) {
  console.log(target);
}

const a = new A();
console.log(a.a);

// es7 check
console.log('es7 check:', 'aaa'.includes('a'));
