# Kanban Board Project

This project is a fully interactive **Kanban Board** built using **React.js**. It allows users to manage tasks by grouping them based on **Status**, **User**, or **Priority**. The board also supports adding new tasks and displays user-specific task information.

You can check the live deployment of the project at:  
🔗**https://kanban-taskflow.netlify.app/**

## Features

- **Interactive Kanban Columns**: Organize tasks by **Status**, **Priority**, or **User**.
- **Add New Tasks**: Users can add new tasks directly to any column, and each task can have custom attributes such as status, priority, and assigned user.
- **Status Icons**: Each task displays a corresponding icon for its status when grouped by **User** or **Priority**.
- **Responsive Design**: The design is fully responsive and adapts to various screen sizes, from desktop to mobile.
- **Session Persistence**: The application uses `sessionStorage` to save the user's preferences and board state, ensuring that data persists even after a page reload.
- **Dropdown Filtering**: Users can filter tasks by grouping (status, user, priority) and sorting (priority, title) using the dropdown in the header.

## Technologies Used

- **React.js**: The core framework for building the interactive components.
- **Axios**: Used to fetch ticket data from the provided API.
- **CSS Flexbox**: Used for responsive layout design, making the UI adapt to different screen sizes.
- **SessionStorage**: Used to persist state across page reloads, such as grouping and sorting preferences.
- **Netlify**: The application is deployed and hosted on Netlify for fast and reliable delivery.

## Installation and Setup

1. **Clone or Fork this Repository**

   You can download the project or fork the repository using the following command:

   ```bash
   git clone https://github.com/atharvarai/Kanban-Board-TaskFlow.git
   ```

   Then, navigate to the project directory:

   ```bash
   cd kanban-board
   ```

2. **Install Dependencies**

   To install the project dependencies, use npm:

   ```bash
   npm install
   ```

3. **Run the Project**

   Once the dependencies are installed, you can start the development server by running:

   ```bash
   npm start
   ```

   The project will be available at `http://localhost:3000`.

## Functionalities

1. **Grouping by Status, User, and Priority**:  
   - You can group tasks into columns by status (e.g., Todo, In Progress), by assigned user, or by task priority.
   
2. **Sorting by Priority and Title**:  
   - The tasks within each column can be sorted by priority (highest to lowest) or alphabetically by title.

3. **Adding New Cards**:  
   - You can easily add new tasks/cards to any column based on the current grouping criteria (status, user, or priority).

4. **Status Icons**:  
   - Tasks display relevant status icons when grouped by **User** or **Priority** for better visual feedback.

5. **Responsive Layout**:  
   - The board adjusts its layout based on the device screen size. It displays columns side by side on larger screens and stacks them on smaller screens for easy navigation.

## API

The application fetches tasks and users from an external API. The API response contains two key objects:

- **Tickets**: Each ticket represents a task in the Kanban board.
- **Users**: Information about the users, used to assign tasks to specific people.
