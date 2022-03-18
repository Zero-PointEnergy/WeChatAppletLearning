// index.js

// 使用 css var 变量,使 js 可以动态设置 css 样式属性
let mathOpsBefore = `
  font-size: 4rem;
  color: #000;
`

let mathOpsAfter = `
  font-size: 2rem;
  color: #b4b4b4;
`

let resultBefore = `
  font-size: 2rem;
  color: #b4b4b4;
`

let resultAfter = `
  font-size: 4rem;
  color: #000;
`

Page({
  /**
   * 页面的初始数据
   */
  data: {
    baseButtons: [
      ["7", "8", "9"],
      ["4", "5", "6"],
      ["1", "2", "3"],
      ["⌞‍⌝️", "0", "."]
    ],
    extraOpsButtons: ["AC", "⌫", "%"],
    eleAriOpsButtons: ["÷", "×", "-", "+"],
    equalButton: ["="],
    mathOps: '',
    result: '',
    opsResStyle: {
      mathOp: mathOpsBefore,
      results: resultBefore,
    }
  },

  // contentDetermination(dataContent) {
  //   console.log("contentDetermination received:" + dataContent);
  //   let that = this;
  // },

  // calculatorCore(foo, bar, ops) {
  //   console.log("calculatorCore received:" + foo + "," + bar + "," + ops);
  //   let that = this;
  //   let result = 0;
  //   switch (ops) {
  //     case '+':
  //       result = foo + bar;
  //       break;
  //     case '-':
  //       result = foo - bar;
  //       break;
  //     case '×':
  //       result = foo * bar;
  //       break;
  //     case '÷':
  //       result = (foo * 1.0) / bar;
  //       break;
  //     default:
  //       break;
  //   };
  //   that.setData({
  //     result: result
  //   });
  //   that.btnClick.isUse = 0;
  // },

  // covert midfix string to postfix string and calculate the result

  getPriorities(operator) {
    let priority = 0;
    if (operator == '×' || operator == '÷')
      priority = 2;
    if (operator == '+' || operator == '-')
      priority = 1;
    return priority;
  },

  infixToSuffix(infix) {
    let stack = [];
    let postfix = '';
    for (let i = 0; i < infix.length; i++) {
      let c = infix[i];
      if (c == '+' || c == '-' || c == '×' || c == '÷') {
        while (stack.length > 0 && this.getPriorities(c) <= this.getPriorities(stack[stack.length - 1])) {
          postfix += stack.pop();
        }
        stack.push(c);
      } else {
        postfix += c;
      }
    }
    while (stack.length > 0) {
      postfix += stack.pop();
    }
    return postfix;
  },

  calculatorCore(list) {
    let stack = [];
    for (let item of list) {
      if (item.match(/\d+/)) {
        console.log("item is number:" + item);
        stack.push(item);
      } else {
        let secondNum = parseInt(stack.pop());
        let fristNum = parseInt(stack.pop());
        let res = 0;
        if (item === '+') {
          res = fristNum + secondNum
        } else if (item === '-') {
          res = fristNum - secondNum
        } else if (item === '×') {
          console.log("fristNum:" + fristNum + " secondNum:" + secondNum);
          res = fristNum * secondNum
        } else if (item === '÷') {
          res = (fristNum * 1.0) / secondNum
        } else if (item === '%') {
          console.log("fristNum:" + fristNum + "," + "secondNum: " + secondNum);
          res = (fristNum == null || fristNum == undefined || fristNum == '' || !fristNum || fristNum.length == 0) ? secondNum * 0.01 : (fristNum + (secondNum * 0.01))
          console.log("res:" + res);
        } else {
          throw new Error('运算符有误')
        }
        stack.push(res + '')
        if (item === '%') break;
      }
    }
    console.log("stack:" + stack);
    return stack.pop()
  },

  btnClick(btnContent) {
    let btnVal = btnContent.currentTarget.dataset.btnval;
    let that = this;

    switch (btnVal) {
      case 'AC': {
        that.setData({
          mathOps: "",
          result: "",
          opsResStyle: {
            mathOp: mathOpsBefore,
            results: resultBefore,
          }
        });
      }; break;
      case '⌫': {
        that.setData({
          mathOps: that.data.mathOps.slice(0, -1),
        });
        if (that.data.mathOps.length == 0) {
          that.setData({
            result: ""
          })
        }
      }; break;
      case '⌞‍⌝️': ; break;
      case '=': {
        that.setData({
          opsResStyle: {
            mathOp: mathOpsAfter,
            results: resultAfter,
          }
        })
      }; break;
      default: {
        that.setData({
          mathOps: that.data.mathOps + btnVal,
        });
        console.log("mathOps: " + that.data.mathOps);

        let postfix = this.infixToSuffix(that.data.mathOps);
        console.log("postfix: " + postfix);
        let rs = this.calculatorCore(postfix);
        console.log("result:" + rs);
        that.setData({
          result: rs
        })
      }; break;
    }

  }



  // ------- end -------

  // btnClick(btnContent) {
  //   console.log(btnContent);
  //   let btnVal = btnContent.currentTarget.dataset.btnval;
  //   let that = this;
  //   let isExecution = false;    // 是否执行运算
  //   let foo = '';   // 运算数 1
  //   let bar = '';   // 运算数 2
  //   let isUse = 0;  // 是否使用过运算符
  //   this.contentDetermination(btnVal);

  //   switch (btnVal) {
  //     case 'AC': {
  //       that.setData({
  //         mathOps: "",
  //         result: "",
  //         opsResStyle: {
  //           mathOp: mathOpsBefore,
  //           results: resultBefore,
  //         },
  //         isUse : 0,
  //       });
  //     }; break;
  //     case '⌫': {
  //       that.setData({
  //         mathOps: that.data.mathOps.slice(0, -1),
  //       });
  //       if (that.data.mathOps.length == 0) {
  //         that.setData({
  //           result: ""
  //         })
  //       }
  //     }; break;
  //     case '%': {
  //       isExecution = true
  //     }; break;
  //     case '÷': {
  //       isExecution = true
  //     }; break;
  //     case '×': {
  //       isExecution = true
  //     }; break;
  //     case '-': {
  //       isExecution = true
  //     }; break;
  //     case '+': {
  //       isExecution = true
  //       if (!isUse && bar == '') {
  //         foo = that.data.mathOps;
  //         console.log("foo:" + foo);
  //       }
  //       if (bar != '') {
  //         isUse = 0;

  //       }
  //       that.setData({
  //         mathOps: that.data.mathOps + btnVal,
  //       })
  //       isUse = 1;
  //     }; break;
  //     case '=': {
  //       that.setData({
  //         opsResStyle: {
  //           mathOp: mathOpsAfter,
  //           results: resultAfter,
  //         }
  //       })
  //     }; break;
  //     case '.': ; break;
  //     case '⌞‍⌝️': ; break;
  //     default: {
  //       isExecution = false;
  //       that.setData({
  //         mathOps: that.data.mathOps + btnVal,
  //       });
  //       if (isUse == 1)
  //         bar = bar + btnVal;
  //       console.log("bar:" + bar);
  //     }; break;
  //   };
  //   if (that.data.mathOps.length > 0 && isExecution) {
  //     calculatorCore(foo, bar, btnVal);
  //     foo = that.data.result;
  //   }
  // }
})