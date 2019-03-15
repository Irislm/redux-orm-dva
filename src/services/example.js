import {
  teachers, 
  students,
  grades,
  classes,
} from './mockData';

export function fetchTeachers() {
  return Promise.resolve(teachers);
}

export function fetchStudents() {
  return Promise.resolve(students);
}

export function fetchGrades() {
  return Promise.resolve(grades);
}

export function fetchClasses() {
  return Promise.resolve(classes);
}