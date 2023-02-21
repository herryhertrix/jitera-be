import {
  ArraySchemaConstructor,
  BooleanSchemaConstructor,
  DateSchemaConstructor,
  MixedSchemaConstructor,
  NumberSchemaConstructor,
  ObjectSchemaConstructor,
  StringSchemaConstructor,
} from 'yup'

interface IYup {
  mixed: MixedSchemaConstructor
  string: StringSchemaConstructor
  number: NumberSchemaConstructor
  boolean: BooleanSchemaConstructor
  bool: BooleanSchemaConstructor
  date: DateSchemaConstructor
  array: ArraySchemaConstructor
  object: ObjectSchemaConstructor
}

export const register = (yup: IYup, params: object) =>
  yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
  }).validateSync(params, { abortEarly: false })


export const post = (yup: IYup, params: object) =>
  yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
  }).validateSync(params, { abortEarly: false })