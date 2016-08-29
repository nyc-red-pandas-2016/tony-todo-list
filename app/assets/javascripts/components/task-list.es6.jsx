class TaskList extends React.Component {
  constructor() {
    super();
    this.deleteTask = this.deleteTask.bind(this);
  }

  deleteTask(e) {
    fetch(`/categories/${this.props.categoryID}/tasks/${e.target.id}`, {
      method: "delete",
      dataType: "JSON",
      headers: { "X-CSRF-Token": this.props.csrf , "Accept": "application/json", "Content-Type": "application/json" },
      credentials: "include"
    })
    .then((response) => response.json())
    .then((json) => {
      this.props.removeTask(json);
    })
  }

  render() {
    return (
      <div>
        { this.props.tasks.length === 0 ?
          <h2>No Tasks in This List!</h2>
        :
          <section>
            <h2>Click Done When a Task is Complete!</h2>
            <ul className="task-list">
              {this.props.tasks.map((task, i) => {
                return (
                  <li className="task-list-item" key={i}>
                    <Task task={task} />
                    <button onClick={this.deleteTask} id={task.id}>Done!</button>
                  </li>
                )
              })}
            </ul>
          </section>
        }
      </div>
    )
  }
}