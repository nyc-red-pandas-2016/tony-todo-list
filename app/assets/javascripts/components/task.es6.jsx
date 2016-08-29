class Task extends React.Component {
  render() {
    return (
      <p className="task-view">{this.props.task.description}</p>
    )
  }
}