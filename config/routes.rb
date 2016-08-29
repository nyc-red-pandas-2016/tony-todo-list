Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'app#index'

  resources :categories, only: [:index, :create, :destroy] do
    resources :tasks, only: [:index, :create, :destroy]
  end
end
