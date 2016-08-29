class TasksController < ApplicationController
  def index
    tasks = Task.where("category_id = ?", params[:category_id])
    render json: tasks.to_json
  end

  def create
    category = Category.find_by(id: params[:category_id])
    task = category.tasks.create(task_params)
    render json: task.to_json
  end

  def destroy
    task = Task.find_by(id: params[:id])
    task.destroy
    render json: task.to_json
  end

  private
  def task_params
    params.require(:task).permit(:description)
  end
end
