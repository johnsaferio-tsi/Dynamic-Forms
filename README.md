# Dynamic Forms

A modern, dynamic form builder built with Next.js and Mantine UI. This project allows users to generate customizable forms from JSON schemas, preview them live, and validate user input with ease.

## Features

- **Dynamic Form Generation**: Build forms on the fly from JSON definitions.
- **Live JSON Editor**: Edit your form schema in real time and see instant updates.
- **Rich Field Support**: Supports text, number, email, password, radio, checkbox, date, select, file, and textarea fields.
- **Validation**: Built-in validation for required fields, min/max values, email format, and more.
- **Responsive Design**: Fully responsive and mobile-friendly UI.
- **Example Drawer**: Access ready-to-use JSON schema examples for quick form creation.
- **Modern UI**: Powered by [Mantine](https://mantine.dev/) for beautiful, accessible components.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/johnsaferio-tsi/Dynamic-Forms.git
   cd dynamic-forms
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser:**

   Visit [http://localhost:3000](http://localhost:3000) to see the app in action.

## Usage

- Use the JSON editor on the left (or top on mobile) to define your form schema.
- Click **Generate Form** to render the form based on your JSON.
- Use the **Example JSON** drawer to explore and copy sample schemas.
- Fill out the form and see validation in real time.

### Example JSON Schema

```json
{
  "forms": [
    {
      "formName": "User Registration",
      "fields": [
        {
          "type": "text",
          "label": "Username",
          "name": "username",
          "required": true,
          "minLength": 3,
          "maxLength": 15
        },
        {
          "type": "email",
          "label": "Email",
          "name": "email",
          "required": true
        },
        {
          "type": "password",
          "label": "Password",
          "name": "password",
          "required": true,
          "minLength": 6
        }
      ]
    }
  ]
}
```

## Project Structure

- `src/components/atoms/` — Reusable form field components (TextInput, NumberInput, etc.)
- `src/components/modules/` — Higher-level modules (FormBuilder, ExampleDrawer, etc.)
- `src/pages/` — Next.js pages
- `src/utils/` — Utility functions and validation logic
- `src/__tests__/` — Unit tests for components

## Testing

This project uses [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/) for unit tests.

To run tests:

```bash
npm test
# or
yarn test
```

---

**Made with ❤️ using Next.js and Mantine.**
