import { ORM } from 'redux-orm';
import { Student, Teacher, Grade, Class } from './models';

const orm = new ORM();
orm.register(Student, Teacher, Grade, Class);

export default orm;