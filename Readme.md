# AQUA  - 30 Day AI Voice Agent Challenge

This repository documents my journey through the 30-Day AI Voice Agent Challenge by Murf AI. The goal is to build a fully functional AI-powered voice companion from scratch.

## 🚀 About The Project

AQUA  is an AI-powered voice agent. This project is being built incrementally over 30 days, with each day focusing on a new task or feature.

### Built With

*   **Backend:** [Python](https://www.python.org/) with [FastAPI](https://fastapi.tiangolo.com/)
*   **Frontend:** HTML, CSS, [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) (via CDN)

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Python 3.8+
*   Node.js and npm (optional, for frontend package management)

### Installation

1.  **Clone the repo**
    ```sh
    git clone https://github.com/Jaimin2687/Murf_AI.git
    cd MURF_AI
    ```

2.  **Backend Setup**
    ```sh
    # Navigate to the backend directory
    cd backend

    # Create and activate a virtual environment
    python3 -m venv venv
    source venv/bin/activate

    # Install Python dependencies
    pip install -r requirement.txt

    # Run the FastAPI server
    uvicorn main:app --reload
    ```
    The backend server will be running at `http://localhost:5000`.

3.  **Frontend Setup**
    The frontend is located in the `frontend/` directory. You can open the `index.html` file with a live server extension in your code editor (like VS Code's "Live Server") to view the application.


Happy Coding! 🐾