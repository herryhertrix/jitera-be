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

export const deposit = (yup: IYup, params: object) =>
  yup.object().shape({
    userId: yup.string().required(),
    amount: yup.number().required(),
  }).validateSync(params, { abortEarly: false })
