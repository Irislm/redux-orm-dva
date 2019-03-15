import { createSelector } from 'reselect';
import orm from '../models/orm';

const selectSession = entities => orm.session(entities);

export const selectGrade = createSelector(
  selectSession,
  ({ Grade }) => {
    return Grade.all().toRefArray();
  },
);

export const selectClass = createSelector(
  selectSession,
  ({ Class, Student }) => {
    return Class.all().toRefArray().map(v => {
      if (v.students && v.students.length !== 0) {
        return {
          ...v,
          students: v.students.map(stuId => {
            const studentModel = Student.withId(stuId);
            return studentModel ? studentModel.ref : '';
          })
        };
      }
      return v;
    });
  },
);

export const selectTeacher = createSelector(
  selectSession,
  ({ Teacher }) => {
    return Teacher.all().toRefArray();
  },
);

export const selectStudent = createSelector(
  selectSession,
  ({ Student }) => {
    return Student.all().toRefArray();
  },
);

export const selectClassTeacher = createSelector(
  selectSession,
  ({ ClassTeachers }) => {
    return ClassTeachers.all().toRefArray();
  },
)