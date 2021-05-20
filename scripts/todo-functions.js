// Fetch existing todos from localStorage
const getSavedTodos = () => {
	const todosJSON = localStorage.getItem("todos");

	try {
		return todosJSON ? JSON.parse(todosJSON) : [];
	} catch (e) {
		return [];
	}
};

// Save todos to localStorage
const saveTodos = todos => localStorage.setItem("todos", JSON.stringify(todos));

// Remove todo by id
const removeTodo = id => {
	const todoIndex = todos.findIndex(todo => todo.id === id);

	if (todoIndex > -1) {
		todos.splice(todoIndex, 1);
	}
};

// Toggle the completed value for a given todo
const toggleTodo = id => {
	const todo = todos.find(todo => todo.id === id);

	if (todo !== undefined) {
		todo.completed = !todo.completed;
	}
};

// Render application todos based on filters
const renderTodos = (todos, filters) => {
	const todosEl = document.querySelector("#todos");

	const filteredTodos = todos.filter(todo => {
		const searchTextMatch = todo.text
			.toLowerCase()
			.includes(filters.searchText.toLowerCase());
		const hideCompletedMatch = !filters.hideCompleted || !todo.completed;

		return searchTextMatch && hideCompletedMatch;
	});

	const incompleteTodos = filteredTodos.filter(todo => !todo.completed);

	todosEl.innerHTML = "";
	todosEl.appendChild(generateSummaryDOM(incompleteTodos));

	if (filteredTodos.length < 1) {
		const emptyMessage = document.createElement("p");
		emptyMessage.classList.add("empty-message");
		emptyMessage.textContent = "Nothing here, get started..";

		todosEl.appendChild(emptyMessage);
	} else {
		filteredTodos.forEach(todo => todosEl.appendChild(generateTodoDOM(todo)));
	}
};

// Get the DOM elements for an individual note
const generateTodoDOM = todo => {
	const todoEl = document.createElement("label");
	const containerEl = document.createElement("div");
	const checkbox = document.createElement("input");
	const todoText = document.createElement("p");
	const removeButton = document.createElement("button");

	// Setup todo checkbox
	checkbox.setAttribute("type", "checkbox");
	checkbox.checked = todo.completed;
	containerEl.appendChild(checkbox);
	checkbox.addEventListener("change", () => {
		toggleTodo(todo.id);
		saveTodos(todos);
		renderTodos(todos, filters);
	});

	// Setup the todo text
	todoText.textContent = todo.text;
	containerEl.appendChild(todoText);

	//Setup container
	todoEl.classList.add("list-item");
	containerEl.classList.add("list-item__container");
	todoEl.appendChild(containerEl);

	// Setup the remove button
	removeButton.textContent = "remove";
	removeButton.classList.add("button", "button--text");
	todoEl.appendChild(removeButton);
	removeButton.addEventListener("click", () => {
		removeTodo(todo.id);
		saveTodos(todos);
		renderTodos(todos, filters);
	});

	return todoEl;
};

// Change pluralization of summary text depending on remaining todos
const generateSummaryText = (summary, remainingTodos) => {
	if (remainingTodos === 1) {
		summary.textContent = `You Have ${remainingTodos} Todo Left`;
	} else {
		summary.textContent = `You Have ${remainingTodos} Todos Left`;
	}
};

// Get the DOM elements for list summary
const generateSummaryDOM = incompleteTodos => {
	const summary = document.createElement("h2");
	summary.classList.add("list-title");

	generateSummaryText(summary, incompleteTodos.length);
	return summary;
};
