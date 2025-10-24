# Task Tracker CLI

A simple command-line interface for tracking tasks and managing your to-do list.

This project is based on the [Task Tracker project challenge](https://roadmap.sh/projects/task-tracker) from roadmap.sh.

## Features

- Add new tasks
- Update existing tasks
- Delete tasks
- Mark tasks as complete
- List all tasks with filtering options

## Installation

```bash
# Clone the repository
git clone https://github.com/Imran-cse/task-tracker-cli
cd task-tracker-cli

# Install dependencies
npm install
```

## Usage

```bash
# Add a new task
node task-cli.js add "Buy groceries"

# List all tasks
node task-cli.js list

# List tasks by status
node task-cli.js list done
node task-cli.js list todo
node task-cli.js list in-progress

# Update a task
node task-cli.js update 1 "Buy groceries and cook dinner"

# Mark task as in progress or done
node task-cli.js mark-in-progress 1
node task-cli.js mark-done 1

# Delete a task
node task-cli.js delete 1
```

## Global Installation

To make the `todo` command available globally on your system:

```bash
# Make the script executable
chmod +x index.js

# Link the package globally
npm link
```

After running these commands, you can use `todo` instead of `node task-cli.js`:

```bash
# Add a new task
todo add "Buy groceries"

# List all tasks
todo list

# Mark task as done
todo mark-done 1
```

## Task Properties

Each task has the following properties:

- `id`: Unique identifier
- `description`: Task description
- `status`: todo, in-progress, or done
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

## Requirements

- Node.js (version 12 or higher)

## License

MIT
