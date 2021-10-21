// Component Base Class
namespace App {
  export abstract class Component<
    T extends HTMLElement,
    U extends HTMLElement
  > {
    protected templateElement: HTMLTemplateElement;
    protected hostElement: T;
    protected element: U;

    protected constructor(
      templateId: string,
      hostElementId: string,
      insertAtStart: boolean,
      newElementId?: string
    ) {
      this.templateElement = <HTMLTemplateElement>(
        document.getElementById(templateId)
      );
      this.hostElement = <T>document.getElementById(hostElementId);
      const importedNode = document.importNode(
        this.templateElement.content,
        true
      );
      this.element = <U>importedNode.firstElementChild;
      newElementId && (this.element.id = newElementId);
      this.attach(insertAtStart);
    }

    private attach(insertAtStart: boolean) {
      this.hostElement.insertAdjacentElement(
        insertAtStart ? "afterbegin" : "beforeend",
        this.element
      );
    }

    protected abstract configure(): void;
    protected abstract renderContent(): void;
  }
}
