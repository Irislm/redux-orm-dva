import { Model, attr, many, fk } from 'redux-orm';
import PropTypes from 'prop-types';

class CommonModel extends Model {
  static generate(newAttributes = {}) {
    this.defaultProps = this.defaultProps || {};
    const combinedAttributes = {
      ...this.defaultProps,
      ...newAttributes,
    };
    return this.create(combinedAttributes);
  }
}
export class Teacher extends CommonModel {
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

export class Student extends CommonModel {
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

export class Class extends CommonModel {
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
}

export class Grade extends CommonModel {
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
}