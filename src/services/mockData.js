export const teachers = [{
  id: '1',
  name: '李老师',
  age: 22,
  sex: 'female',
}, {
  id: '2',
  name: '王老师',
  age: 25,
  sex: 'female',
}, {
  id: '3',
  name: '张老师',
  age: 30,
  sex: 'male',
}, {
  id: '4',
  name: '许老师',
  age: 28,
  sex: 'male',
}, {
  id: '5',
  name: '徐老师',
  age: 32,
  sex: 'male',
}]

export const students = [{
  id: '1',
  name: '开心',
  age: 10,
  sex: 'male',
}, {
  id: '2',
  name: '丽丽',
  age: 12,
  sex: 'female',
}, {
  id: '3',
  name: '拉克',
  age: 10,
  sex: 'female',
}, {
  id: '4',
  name: '圆圆',
  age: 9,
  sex: 'female',
}, {
  id: '5',
  name: '小强',
  age: 8,
  sex: 'male',
}, {
  id: '6',
  name: '茗茗',
  age: 9,
  sex: 'female',
}]

export const classes = [{
  id: '1',
  name: '一年一班',
  grade: '1',
  students: ['1', '2'],
  teachers: ['1', '2'],
}, {
  id: '2',
  grade: '1',
  name: '一年二班',
  students: ['3', '4'],
  teachers: ['3', '2'],
}, {
  id: '3',
  name: '二年一班',
  grade: '2',
  students: ['5', '6'],
  teachers: ['5', '4'],
}];

export const grades = [{
  id: '1',
  name: '一年级',
  classes: ['1', '2'],
}, {
  id: '2',
  name: '二年级',
  classes: ['3'],
}]