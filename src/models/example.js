import orm from './orm';
import * as services from '../services/example';

export default {

  namespace: 'example',

  state: {
    orm: orm.getEmptyState(),
    editingOrm: orm.getEmptyState(),
    selectedClassId: '',
    selectedGradeId: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(() => {
        dispatch({
          type: 'fetchStudents'
        });
        dispatch({
          type: 'fetchTeachers'
        });
        dispatch({
          type: 'fetchGrades'
        });
      })
    },
  },

  effects: {
    *fetchTeachers({ payload }, { call, put }) {
      const resp = yield call(services.fetchTeachers);
      if (resp) {
        yield put({
          type: 'insertEntities',
          payload: {
            data: resp,
            modelType: 'Teacher',
          },
        })
      }
    },
    *fetchGrades({ payload }, { call, put }) {
      const resp = yield call(services.fetchGrades);
      if (resp) {
        yield put({
          type: 'insertEntities',
          payload: {
            data: resp,
            modelType: 'Grade',
          },
        })
      }
    },
    *fetchStudents({ payload }, { call, put }) {
      const resp = yield call(services.fetchStudents);
      if (resp) {
        yield put({
          type: 'insertEntities',
          payload: {
            data: resp,
            modelType: 'Student',
          },
        })
      }
    },
    *fetchClasses({ payload }, { call, put }) {
      const resp = yield call(services.fetchClasses, payload);
      if (resp) {
        yield put({
          type: 'delete',
          payload: {
            data: resp,
            modelType: 'Class',
          },
        })
        yield put({
          type: 'insertEntities',
          payload: {
            data: resp,
            modelType: 'Class',
          },
        })
      }
    },
  },

  reducers: {
    insertEntities(state, { payload: {data, modelType} }) {
      const session = orm.session(state.orm);
      const ModelClass = session[modelType];
      data.forEach(v => {
        ModelClass.upsert(v);
      })
      return { 
        ...state, 
        orm: session.state,
      };
    },
    delete(state, { payload: { modelType } }) {
      const session = orm.session(state.orm);
      const ModelClass = session[modelType];
      ModelClass.delete();
      return { 
        ...state, 
        orm: session.state,
      };
    },
    selectClass(state, { payload: { id }}) {
      const session = orm.session(state.orm);
      const editingSession = orm.session(state.editingOrm);
      const { Class, ClassTeachers } = session;
      const classData = Class.withId(id).ref;
      const { Class: EditingClass } = editingSession;
      const modelInstance = EditingClass.generate(classData);
      const classTeachers = ClassTeachers.filter({ fromClassId: id }).all().toRefArray().map(v => v.toTeacherId);
      modelInstance.update({teachers: classTeachers});
      return {
        ...state,
        selectedClassId: id,
        editingOrm: editingSession.state,
      }
    },
    updateSelectedClass(state, { payload }) {
      const editingSession = orm.session(state.editingOrm);
      const { Class } = editingSession;
      const modelInstance = Class.withId(state.selectedClassId);
      modelInstance.update(payload);
      return {
        ...state,
        editingOrm: editingSession.state,
      }
    },
    saveClass(state) {
      const id = state.selectedClassId;
      const session = orm.session(state.orm);
      const editingSession = orm.session(state.editingOrm);
      const { Class } = session;
      const { Class: EditingClass, ClassTeachers } = editingSession;
      const editingData = EditingClass.withId(id).ref;
      const modelInstance = Class.withId(id);
      const classTeachers = ClassTeachers.filter({ fromClassId: id }).all().toRefArray().map(v => v.toTeacherId);
      modelInstance.update({
        ...editingData,
        teachers: classTeachers,
      })
      return {
        ...state,
        orm: session.state,
      }
    },
    selectGrade(state, { payload: { id }}) {
      return {
        ...state,
        selectedGradeId: id,
      }
    }
  },

};
