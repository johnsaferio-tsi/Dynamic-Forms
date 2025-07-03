export const validateField = (
  field: Record<string, unknown>
): string | null => {
  if (!field.type) return "Each field must have a 'type'."
  if (!field.label) return "Each field must have a 'label'."
  if (!field.name) return "Each field must have a 'name'."
  // Strict validation based on type
  switch (field.type) {
    case "text":
      if (typeof field.value !== "string")
        return "Text field 'value' must be a string."
      if (field.minLength !== undefined && typeof field.minLength !== "number")
        return "Text field 'minLength' must be a number."
      if (field.maxLength !== undefined && typeof field.maxLength !== "number")
        return "Text field 'maxLength' must be a number."
      break
    case "number":
      if (typeof field.value !== "number" && typeof field.value !== "string")
        return "Number field 'value' must be a number or string."
      if (field.min !== undefined && typeof field.min !== "number")
        return "Number field 'min' must be a number."
      if (field.max !== undefined && typeof field.max !== "number")
        return "Number field 'max' must be a number."
      break
    case "radio":
      if (!Array.isArray(field.items))
        return "Radio field 'items' must be an array."
      break
    case "checkbox":
      if (!Array.isArray(field.items))
        return "Checkbox field 'items' must be an array."
      if (!Array.isArray(field.value))
        return "Checkbox field 'value' must be an array."
      break
    case "date":
      if (typeof field.value !== "string")
        return "Date field 'value' must be a string."
      break
    case "select":
      if (!Array.isArray(field.items))
        return "Select field 'items' must be an array."
      break
    case "file":
      if (!Array.isArray(field.allowedExtensions))
        return "File field 'allowedExtensions' must be an array."
      break
    case "textarea":
      if (typeof field.value !== "string")
        return "Textarea field 'value' must be a string."
      break
    case "email":
      if (typeof field.value !== "string")
        return "Email field 'value' must be a string."
      if (field.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(field.value as string)) {
          return "Email field 'value' must be a valid email address."
        }
      }
      if (field.minLength !== undefined && typeof field.minLength !== "number")
        return "Email field 'minLength' must be a number."
      if (field.maxLength !== undefined && typeof field.maxLength !== "number")
        return "Email field 'maxLength' must be a number."
      break
    case "password":
      if (typeof field.value !== "string")
        return "Password field 'value' must be a string."
      if (field.minLength !== undefined && typeof field.minLength !== "number")
        return "Password field 'minLength' must be a number."
      if (field.maxLength !== undefined && typeof field.maxLength !== "number")
        return "Password field 'maxLength' must be a number."
      break
    default:
      return `Unknown field type: ${field.type}`
  }
  return null
}

export const validateFieldValue = (
  field: Record<string, unknown>,
  value: unknown
): string | null => {
  if (field.required) {
    if (
      (field.type === "checkbox" &&
        Array.isArray(value) &&
        value.length === 0) ||
      (field.type === "file" && !value) ||
      (typeof value === "string" && value.trim() === "") ||
      value === undefined ||
      value === null
    ) {
      return `${field.label || field.name} is required.`
    }
  }
  switch (field.type) {
    case "text":
    case "textarea":
    case "password":
    case "email": {
      if (typeof value === "string") {
        if (
          field.minLength !== undefined &&
          value.length < (field.minLength as number)
        ) {
          return `${field.label || field.name} must be at least ${
            field.minLength
          } characters.`
        }
        if (
          field.maxLength !== undefined &&
          value.length > (field.maxLength as number)
        ) {
          return `${field.label || field.name} must be at most ${
            field.maxLength
          } characters.`
        }
        if (field.type === "email" && value) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(value)) {
            return `Please enter a valid email address.`
          }
        }
      }
      break
    }
    case "number": {
      const num = typeof value === "string" ? parseFloat(value) : value
      if (typeof num === "number" && !isNaN(num)) {
        if (field.min !== undefined && num < (field.min as number)) {
          return `${field.label || field.name} must be at least ${field.min}.`
        }
        if (field.max !== undefined && num > (field.max as number)) {
          return `${field.label || field.name} must be at most ${field.max}.`
        }
      } else if (field.required) {
        return `${field.label || field.name} is required.`
      }
      break
    }
    case "checkbox": {
      if (field.required && Array.isArray(value) && value.length === 0) {
        return `Please select at least one option for ${
          field.label || field.name
        }.`
      }
      break
    }
    case "radio":
    case "select": {
      if (field.required && (!value || value === "")) {
        return `Please select an option for ${field.label || field.name}.`
      }
      break
    }
    case "date": {
      if (field.required && (!value || value === "")) {
        return `${field.label || field.name} is required.`
      }
      break
    }
    case "file": {
      if (field.required && !value) {
        return `Please upload a file for ${field.label || field.name}.`
      }
      if (
        value &&
        field.allowedExtensions &&
        Array.isArray(field.allowedExtensions)
      ) {
        const ext = (value as File).name?.split(".").pop()?.toLowerCase()
        if (
          ext &&
          !(field.allowedExtensions as string[])
            .map((e) => e.toLowerCase())
            .includes(ext)
        ) {
          return `Allowed file types: ${(
            field.allowedExtensions as string[]
          ).join(", ")}`
        }
      }
      break
    }
    default:
      break
  }
  return null
}

export const basicJsons = [
  {
    name: "Basic Structure",
    code: {
      forms: [
        {
          formName: "Form Name",
          fields: [
            {
              type: "text",
              label: "Label",
              name: "nme",
              required: true,
              description: "Description",
              placeholder: "Placeholder",
              value: "",
              minLength: 3,
              maxLength: 15,
            },
          ],
        },
      ],
    },
  },
  {
    name: "Text Field",
    code: {
      type: "text",
      label: "Username",
      name: "username",
      required: true,
      description: "Enter your username",
      placeholder: "Username",
      value: "",
      minLength: 3,
      maxLength: 15,
    },
  },
  {
    name: "Password Field",
    code: {
      type: "password",
      label: "Password",
      name: "password",
      required: true,
      description: "Choose a strong password",
      placeholder: "Password",
      value: "",
      minLength: 6,
      maxLength: 20,
    },
  },
  {
    name: "Email Field",
    code: {
      type: "email",
      label: "Email",
      name: "email",
      required: true,
      description: "Enter your email address",
      placeholder: "Email",
      value: "",
    },
  },
  {
    name: "Number Field",
    code: {
      type: "number",
      label: "Age",
      name: "age",
      required: true,
      description: "Enter your age",
      placeholder: "Age",
      value: "",
      min: 18,
      max: 99,
    },
  },
  {
    name: "Radio Field",
    code: {
      type: "radio",
      label: "Gender",
      name: "gender",
      required: true,
      description: "Select your gender",
      items: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Other", value: "other" },
      ],
      value: "",
    },
  },
  {
    name: "Checkbox Field",
    code: {
      type: "checkbox",
      label: "Skills",
      name: "skills",
      required: true,
      description: "Select your skills",
      items: [
        { label: "JavaScript", value: "js" },
        { label: "Python", value: "py" },
        { label: "Java", value: "java" },
      ],
      value: [],
    },
  },
  {
    name: "Date Field",
    code: {
      type: "date",
      label: "Date of Birth",
      name: "dob",
      required: true,
      description: "Pick your date of birth",
      placeholder: "DOB",
      value: "",
    },
  },
  {
    name: "Select Field",
    code: {
      type: "select",
      label: "Country",
      name: "country",
      required: true,
      description: "Select your country",
      placeholder: "Country",
      items: [
        { label: "USA", value: "usa" },
        { label: "India", value: "india" },
        { label: "Germany", value: "germany" },
      ],
      value: "",
    },
  },
  {
    name: "File Field",
    code: {
      type: "file",
      label: "Profile Picture",
      name: "profilePic",
      required: false,
      description: "Upload your profile picture",
      placeholder: "Choose file",
      allowedExtensions: ["jpg", "png"],
      value: null,
    },
  },
  {
    name: "Text Area",
    code: {
      type: "textarea",
      label: "Bio",
      name: "bio",
      required: false,
      description: "Tell us about yourself",
      placeholder: "Short bio...",
      value: "",
    },
  },
  {
    name: "Sample Json Including All Types",
    code: {
      forms: [
        {
          formName: "User Registration",
          fields: [
            {
              type: "text",
              label: "Username",
              name: "username",
              required: true,
              description: "Enter your username",
              placeholder: "Username",
              value: "",
              minLength: 3,
              maxLength: 15,
            },
            {
              type: "password",
              label: "Password",
              name: "password",
              required: true,
              description: "Choose a strong password",
              placeholder: "Password",
              value: "",
              minLength: 6,
              maxLength: 20,
            },
            {
              type: "email",
              label: "Email",
              name: "email",
              required: true,
              description: "Enter your email address",
              placeholder: "Email",
              value: "",
            },
            {
              type: "number",
              label: "Age",
              name: "age",
              required: true,
              description: "Enter your age",
              placeholder: "Age",
              value: "",
              min: 18,
              max: 99,
            },
            {
              type: "radio",
              label: "Gender",
              name: "gender",
              required: true,
              description: "Select your gender",
              items: [
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
                { label: "Other", value: "other" },
              ],
              value: "",
            },
            {
              type: "checkbox",
              label: "Skills",
              name: "skills",
              required: true,
              description: "Select your skills",
              items: [
                { label: "JavaScript", value: "js" },
                { label: "Python", value: "py" },
                { label: "Java", value: "java" },
              ],
              value: [],
            },
            {
              type: "date",
              label: "Date of Birth",
              name: "dob",
              required: true,
              description: "Pick your date of birth",
              placeholder: "DOB",
              value: "",
            },
            {
              type: "select",
              label: "Country",
              name: "country",
              required: true,
              description: "Select your country",
              placeholder: "Country",
              items: [
                { label: "USA", value: "usa" },
                { label: "India", value: "india" },
                { label: "Germany", value: "germany" },
              ],
              value: "",
            },
            {
              type: "file",
              label: "Profile Picture",
              name: "profilePic",
              required: false,
              description: "Upload your profile picture",
              placeholder: "Choose file",
              allowedExtensions: ["jpg", "png"],
              value: null,
            },
            {
              type: "textarea",
              label: "Bio",
              name: "bio",
              required: false,
              description: "Tell us about yourself",
              placeholder: "Short bio...",
              value: "",
            },
          ],
        },
      ],
    },
  },
  {
    name: "Real Time Example",
    code: {
      forms: [
        {
          formName: "Contact Us",
          fields: [
            {
              type: "text",
              label: "Full Name",
              name: "fullName",
              required: true,
              placeholder: "Your name",
              value: "",
            },
            {
              type: "email",
              label: "Email",
              name: "email",
              required: true,
              placeholder: "you@example.com",
              value: "",
            },
            {
              type: "textarea",
              label: "Message",
              name: "message",
              required: true,
              placeholder: "Type your message...",
              value: "",
            },
          ],
        },
        {
          formName: "Newsletter Signup",
          fields: [
            {
              type: "email",
              label: "Email",
              name: "newsletterEmail",
              required: true,
              placeholder: "you@example.com",
              value: "",
            },
            {
              type: "checkbox",
              label: "Topics",
              name: "topics",
              required: true,
              description: "Select topics of interest",
              items: [
                { label: "Tech", value: "tech" },
                { label: "Business", value: "business" },
                { label: "Health", value: "health" },
              ],
              value: [],
            },
          ],
        },
        {
          formName: "Job Application",
          fields: [
            {
              type: "text",
              label: "Full Name",
              name: "applicantName",
              required: true,
              placeholder: "Your name",
              value: "",
            },
            {
              type: "email",
              label: "Email",
              name: "applicantEmail",
              required: true,
              placeholder: "you@example.com",
              value: "",
            },
            {
              type: "file",
              label: "Resume",
              name: "resume",
              required: true,
              description: "Upload your resume (PDF only)",
              placeholder: "Choose file",
              allowedExtensions: ["pdf"],
              value: null,
            },
          ],
        },
      ],
    },
  },
]
