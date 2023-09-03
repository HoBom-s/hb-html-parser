import jsdom from "jsdom";
import fs from "fs";
import { HTMLTemplate } from "./htmlTemplate";
import { HTMLCodeGenerator } from "./htmlCodeGenerator";

/**
 * 사실상 Main함수에서 돌아갈 최초 Entry point
 *      모든 HTML 속성을 HTMLTemplate Class로 Parsing을 진행한 후
 *      Array안에 해당 Class를 담아주도록 한다.
 *
 * @returns {HTMLTemplate[]}
 */
function pushAndParseTemplate() {
  const dom = new jsdom.JSDOM(fs.readFileSync("./templates/index.html"), {
    encoding: "utf8",
  });
  const root = dom.window.document.querySelector("#root");

  const templates = root.querySelectorAll("*[data-template]");

  const templateArray = [];

  for (const template of templates) {
    templateArray.push(toTemplate(template));
  }

  return templateArray;
}

/**
 * HTMLTemplate Class로 변경시켜주는 함수
 *
 * @param {Node} templateElem
 * @returns {HTMLTemplate}
 */
function toTemplate(templateElem) {
  const id = templateElem.getAttribute("data-template");
  const templateName = templateElem.getAttribute("data-template-name");

  // 최초 Template진입점. 즉 [data-template] 속성이 Root가 된다고 가정
  // 그 밑의 [data-group] [GROUP] 부터는 parseGroup 메소드 안의 classifyTemplate 함수가
  // 재귀 실행 되면서 모든 Node를 탐색하면서 HTMLTemplate Class로 만들어 줄 것이다.
  const template = new HTMLTemplate(id, templateName, templateElem);
  template.parse(templateElem);

  return template;
}

export function startWithTemplate() {
  const templates = pushAndParseTemplate();

  const codeGenerator = new HTMLCodeGenerator();

  for (const template of templates) {
    codeGenerator.convertTemplateToClass(template);
  }

  codeGenerator.stringToFile(
    `./templates/class/${templates[0].templateName}.js`
  );
}
