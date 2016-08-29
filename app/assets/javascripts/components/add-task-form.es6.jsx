class AddTaskForm extends React.Component {
  constructor() {
    super();
    this.submitTask = this.submitTask.bind(this);
  }

  submitTask(e) {
    e.preventDefault();
    let inputField = this.refs.taskInput
    var data = { description: inputField.value}
    fetch(`/categories/${this.props.categoryID}/tasks`, {
        method: "post",
        dataType: "JSON",
        headers: { "X-CSRF-Token": this.props.csrf, "Accept": "application/json", "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data)
      })
    .then((response) => response.json())
    .then((json) => {
      this.props.addTask(json);
      inputField.value = "";
    })
  }

  render() {
    return (
      <form onSubmit={this.submitTask} >
        <input type="hidden" name="category_id" value={this.props.categoryID} />
        <input ref="taskInput" className="form-field" type="text" />
        <input className="form-field" id="add-task" type="submit" value="Add Task" />
      </form>
    )
  }
}