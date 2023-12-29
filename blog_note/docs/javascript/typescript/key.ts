/* eslint-disable @typescript-eslint/no-unused-vars */
type StatusMap = {
  success: 'Success',
  error: 'Error',
}

type StatusKey = keyof StatusMap
type StatusValue = StatusMap[StatusKey]

const status: StatusKey = 'error'
const statusValue: StatusValue = 'Error'

export default {}
