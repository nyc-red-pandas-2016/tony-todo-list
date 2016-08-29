class CategoriesController < ApplicationController
  def index
    render json: Category.all.to_json
  end

  def create
    category = Category.create(category_params)
    render json: category.to_json
  end

  def destroy
    category = Category.find_by(id: params[:id])
    category.destroy
    render json: category.to_json
  end

  private
  def category_params
    params.require(:category).permit(:name)
  end
end
