import React from 'react';
import { Select, Table } from 'antd';
import { connect } from 'dva';
import styles from './IndexPage.css';
import { bindActionCreators } from 'redux';
import { 
  selectTeacher,
  selectStudent,
  selectGrade,
  selectClass,
  selectClassTeacher,
} from './selectors';

function IndexPage(props) {
  const { 
    teachers,
    students,
    fetchTeachers,
    fetchStudents,
    classes,
    classTeachers,
  } = props;
  console.log(props);
  const getColumns = () => {
    return [{
      title: '班级',
      dataIndex: 'name',
    }, {
      title: '学生',
      dataIndex: 'students',
      render: (text) => {
        text = text || [];
        return text.map(v => v.name).join('，');
      }
    }, {
      title: '老师',
      dataIndex: 'teachers',
      render: (text, record) => {
        text = text || [];
        const teacherIds = classTeachers.filter(v => v.fromClassId === record.id).map(v => v.toTeacherId);
        return teachers.filter(v => teacherIds.includes(v.id)).map(v => v.name).join('，');
      }
    }]
  }
  return (
    <div className={styles.normal}>
      <h3 className={styles.title}>班级</h3>
      <Table 
        dataSource={classes}
        rowKey={record => record.id}
        pagination={false}
        columns={getColumns()}
      />
      <Select 
        className={styles.selectBox}
        placeholder="选择老师"
        onFocus={fetchTeachers}
      >
        {teachers.map(v => <Select.Option key={v.id} value={v.id}>{v.name}</Select.Option>)}
      </Select>
      <br />
      <Select 
        className={styles.selectBox}
        placeholder="选择学生"
        onFocus={fetchStudents}
      >
        {students.map(v => <Select.Option key={v.id} value={v.id}>{v.name}</Select.Option>)}
      </Select>
    </div>
  );
}

IndexPage.propTypes = {
};

function mapState({ example: { orm } }) {
  return {
    teachers: selectTeacher(orm),
    students: selectStudent(orm),
    grades: selectGrade(orm),
    classes: selectClass(orm),
    classTeachers: selectClassTeacher(orm),
  }
}

function mapDispatch(dispatch) {
  return bindActionCreators({
    fetchTeachers: () => ({
      type: 'example/fetchTeachers',
    }),
    fetchStudents: () => ({
      type: 'example/fetchStudents',
    })
  }, dispatch)
}
export default connect(mapState, mapDispatch)(IndexPage);
