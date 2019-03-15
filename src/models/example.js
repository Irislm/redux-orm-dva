import orm from './orm';
import * as services from '../services/example';

export default {

  namespace: 'example',

  state: {
    orm: orm.getEmptyState(),
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(() => {
        dispatch({
          type: 'fetchClasses'
        });
        dispatch({
          type: 'fetchStudents'
        });
        dispatch({
          type: 'fetchTeachers'
        });
      })
    },
  },

  effects: {
    *fetchTeachers({ payload }, { call, put }) {
      const resp = yield call(services.fetchTeachers);
      if (resp) {
        yield put({
          type: 'save',
          payload: {
            data: resp,
            modelType: 'Teacher',
          },
        })
      }
    },
    *fetchStudents({ payload }, { call, put }) {
      const resp = yield call(services.fetchStudents);
      if (resp) {
        yield put({
          type: 'save',
          payload: {
            data: resp,
            modelType: 'Student',
          },
        })
      }
    },
    *fetchClasses({ payload }, { call, put }) {
      const resp = yield call(services.fetchClasses);
      if (resp) {
        yield put({
          type: 'save',
          payload: {
            data: resp,
            modelType: 'Class',
          },
        })
      }
    },
  },

  reducers: {
    save(state, { payload: {data, modelType} }) {
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
  },

};
