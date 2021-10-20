// Drag & Drop Interface

interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
  dragOverHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
  dragLeaverHandler(event: DragEvent): void;
}

// Project Status type
enum ProjectStatus {
  Active,
  Finished,
}

// Project type

class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

// Listeners type

type Listener<T> = (items: T[]) => void;

// Global State

class State<T> {
  protected listeners: Listener<T>[] = [];

  addListeners(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

// Project State

class ProjectState extends State<Project> {
  private projects: Project[] = [];

  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) return this.instance;
    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, description: string, people: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      people,
      ProjectStatus.Active
    );
    this.projects.push(newProject);
    this.updateListeners();
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find((project) => project.id === projectId);
    project && project.status !== newStatus && (project.status = newStatus);
    project && this.updateListeners();
  }

  private updateListeners() {
    for (const listenerFn of this.listeners) {
      listenerFn([...this.projects]);
    }
  }
}

const projectState = ProjectState.getInstance();

// Validate

interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(validatable: Validatable): boolean {
  let isValid = true;

  validatable.required &&
    (isValid = isValid && validatable.value.toString().trim().length !== 0);

  validatable.minLength != null &&
    typeof validatable.value === "string" &&
    (isValid = isValid && validatable.value.length >= validatable.minLength);

  validatable.maxLength != null &&
    typeof validatable.value === "string" &&
    (isValid = isValid && validatable.value.length <= validatable.maxLength);

  validatable.min != null &&
    typeof validatable.value === "number" &&
    (isValid = isValid && validatable.value >= validatable.min);

  validatable.max != null &&
    typeof validatable.value === "number" &&
    (isValid = isValid && validatable.value <= validatable.max);

  return isValid;
}

// AutoBind Decorator

function AutoBind(
  _target: any,
  _properyName: string | Symbol,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

// Component Base Class

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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

// PrjectItem Class

class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable {
  private project: Project;

  get persons() {
    if (this.project.people === 1) return "1 Person";
    return `${this.project.people} Persons`;
  }

  constructor(hostId: string, project: Project) {
    super("single-project", hostId, false, project.id);
    this.project = project;

    this.configure();
    this.renderContent();
  }

  renderContent() {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = `${this.persons} assigned`;
    this.element.querySelector("p")!.textContent = this.project.description;
  }

  configure() {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }

  @AutoBind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData("text/plain", this.project.id);
    event.dataTransfer!.effectAllowed = "move";
  }

  @AutoBind
  dragEndHandler(_event: DragEvent) {}
}

// ProjectList Class

class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget {
  private assignedProjects: Project[];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);
    this.assignedProjects = [];
    this.renderContent();
    this.configure();
  }

  private rednerProjects() {
    const listEl = <HTMLUListElement>(
      document.getElementById(`${this.type}-projects-list`)
    );
    listEl.innerHTML = "";
    for (const projectItem of this.assignedProjects) {
      new ProjectItem(this.element.querySelector("ul")!.id, projectItem);
    }
  }

  protected renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
  }

  protected configure() {
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("dragleave", this.dragLeaverHandler);
    this.element.addEventListener("drop", this.dropHandler);

    projectState.addListeners((projects: Project[]) => {
      const relevantProjecta = projects.filter((project) => {
        if (this.type === "active")
          return project.status === ProjectStatus.Active;
        return project.status === ProjectStatus.Finished;
      });
      this.assignedProjects = relevantProjecta;
      this.rednerProjects();
    });
  }

  @AutoBind
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault();
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.add("droppable");
    }
  }

  @AutoBind
  dropHandler(event: DragEvent) {
    const projectId = event.dataTransfer!.getData("text/plain");
    projectState.moveProject(
      projectId,
      this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
    );
  }

  @AutoBind
  dragLeaverHandler(_event: DragEvent) {
    const listEl = this.element.querySelector("ul")!;
    listEl.classList.remove("droppable");
  }
}

// ProjectInput Class

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  private titleInputElement: HTMLInputElement;
  private descriptionInputElement: HTMLInputElement;
  private peopleInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");
    this.titleInputElement = <HTMLInputElement>(
      this.element.querySelector("#title")
    );
    this.descriptionInputElement = <HTMLInputElement>(
      this.element.querySelector("#description")
    );
    this.peopleInputElement = <HTMLInputElement>(
      this.element.querySelector("#people")
    );
    this.configure();
  }

  private gatherUserInput(): [string, string, number] | void {
    const title = this.titleInputElement.value;
    const description = this.descriptionInputElement.value;
    const people = this.peopleInputElement.value;
    const titleValidatable: Validatable = {
      value: title,
      required: true,
    };
    const descriptionValidatable: Validatable = {
      value: description,
      required: true,
      minLength: 5,
    };
    const peopleValidatable: Validatable = {
      value: +people,
      required: true,
      min: 1,
    };

    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    )
      alert("Invalid input, please try again!");
    else return [title, description, +people];
  }

  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  @AutoBind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      projectState.addProject(title, desc, people);
      this.clearInputs();
    }
  }

  protected configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }
  protected renderContent() {}
}

const projectInput = new ProjectInput();
const activeProjectList = new ProjectList("active");
const finishedProjectList = new ProjectList("finished");
