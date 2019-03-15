import { Model, attr, many, fk, oneToOne } from 'redux-orm';
import PropTypes from 'prop-types';

export class Teacher extends Model {
  static modelName = 'Teacher';
  static fields = {
    name: attr(),
    age: attr(),
    sex: attr(),
  };

  static propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number,
    sex: PropTypes.string,
  };
}

export class Student extends Model {
  static modelName = 'Student';
  static fields = {
    name: attr(),
    age: attr(),
    sex: attr(),
  };

  static propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number,
    sex: PropTypes.string,
  };
}

export class Class extends Model {
  static modelName = 'Class';

  static fields = {
    name: attr(),
    teachers: many('Teacher'),
    students: fk('Student'),
  };

  static propTypes = {
    name: PropTypes.string.isRequired,
    teachers: PropTypes.arrayOf(PropTypes.number),
    students: PropTypes.arrayOf(PropTypes.number),
  };

  static defaultProps = {
    name: '',
    teachers: [],
    students: [],
  }

  static generate(newAttributes = {}) {
    const combinedAttributes = {
      ...this.defaultProps,
      ...newAttributes,
    };
    return this.create(combinedAttributes);
  }
}

export class Grade extends Model {
  static modelName = 'Grade';
  static fields = {
    name: attr(),
    classes: fk('Class'),
  };

  static propTypes = {
    name: PropTypes.string.isRequired,
    classes: PropTypes.arrayOf(PropTypes.number),
  };

  static defaultProps = {
    name: '',
    classes: [],
  }

  static generate(newAttributes = {}) {
    const combinedAttributes = {
      ...this.defaultProps,
      ...newAttributes,
    };
    return this.create(combinedAttributes);
  }
}