import fs from "fs";

const DEFAULT_INDENT = 2;

/**
 * HTML을 Parsing한 것들을 Code로 변환시켜 주는 Class 정의
 *    JavaScript코드를 String Array로 묶은 다음 File로 변환
 */
export class HTMLCodeGenerator {
  constructor() {
    // Code string array
    this.codeLineArray = [];

    this.currentIndentDepth = 0;
  }

  /**
   * CodeLineArray에 담긴 값들을 string으로 변환해서 반환
   *    문자 끝 기준: [\n]
   *
   * @returns {string}
   */
  codeToString() {
    return this.codeLineArray.join("\n");
  }

  /**
   * CodeLineArray를 string으로 바꾼 값을 받은 후 파일로 변환
   *
   * @param {string} path
   * @returns {void}
   */
  stringToFile(path) {
    const contents = this.codeToString();

    if (fs.existsSync(path) && fs.readFileSync(path).toString() === contents) {
      console.log("Already exist or same contents.");
      return;
    }

    fs.writeFileSync(path, contents, { encoding: "utf8" });
  }

  /**
   * CodeLine 삽입
   *
   * @param {string} codeLine
   * @returns {void}
   */
  appendCodeLine(codeLine) {
    const space = " ";

    // 현재 Code의 Indent만큼 띄어쓰기 삽입
    const appendedCodeLine =
      space.repeat(DEFAULT_INDENT * this.currentIndentDepth) + codeLine;

    this.codeLineArray.push(appendedCodeLine);
  }

  appendWithBracket(first, last, cb) {
    // { 찍고 Code Indent 삽입
    this.appendCodeLine(first);
    this.currentIndentDepth++;

    cb();

    // } 찍고 Code Indent 복구
    this.currentIndentDepth--;
    this.appendCodeLine(last);
  }

  /**
   * HTML에서 정의한 것을 토대로 Class로 변환해주는 함수
   *
   * @param {HTMLTemplate} template
   */
  convertTemplateToClass(template) {
    const { groups, lists, items } = template;

    // [Template] class 선언부
    this.appendCodeLine(`class ${template.templateName}Parser`);

    // class 내부 정의
    this.appendWithBracket("{", "}", () => {
      // 생성자 선언
      this.appendCodeLine(`constructor()`);

      // 생성자 내부 정의
      this.appendWithBracket("{", "}", () => {
        // 생성자 내 property 정의
        this.appendCodeLine(`this.templateId = '${template.id}';`);
        this.appendCodeLine(`this.templateName = '${template.templateName}';`);
        this.appendCodeLine(
          `this.templateNode = ${template.node.constructor.name};`
        );
      });
    });

    this.appendCodeLine("");

    // [Group] class 선언부
    for (const group of groups) {
      this.appendCodeLine(`class ${group.templateName}Parser`);

      this.appendWithBracket("{", "}", () => {
        this.appendCodeLine(`constructor()`);

        this.appendWithBracket("{", "}", () => {
          this.appendCodeLine(`this.templateId = '${group.id}';`);
          this.appendCodeLine(`this.templateName = ${group.templateName};`);
          this.appendCodeLine(
            `this.templateNode = ${group.node.constructor.name}`
          );
        });
      });
    }

    this.appendCodeLine("");

    // [List] class 선언부
    for (const list of lists) {
      this.appendCodeLine(`class ${list.templateName}Parser`);

      this.appendWithBracket("{", "}", () => {
        this.appendCodeLine(`constructor()`);

        this.appendWithBracket("{", "}", () => {
          this.appendCodeLine(`this.templateId = '${list.id}'`);
          this.appendCodeLine(`this.templateName = ${list.templateName}`);
          this.appendCodeLine(
            `this.templateNode = ${list.node.constructor.name}`
          );
        });
      });
    }

    this.appendCodeLine("");

    // [Item] class 선언부
    for (const item of items) {
      this.appendCodeLine(`class ${item.templateName}Parser`);

      this.appendWithBracket("{", "}", () => {
        this.appendCodeLine(`constructor()`);

        this.appendWithBracket("{", "}", () => {
          this.appendCodeLine(`this.templateId = '${item.id}'`);
          this.appendCodeLine(`this.templateName = ${item.templateName}`);
          this.appendCodeLine(
            `this.templateNode = ${item.node.constructor.name}`
          );
        });
      });
    }
  }
}
