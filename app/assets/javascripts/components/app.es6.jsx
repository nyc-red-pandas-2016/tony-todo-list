class App extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      tasks: [],
      tasksLoaded: false,
      categoryID: 0,
      csrf: ""
    };
    this.updateTasks = this.updateTasks.bind(this);
    this.updateCategories = this.updateCategories.bind(this);
    this.updateCategoryID = this.updateCategoryID.bind(this);
    this.addTask = this.addTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.deleteCategoryFromPage = this.deleteCategoryFromPage.bind(this);
    this.csrfSetter = this.csrfSetter.bind(this)
  }

  componentDidMount() {
    fetch('/categories')
    .then((response) => response.json())
    .then((json) => {
      this.setState({categories: json})
    });

    this.csrfSetter();
  }

  csrfSetter() {
    let metaTags = document.getElementsByTagName('meta');
    for (var i = 0; i < metaTags.length; i++) {
      if (metaTags[i].name === 'csrf-token') {
        this.setState({
          csrf: metaTags[i].content
        })
      }
    }
  }

  updateTasks(response) {
    this.setState({
      tasks: response, tasksLoaded: true
    })
  }

  addTask(response) {
    this.setState({
      tasks: this.state.tasks.concat([response])
    })
  }

  updateCategories(category) {
    this.setState({
      categories: this.state.categories.concat([category])
    })
  }

  updateCategoryID(id) {
    this.setState({
      categoryID: id
    })
  }

  removeTask(response) {
    let idArray = this.state.tasks.map((task) => {return task.id});
    let indexOfResponse = idArray.indexOf(response.id);
    let newTaskState = this.state.tasks
    newTaskState.splice(indexOfResponse, 1);
    this.setState({
      tasks: newTaskState
    })
  }

  deleteCategoryFromPage(response) {
    let idArray = this.state.categories.map((category) => {
      return category.id;
    })
    let indexOfResponse = idArray.indexOf(response.id);
    let newCategoryState = this.state.categories;
    newCategoryState.splice(indexOfResponse, 1);
    this.setState({
      categories: newCategoryState
    })
  }

  deleteCategory() {
    fetch(`/categories/${this.state.categoryID}`, {
      method: "delete",
      dataType: "JSON",
      headers: { "X-CSRF-Token": this.state.csrf, "Accept": "application/json", "Content-Type": "application/json" },
      credentials: "include"
    })
    .then((response) => response.json())
    .then((json) => {
      this.deleteCategoryFromPage(json);
      this.setState({
        tasksLoaded: false
      });
    })
  }

  render() {
    return (
      <div className="app">    
        <div className="head">
          <h1>To-Do Lists</h1>
          < CategoryList updateTasks={this.updateTasks} categories={this.state.categories} updateCategoryID = {this.updateCategoryID} />
          < AddCategoryForm updateCategories={this.updateCategories} csrf={this.state.csrf}/>
        </div>
        { this.state.tasksLoaded ?
          <div className="task-list-holder">
            <TaskList tasks={this.state.tasks} removeTask={this.removeTask} csrf={this.state.csrf} categoryID={this.state.categoryID} />
            <AddTaskForm csrf={this.state.csrf} categoryID={this.state.categoryID} addTask={this.addTask} />
            <section className="center">
              <button id="delete-category" onClick={this.deleteCategory}>Delete This Category </button>
            </section>
          </div> 
        : 
          null
        }
      </div>
    );
  }
}