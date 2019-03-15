import React from 'react';
import { Select, Table, Divider, Button } from 'antd';
import { connect } from 'dva';
import styles from './IndexPage.css';
import { bindActionCreators } from 'redux';
import { 
  selectTeacher,
  selectStudent,
  selectGrade,
  selectClass,
  selectClassTeacher,
  selectCurrentClass,
} from './selectors';

function IndexPage(props) {
  const { 
    teachers,
    students,
    fetchTeachers,
    fetchStudents,
    classes,
    classTeachers,
    grades,
    fetchClasses,
    onSelectClass,
    currentClass,
    onUpdateSelectedClass,
    editingClassTeachers,
    onSaveClass,
    onSelectGrade,
    selectedGradeId,
  } = props;
  const getTeachersOfClass = (classId, teachersOfClass) => {
    const teacherIds = teachersOfClass.filter(v => v.fromClassId === classId).map(v => v.toTeacherId);
    return teachers.filter(v => teacherIds.includes(v.id));
  }
  const getColumns = () => {
    return [{
      title: '班级',
      dataIndex: 'name',
    }, {
      title: '学生',
      dataIndex: 'students',
      render: (text) => {
        text = text || [];
        return text.map(v => v.name).join('，') || '无';
      }
    }, {
      title: '老师',
      dataIndex: 'teachers',
      render: (text, record) => {
        text = text || [];
        return getTeachersOfClass(record.id, classTeachers).map(v => v.name).join('，') || '无';
      }
    }]
  };
  const getGradeColumns = () => {
    return [{
      title: '年级',
      dataIndex: 'name',
    }]
  };
  const handleSelectTeacher = (ids) => {
    onUpdateSelectedClass({
      teachers: ids,
    })
  }
  const handleSelectStudent = (ids) => {
    onUpdateSelectedClass({
      students: ids,
    })
  };
  const handleClickGradeRow = (record) => {
    onSelectGrade(record);
    fetchClasses(record);
  }
  return (
    <div className={styles.normal}>
      <div className={styles.tableContainer}>
        <div className={styles.left}>
          <h3 className={styles.title}>年级(选择年级，加载班级)</h3>
          <Table 
            dataSource={grades}
            rowKey={record => record.id}
            pagination={false}
            columns={getGradeColumns()}
            onRow={(record) => ({
              onClick: () => handleClickGradeRow(record),
              className: record.id === selectedGradeId ? styles.selectedRow : '',
            })}
          />
        </div>
        <div className={styles.right}>
          <h3 className={styles.title}>班级(选择班级，加载班级详情可编辑)</h3>
          <Table 
            dataSource={classes}
            rowKey={record => record.id}
            pagination={false}
            columns={getColumns()}
            onRow={(record) => ({
              onClick: () => onSelectClass(record),
              className: record.id === currentClass.id ? styles.selectedRow : '',
            })}
          />
        </div>
      </div>
      <Divider className={styles.divider} />
      {currentClass &&
      <React.Fragment>
        <h3 className={styles.title}>{currentClass.name}</h3>
        <Select 
          className={styles.selectBox}
          placeholder="选择老师"
          onFocus={fetchTeachers}
          mode="multiple"
          value={getTeachersOfClass(currentClass.id, editingClassTeachers).map(v => v.id)}
          onChange={handleSelectTeacher}
        >
          {teachers.map(v => <Select.Option key={v.id} value={v.id}>{v.name}</Select.Option>)}
        </Select>
        <br />
        <Select 
          className={styles.selectBox}
          placeholder="选择学生"
          onFocus={fetchStudents}
          mode="multiple"
          value={currentClass.students}
          onChange={handleSelectStudent}
        >
          {students.map(v => <Select.Option key={v.id} value={v.id}>{v.name}</Select.Option>)}
        </Select>
        <br />
        <Button onClick={onSaveClass}>保存</Button>
      </React.Fragment>
      }
     
    </div>
  );
}

IndexPage.propTypes = {
};

function mapState({ example }) {
  const { orm, editingOrm, selectedGradeId }  = example;
  console.log(example);
  return {
    teachers: selectTeacher(orm),
    students: selectStudent(orm),
    grades: selectGrade(orm),
    classes: selectClass(orm),
    classTeachers: selectClassTeacher(orm),
    currentClass: selectCurrentClass(example),
    editingClassTeachers: selectClassTeacher(editingOrm),
    selectedGradeId: selectedGradeId,
  }
}

function mapDispatch(dispatch) {
  return bindActionCreators({
    fetchTeachers: () => ({
      type: 'example/fetchTeachers',
    }),
    fetchStudents: () => ({
      type: 'example/fetchStudents',
    }),
    fetchClasses: payload => ({
      type: 'example/fetchClasses',
      payload,
    }),
    onSelectClass: payload => ({
      type: 'example/selectClass',
      payload,
    }),
    onUpdateSelectedClass: payload => ({
      type: 'example/updateSelectedClass',
      payload,
    }),
    onSaveClass: payload => ({
      type: 'example/saveClass',
      payload,
    }),
    onSelectGrade: payload => ({
      type: 'example/selectGrade',
      payload,
    })
  }, dispatch)
}
export default connect(mapState, mapDispatch)(IndexPage);
