// import Employee from '../models/employe.model.js';

// export const createEmployee = async (req, res) => {
//   const { f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } = req.body;

//   // Check for duplicate email
//   const existingEmployee = await Employee.findOne({ f_Email });
//   if (existingEmployee) {
//     return res.status(400).json({ error: 'Email already exists' });
//   }

//   try {
//     // Create a new employee instance
//     const employee = new Employee({
//       f_Name,
//       f_Email,
//       f_Mobile,
//       f_Designation,
//       f_gender,
//       f_Course
//     });

//     console.log(employee);

//     // Save the employee instance
//     await employee.save();

//     // Return the created employee as response
//     res.status(201).json(employee);
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// // Get Employees (Read)
// export const getEmployees = async (req, res) => {
//   try {
//     const employees = await Employee.find();
//     res.status(200).json(employees);
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// // Update Employee
// export const updateEmployee = async (req, res) => {
//   const { id } = req.params;
//   const { f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } = req.body;

//   try {
//     const updatedEmployee = await Employee.findByIdAndUpdate(id, { f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course }, { new: true });
//     if (!updatedEmployee) {
//       return res.status(404).json({ error: 'Employee not found' });
//     }
//     res.status(200).json(updatedEmployee);
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// // Delete Employee
// export const deleteEmployee = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const deletedEmployee = await Employee.findByIdAndDelete(id);
//     if (!deletedEmployee) {
//       return res.status(404).json({ error: 'Employee not found' });
//     }
//     res.status(200).json({ message: 'Employee deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };
import Employee from '../models/employe.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

// Create Employee
export const createEmployee = asyncHandler(async (req, res) => {
  try {
    const { f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } = req.body;

    // Validate required fields
    if (!f_Name || !f_Email || !f_Mobile || !f_Designation || !f_gender || !f_Course) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check for duplicate email
    const existingEmployee = await Employee.findOne({ f_Email });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create a new employee instance
    const employee = new Employee({
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_gender,
      f_Course
    });

    await employee.save();
    res.status(201).json(new ApiResponse(201, employee, 'Employee created successfully'));
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



// Get Employees (Read)
export const getEmployees = asyncHandler(async (req, res) => {
  const employees = await Employee.find();
  res.status(200).json(new ApiResponse(200, employees, 'Employees retrieved successfully'));
});

// Update Employee
export const updateEmployee = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } = req.body;

  const updatedEmployee = await Employee.findByIdAndUpdate(
    id,
    { f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course },
    { new: true }
  );

  if (!updatedEmployee) {
    throw new ApiError(404, 'Employee not found');
  }

  res.status(200).json(new ApiResponse(200, updatedEmployee, 'Employee updated successfully'));
});

// Delete Employee
export const deleteEmployee = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedEmployee = await Employee.findByIdAndDelete(id);
  if (!deletedEmployee) {
    throw new ApiError(404, 'Employee not found');
  }

  res.status(200).json(new ApiResponse(200, null, 'Employee deleted successfully'));
});
export const getEmployeeById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const employee = await Employee.findById(id); // Adjust this line based on your ORM/DB

  if (!employee) {
    return res.status(404).json({ message: 'Employee not found' });
  }

  res.status(200).json({ payload: employee });
});
