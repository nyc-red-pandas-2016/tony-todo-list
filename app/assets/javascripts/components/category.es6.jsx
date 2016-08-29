class Category extends React.Component {
  constructor() {
    super();
    this.filterTasks = this.filterTasks.bind(this);
  }

  filterTasks() {
    let categoryID = this.props.category.id
    let url = `/categories/${categoryID}/tasks`
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        this.props.updateTasks(json)
        this.props.updateCategoryID(categoryID)
      });
  }

  render() {
    let category = this.props.category
    return (
      <span className="list-item" onClick={this.filterTasks}>
        <li>{category.name}</li>
      </span>
    )
  }
}