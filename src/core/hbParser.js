export const HBP = {};

/**
 * 한 Page를 구성한다면 Container 단위로 구분
 *
 * @example
 *      === Header ===
 *      === Body   ===
 *      === Footer ===
 *
 * 위와 같다면 3개의 Container가 존재하는 것이다.
 */
class HBPContainer {
  constructor() {
    /**
     * Container의 Root
     */
    this.containerRoot = null;

    /**
     * templates는 HTML에 data-template 속성이 있는 것.
     */
    this.template = {};
  }

  setRootContainer(q) {
    this.containerRoot = q;

    this.containerRoot.querySelectorAll("[data-template]").forEach((ele) => {
      //
    });
  }
}

HBP.Container = new HBPContainer();
