(this["webpackJsonp@example/uiw"]=this["webpackJsonp@example/uiw"]||[]).push([[123],{1333:function(n,e,o){"use strict";o.r(e),e.default="PinCode \u5b89\u5168\u7801\n===\n\n\u9488\u5bf9\u8f93\u5165\u6570\u5b57\u5e8f\u5217\u8fdb\u884c\u4e86\u4f18\u5316\u3002\u6700\u5e38\u89c1\u7684\u5e94\u7528\u662f\u8f93\u5165\u4e00\u6b21\u6027\u5b89\u5168\u7801\u3002\u5b83\u7ecf\u8fc7\u4f18\u5316\uff0c\u53ef\u5feb\u901f\u8f93\u5165\u6570\u5b57\u3002\n\n```jsx\nimport { PinCode } from 'uiw';\n// or\nimport PinCode from '@uiw/react-pin-code';\n```\n\n### \u57fa\u7840\u7528\u6cd5\n\n\x3c!--DemoStart,bgWhite,codePen,codeSandbox--\x3e\n```jsx\nimport ReactDOM from 'react-dom';\nimport { PinCode } from 'uiw';\n\nconst Demo = () => (\n  <div>\n    <PinCode autoFocus value={['', '', '', '', '']} onChange={(val) => console.log(val)} />\n  </div>\n);\nReactDOM.render(<Demo />, _mount_);\n```\n\x3c!--End--\x3e\n\n### \u5728\u8868\u5355\u4e2d\u4f7f\u7528\n\n\u5728 [`<Form />`](#/components/form) \u8868\u5355\u4e2d\u5e94\u7528 [`<PinCode />`](#/components/pin-code) \u7ec4\u4ef6\n\n\x3c!--DemoStart,bgWhite,codePen,codeSandbox--\x3e\n```jsx\nimport ReactDOM from 'react-dom';\nimport { Form, Row, Col, Icon, PinCode, Button, Notify } from 'uiw';\n\nconst Demo = () => (\n  <div>\n    <Form\n      resetOnSubmit={false}\n      onSubmitError={(error) => {\n        if (error.filed) {\n          return { ...error.filed };\n        }\n        return null;\n      }}\n      onSubmit={({initial, current}) => {\n        const errorObj = {};\n        if (current.pinCode.join('').length === 0) {\n          errorObj.pinCode = '\u8bf7\u8f93\u5165\u5b89\u5168\u7801\uff01';\n        }\n        if (current.pinCode.join('').length < 5) {\n          errorObj.pinCode = '\u5b89\u5168\u7801\u6ca1\u6709\u8f93\u5165\u5b8c\u6574\uff01';\n        }\n        if(Object.keys(errorObj).length > 0) {\n          const err = new Error();\n          err.filed = errorObj;\n          Notify.error({ title: '\u63d0\u4ea4\u5931\u8d25\uff01', description: '\u8bf7\u786e\u8ba4\u63d0\u4ea4\u8868\u5355\u662f\u5426\u6b63\u786e\uff01' });\n          throw err;\n        }\n        Notify.success({\n          title: '\u63d0\u4ea4\u6210\u529f\uff01',\n          description: `\u8868\u5355\u63d0\u4ea4\u6210\u529f\uff0c\u5b89\u5168\u7801\u4e3a\uff1a${current.pinCode.join('')}\uff01`,\n        });\n      }}\n      fields={{\n        pinCode: {\n          initialValue: ['', '', '', '', ''],\n          children: <PinCode />\n        },\n      }}\n    >\n      {({ fields, state, canSubmit }) => {\n        console.log('state:',state.current.pinCode.join(''))\n        return (\n          <div>\n            <Row>\n              <Col fixed>{fields.pinCode}</Col>\n            </Row>\n            <Row>\n              <Col fixed>\n                <Button size=\"small\" disabled={!canSubmit()} type=\"primary\" htmlType=\"submit\">\u63d0\u4ea4</Button>\n                <span style={{ paddingLeft: 16, color: '#a7a7a7', verticalAlign: 'middle' }}>\n                  {state.current.pinCode.join('')}\n                </span>\n              </Col>\n            </Row>\n            <Row>\n              <Col>\n                <pre style={{ padding: 10, marginTop: 10 }}>\n                  {JSON.stringify(state.current, null, 2)}\n                </pre>\n              </Col>\n            </Row>\n          </div>\n        )\n      }}\n    </Form>\n  </div>\n)\nReactDOM.render(<Demo />, _mount_);\n```\n\x3c!--End--\x3e\n\n### \u66f4\u6539\u5360\u4f4d\u7b26\n\n\x3c!--DemoStart,bgWhite,codePen,codeSandbox--\x3e\n```jsx\nimport ReactDOM from 'react-dom';\nimport { PinCode, Divider } from 'uiw';\n\nconst Demo = () => (\n  <div>\n    <PinCode placeholder=\"\u25a0\" value={['8', '7', '3', '', '']} onChange={(val) => console.log(val)} />\n    <Divider />\n    <PinCode placeholder=\"\u2605\" value={['6', '', '', '', '']} onChange={(val) => console.log(val)} />\n    <Divider />\n    <PinCode placeholder=\"\ud83e\udd23\" value={['', '', '', '', '']} onChange={(val) => console.log(val)} />\n  </div>\n);\nReactDOM.render(<Demo />, _mount_);\n```\n\x3c!--End--\x3e\n\n### \u8f93\u5165\u6846\u88ab\u7981\u7528\n\n\x3c!--DemoStart,bgWhite,codePen,codeSandbox--\x3e\n```jsx\nimport ReactDOM from 'react-dom';\nimport { PinCode, Divider } from 'uiw';\n\nconst Demo = () => (\n  <div>\n    <PinCode disabled value={['1', '9', '8', '7', '0']} />\n    <Divider />\n    <PinCode disabled value={['', '', '', '', '']} />\n    <Divider />\n    <PinCode disabled placeholder=\"\ud83e\udd23\" value={['', '', '', '', '']} />\n  </div>\n);\nReactDOM.render(<Demo />, _mount_);\n```\n\x3c!--End--\x3e\n\n### \u5c3a\u5bf8\u5927\u5c0f\n\n\x3c!--DemoStart,bgWhite,codePen,codeSandbox--\x3e\n```jsx\nimport ReactDOM from 'react-dom';\nimport { PinCode, Divider } from 'uiw';\n\nconst Demo = () => (\n  <div>\n    <PinCode size=\"large\" value={['1', '9', '8', '7', '0']} />\n    <Divider />\n    <PinCode value={['', '', '', '', '']} />\n    <Divider />\n    <PinCode size=\"small\" value={['', '', '', '', '']} />\n  </div>\n);\nReactDOM.render(<Demo />, _mount_);\n```\n\x3c!--End--\x3e\n\n## PinCode\n\n| \u53c2\u6570 | \u8bf4\u660e | \u7c7b\u578b | \u9ed8\u8ba4\u503c |\n|--------- |-------- |--------- |-------- |\n| value | \u7ed1\u5b9a\u503c\uff0c\u6839\u636e\u6570\u7ec4\u957f\u5ea6\uff0c\u5c55\u793a\u5b89\u5168\u7801\u7684\u957f\u5ea6 | string[] | - |\n| disabled | \u7981\u7528\u8f93\u5165\u6846 | Boolean | `false` |\n| autoFocus | \u81ea\u52a8\u83b7\u5f97\u7126\u70b9\u3002 | Boolean | - |\n| placeholder | \u5360\u4f4d\u7b26 | string | `\u25cb` |\n| size | \u6307\u5b9a\u8f93\u5165\u6846\u7684\u5c3a\u5bf8\uff0c\u9664\u4e86\u9ed8\u8ba4\u7684\u5927\u5c0f\u5916\uff0c\u8fd8\u63d0\u4f9b\u4e86 `large`\u3001`small` \u548c `default` \u4e09\u79cd\u5c3a\u5bf8\u3002 | String | - |\n| onChange | `value` \u53d8\u5316\u65f6\u56de\u8c03\u51fd\u6570 | Function(value: string[]) | - |\n| onBlur | \u5931\u53bb\u7126\u70b9\u65f6\u8fd0\u884c | Function(event: React.FocusEvent<HTMLInputElement\\>) | - |\n| onFocus | \u83b7\u5f97\u7126\u70b9\u65f6\u8fd0\u884c | Function(event: React.FocusEvent<HTMLInputElement\\>) | - |"}}]);
//# sourceMappingURL=123.d20a8bf1.chunk.js.map