# Authentication Documentation

## 1. What is the Difference Between Local and JWT Strategies?

### Local Strategy:
- Used during the login process.
- Validates the user's username and password.
- If the credentials are valid, it returns the user object, which is then used to generate a JWT token.
- **Example:** When a user logs in with their email and password, the Local strategy ensures the credentials are correct.

### JWT Strategy:
- Used for subsequent requests after the user has logged in.
- Validates the JWT token sent by the client (usually in the Authorization header).
- Ensures the token is valid and extracts the user information from it.
- **Example:** When accessing a protected route, the JWT strategy ensures the user is authenticated.

---

## 2. How Do Local and JWT Strategies Work Together?

### Local Strategy:
- Handles the initial authentication (login).
- Validates the username and password.
- If valid, generates a JWT token for the user.

### JWT Strategy:
- Handles subsequent authentication.
- Validates the JWT token sent with each request.
- Ensures the user is logged in and authorized to access protected resources.

### By combining these strategies:
- The Local strategy ensures the user is valid during login.
- The JWT strategy ensures the user is authenticated for all other requests.

---

## 3. What is the Purpose of Guards?
- Guards are used to control access to routes.
- They determine whether a request is allowed to proceed based on specific conditions.

### Examples:
- `AuthGuard('local')`: Ensures the user provides valid credentials during login.
- `AuthGuard('jwt')`: Ensures the user has a valid JWT token for protected routes.
- `AdminGuard`: Ensures the user has the Admin role for admin-only routes.

---

## 4. Why Use `AuthGuard('jwt')`?
- `AuthGuard('jwt')` ensures that the user is authenticated by validating their JWT token.
- It is used on protected routes to ensure only logged-in users can access them.

### Example:
- A route like `/profile` would use `AuthGuard('jwt')` to ensure the user is logged in before accessing their profile.

---

## 5. Why Use `AuthGuard('local')`?
- `AuthGuard('local')` is used during the login process to validate the user's credentials.
- It triggers the Local strategy, which checks the username and password against the database.
- If valid, the user is authenticated, and a JWT token is generated.

---

## 6. What is the Purpose of the AdminGuard?
- The `AdminGuard` is used to enforce role-based access control.
- It ensures that only users with the Admin role can access certain routes.

### Example:
- A route like `/admin/dashboard` would use the `AdminGuard` to ensure only admins can access it.

---

## 7. Does It Make Sense to Create an AdminStrategy?
- No, creating an `AdminStrategy` is unnecessary.
- Strategies are used for authentication (e.g., validating credentials or tokens).
- The `AdminGuard` is sufficient for authorization (e.g., checking the user's role).
- Since admins authenticate the same way as regular users (e.g., via JWT), a guard is the correct tool for enforcing admin-only access.

---

## 8. Can I Use Multiple Strategies on the Same Endpoint?
- Yes, you can use multiple strategies by creating a custom guard or using `AuthGuard(['jwt', 'google'])`.
- This allows you to authenticate users using either JWT or Google OAuth, for example.
- However, only one strategy will be used per request, depending on the provided credentials or token.

---

## 9. What Are Some Common `AuthGuard(' ')` Options?
- `AuthGuard('local')`: For username/password authentication during login.
- `AuthGuard('jwt')`: For validating JWT tokens on protected routes.
- `AuthGuard('google')`: For Google OAuth authentication.
- `AuthGuard('facebook')`: For Facebook OAuth authentication.
- `AuthGuard('custom')`: For custom authentication strategies you define.

---

## 10. How Does the Login Flow Work?
1. The client sends a `POST` request to the `/auth/login` endpoint with their username and password.
2. The `LocalAuthGuard` triggers the Local strategy.
3. The Local strategy validates the credentials using the `AuthService`.
4. If valid, the user object is attached to the request.
5. The `AuthController` calls the `AuthService.login` method to generate a JWT token.
6. The JWT token is returned to the client, which can use it for subsequent requests.

---

## 11. How Does the JWT Flow Work?
1. The client includes the JWT token in the `Authorization` header for protected requests.
2. The `AuthGuard('jwt')` triggers the JWT strategy.
3. The JWT strategy validates the token and extracts the user information.
4. If valid, the request proceeds to the route handler.

---

## Summary
- Use the Local strategy for login (username/password validation).
- Use the JWT strategy for protecting routes (token validation).
- Use guards like `AdminGuard` for role-based access control.
- Strategies handle authentication, while guards handle authorization.
- Combine strategies and guards to create a complete authentication and authorization system.