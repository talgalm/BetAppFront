export const validationRules = {
  username: {
    required: "Username is required",
    minLength: {
      value: 3,
      message: "------",
    },
  },
  email: {
    required: "Email is required",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "------",
    },
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 6,
      message: "------",
    },
  },
  phoneNumber: {
    required: "Phone number is required",
    pattern: {
      value: /^\d{10,}$/,
      message: "------",
    },
  },
  descrition :{
    
  }
};
