// // ===============================
// // FONCTION VALIDATION TESTABLE
// // ===============================

// export function validateForm(email: string, password: string) {

//   const errors: Record<string, string> = {}

//   if (!email.trim()) {
//     errors.email = "Email required"
//   }
//   else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//     errors.email = "Invalid email"
//   }

//   if (!password) {
//     errors.password = "Password required"
//   }
//   else if (password.length < 6) {
//     errors.password = "Minimum 6 characters"
//   }

//   return errors
// }

// // TESTS UNITAIRES : validateForm
// // ===============================

// if (import.meta.vitest) {

//   const { describe, it, expect } = import.meta.vitest

//   describe("validateForm", () => {


//     // ===============================
//     // TEST 1 : Email vide
//     // ===============================
//     it("should return 'Email required' when email is empty", () => {

//       const email = ""
//       const password = "password123"

//       const result = validateForm(email, password)

//       expect(result.email).toBe("Email required")

//     }) 


//     // ===============================
//     // TEST 2 : Email invalide
//     // ===============================
//      it("should return 'Invalid email' when email format is incorrect", () => {

//        const email = "invalid-email"
//        const password = "password123"

//        const result = validateForm(email, password)

//        expect(result.email).toBe("Invalid email")

//      }) 

//      // ===============================
//       // TEST 3 : Password vide
//     // ===============================
//     it("should return 'Password required' when password is empty", () => {

//       const email = "test@test.com"
//        const password = ""

//        const result = validateForm(email, password)

//       expect(result.password).toBe("Password required")

//      })  


//      // ===============================
//      // TEST 4 : Password trop court
//      // ===============================
//      it("should return 'Minimum 6 characters' when password is too short", () => {

//        const email = "test@test.com"
//        const password = "123"

//        const result = validateForm(email, password)

//        expect(result.password).toBe("Minimum 6 characters")

//      }) 


//      // ===============================
//      // TEST 5 : Formulaire valide
//      // ===============================
//      it("should return no errors when email and password are valid", () => {

//        const email = "test@test.com"
//        const password = "password123"

//        const result = validateForm(email, password)

//        expect(result).toEqual({})

//      })

//    })

//  }



 // ===============================
// LOGIQUE TESTABLE SIGNUP
// ===============================

export function validateSignUpForm(email: string, password: string, confirmPassword: string) {
  const errors: Record<string, string> = {}

  // Email
  if (!email.trim()) {
    errors.email = "Email required"
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Invalid email"
  }

  // Password
  if (!password) {
    errors.password = "Password required"
  } else if (password.length < 6) {
    errors.password = "Minimum 6 characters"
  }

  // Confirm password
  if (!confirmPassword) {
    errors.confirmPassword = "Confirm password required"
  } else if (confirmPassword !== password) {
    errors.confirmPassword = "Passwords do not match"
  }

  return errors
}

// ===============================
// TESTS UNITAIRES SIGNUP
// ===============================

if (import.meta.vitest) {

  const { describe, it, expect } = import.meta.vitest

  describe("validateSignUpForm", () => {

    it("should return error if email is empty", () => {
      const result = validateSignUpForm("", "password123", "password123")
      expect(result.email).toBe("Email required")
    })

    it("should return error if email is invalid", () => {
      const result = validateSignUpForm("invalid-email", "password123", "password123")
      expect(result.email).toBe("Invalid email")
    })

    it("should return error if password is empty", () => {
      const result = validateSignUpForm("test@test.com", "", "password123")
      expect(result.password).toBe("Password required")
    })

    it("should return error if password too short", () => {
      const result = validateSignUpForm("test@test.com", "123", "123")
      expect(result.password).toBe("Minimum 6 characters")
    })

    it("should return error if confirmPassword is empty", () => {
      const result = validateSignUpForm("test@test.com", "password123", "")
      expect(result.confirmPassword).toBe("Confirm password required")
    })

    it("should return error if passwords do not match", () => {
      const result = validateSignUpForm("test@test.com", "password123", "password321")
      expect(result.confirmPassword).toBe("Passwords do not match")
    })

    it("should return no errors if all fields are valid", () => {
      const result = validateSignUpForm("test@test.com", "password123", "password123")
      expect(result).toEqual({})
    })

  })

}
