/**
 * HTMLTemplate Class를 기반으로 HTML속성을 Parsing할 것
 *      해당 Class 기준으로 작성
 *
 * 해당 Class를 활용하여 HTML 속성을 Controll하는 것이 주 목적
 *
 * [GROUP] 안에 [LIST] 안에 [ITEM]
 * GROUP의 최상위는 [TEMPLATE]
 */
export class HTMLTemplate {
  constructor(id, templateName, elem) {
    // HTML Template ID
    // data-template="TEMPLATE"
    this.id = id;

    // HTML Template Name
    // data-template-name="TEMPLATE-01"
    this.templateName = templateName;

    // HTML Node Element
    this.node = elem;

    // ====== TEMPLATE의 하위 GROUP들 ======
    // data-group="GROUP"
    if (this.id === "TEMPLATE") {
      this.groups = [];

      // data-list="LIST"
      this.lists = [];

      // data-item="ITEM"
      this.items = [];
    }
  }

  /**
   * Node및 ChildrenNode를 순회하면서 HTMLTemplate Class로 Parsing
   *        최하단에 존재하는 ChildrenNode까지 순환 탐색 진행
   *
   * @param {Node} templateElem
   * @returns {void}
   */
  parse(templateElem) {
    // Child Node가 없다면 진행하지 않음
    if (!templateElem.hasChildNodes()) {
      return;
    }

    for (const childNode of templateElem.children) {
      this.classifyTemplate(childNode);
    }
  }

  /**
   * 실질적으로 탐색이 진행되는 함수
   * HTML의 속성을 읽어온 후 [GROUP], [LIST], [ITEM]을 Parsing 한다.
   *
   * @param {Node} templateElem
   * @returns {void}
   */
  classifyTemplate(templateElem) {
    // 자식노드가 없다면 더 이상 탐색하지 않음
    // 자식노드가 없다면 해당 Node는 [ITEM]이므로
    // 마지막 ITEM을 넣어 준 후 재귀 종료
    if (!templateElem.hasChildNodes()) {
      const itemId = templateElem.getAttribute("data-item");
      const itemTemplateName = templateElem.getAttribute("data-template-name");
      const item = new HTMLTemplate(itemId, itemTemplateName, templateElem);

      this.items.push(item);
      return;
    }

    // 자식노드가 있다면 [GROUP] or [LIST]일 것으로 예상
    const groupId = templateElem.getAttribute("data-group");
    const listId = templateElem.getAttribute("data-list");

    if (groupId) {
      const groupTemplateName = templateElem.getAttribute("data-template-name");
      const group = new HTMLTemplate(groupId, groupTemplateName, templateElem);

      this.groups.push(group);
    } else if (listId) {
      const listTemplateName = templateElem.getAttribute("data-template-name");
      const list = new HTMLTemplate(listId, listTemplateName, templateElem);

      this.lists.push(list);
    }

    for (const childNode of templateElem.children) {
      this.classifyTemplate(childNode);
    }
  }
}
