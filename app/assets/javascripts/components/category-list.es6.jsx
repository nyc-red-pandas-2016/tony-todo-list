class CategoryList extends React.Component {
  render() {
    return (
      <ul className="category-list">
        {this.props.categories.map((category, i) => {
          return <Category updateTasks={this.props.updateTasks} updateCategoryID={this.props.updateCategoryID } category={category} key={i} />
        })}
      </ul>
    )
  }
}