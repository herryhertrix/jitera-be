import { BalanceStatus } from '@schemas/Balance'
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
    startprice: yup.number().required(),
    name: yup.string().required(),
    timewindow: yup.date().required(),
  }).validateSync(params, { abortEarly: false })


// export const credit = (yup: IYup, params: object) =>
//   yup.object().shape({
//     username: yup.string().required(),
//     password: yup.string().required(),
//   }).validateSync(params, { abortEarly: false })