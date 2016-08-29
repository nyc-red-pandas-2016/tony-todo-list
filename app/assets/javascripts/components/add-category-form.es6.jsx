class AddCategoryForm extends React.Component {
  constructor() {
    super();
    this.submitCategory = this.submitCategory.bind(this);
  }

  submitCategory(e) {
    e.preventDefault();
    let inputField = this.refs.categoryInput
    var data = { name: inputField.value }
    fetch('/categories', {
        method: "post",
        dataType: 'JSON',
        headers: { 'X-CSRF-Token': this.props.csrf, 'Accept': 'application/json', 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data)
      })
    .then((response) => response.json())
    .then((json) => {
      this.props.updateCategories(json);
      inputField.value = "";
    })
  }

  render() {
    return (
      <form onSubmit={this.submitCategory} >
        <input ref="categoryInput" className="form-field" type="text" />
        <input className="form-field" id="add-category" type="submit" value="Add Category"/>
      </form>
    );
  }
}