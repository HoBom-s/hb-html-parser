import fs from "fs";

/**
 * HTML을 Parsing한 것들을 Code로 변환시켜 주는 Class 정의
 *    JavaScript코드를 String Array로 묶은 다음 File로 변환
 */
export class HTMLCodeGenerator {
  constructor() {
    // Code string array
    this.codeLineArray = [];
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

    if (fs.existsSync(path)) {
      console.log("Already exist path");
      return;
    }

    if (fs.readFileSync(path).toString() === contents) {
      console.log("Same contents");
      return;
    }

    fs.writeFileSync(path, contents);
  }
}
