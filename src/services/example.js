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

export function fetchClasses(params = {}) {
  return Promise.resolve(classes.filter(v => v.grade === params.id));
}