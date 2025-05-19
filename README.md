# 📬 Email Draft Manager – Assignment Project

A basic email system built with a full-stack architecture, including a React frontend and a Node.js + Express + MongoDB backend.  
The system allows registered users to send, receive, view and save drafts, and search through messages.

## 📈 Future Improvements

- **Add JWT authentication** to securely identify users and protect routes.

- **Implement editing of drafts** from the client side.  
  _Note: The backend route and logic already support this._

- **Handle edge case**: prevent or notify users when trying to send an email to a user who does not exist in the system.

- **Improve performance** by:

  - Fetching only the **last 10 emails** initially
  - Adding a **"Load More"** button at the bottom of the message list
  - Optionally implementing **lazy loading** during scroll

- **Improve UI**, especially:
  - Displaying opened email messages more clearly
  - Adding **timestamp** or **sent date** for each message
