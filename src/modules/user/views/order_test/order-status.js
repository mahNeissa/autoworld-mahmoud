
const ORDER_CURRENT_STATUS = [
  {statusCategory: 1, status: 1, categoryName: 'current', label: 'Requested', color: 'warning', nextStatusCategoryOnConfirm: 1, nextStatusOnConfirm: 2, nextStatusCategoryOnCancel: 3, nextStatusOnCancel: 1},
  {statusCategory: 1, status: 2, categoryName: 'current', label: 'Waiting for 30%', color: 'warning', nextStatusCategoryOnConfirm: 1, nextStatusOnConfirm: 3, nextStatusCategoryOnCancel: 3, nextStatusOnCancel: 1},
  {statusCategory: 1, status: 3, categoryName: 'current', label: 'Payed 30%', color: 'warning', nextStatusCategoryOnConfirm: 1, nextStatusOnConfirm: 4, nextStatusCategoryOnCancel: 3, nextStatusOnCancel: 2},
  {statusCategory: 1, status: 4, categoryName: 'current', label: 'Packaging', color: 'warning', nextStatusCategoryOnConfirm: 1, nextStatusOnConfirm: 5, nextStatusCategoryOnCancel: 3, nextStatusOnCancel: 2},
  {statusCategory: 1, status: 5, categoryName: 'current', label: 'Waiting for 70%', color: 'warning', nextStatusCategoryOnConfirm: 1, nextStatusOnConfirm: 6, nextStatusCategoryOnCancel: 3, nextStatusOnCancel: 2},
  {statusCategory: 1, status: 6, categoryName: 'current', label: 'Payed 70% and ready for shipping', color: 'warning', nextStatusCategoryOnConfirm: 2, nextStatusOnConfirm: 1, nextStatusCategoryOnCancel: 3, nextStatusOnCancel: 2}
]
const ORDER_COMPLETED_STATUS = [{statusCategory: 2, status: 1, categoryName: 'completed', label: 'Completed', color: 'success', nextStatusCategoryOnConfirm: null, nextStatusOnConfirm: null, nextStatusCategoryOnCancel: 4, nextStatusOnCancel: 1}]
const ORDER_CANCELLED_STATUS = [
  {statusCategory: 3, status: 1, categoryName: 'cancel', label: 'Cancelled', color: 'danger', nextStatusCategoryOnConfirm: null, nextStatusOnConfirm: null, nextStatusCategoryOnCancel: null, nextStatusOnCancel: null},
  {statusCategory: 3, status: 2, categoryName: 'cancel', label: 'Cancelling in process', color: 'info', nextStatusCategoryOnConfirm: 3, nextStatusOnConfirm: 3, nextStatusCategoryOnCancel: null, nextStatusOnCancel: null},
  {statusCategory: 3, status: 3, categoryName: 'cancel', label: 'Refund expected', color: 'info', nextStatusCategoryOnConfirm: 3, nextStatusOnConfirm: 1, nextStatusCategoryOnCancel: null, nextStatusOnCancel: null}
]
const ORDER_RETURN_STATUS = [
  {statusCategory: 4, status: 1, categoryName: 'return', label: 'Return requested', color: 'warning', nextStatusCategoryOnConfirm: 4, nextStatusOnConfirm: 2, nextStatusCategoryOnCancel: null, nextStatusOnCancel: null},
  {statusCategory: 4, status: 2, categoryName: 'return', label: 'Return in process', color: 'warning', nextStatusCategoryOnConfirm: 4, nextStatusOnConfirm: 3, nextStatusCategoryOnCancel: null, nextStatusOnCancel: null},
  {statusCategory: 4, status: 3, categoryName: 'return', label: 'Checking the goods', color: 'warning', nextStatusCategoryOnConfirm: 4, nextStatusOnConfirm: 4, nextStatusCategoryOnCancel: null, nextStatusOnCancel: null},
  {statusCategory: 4, status: 4, categoryName: 'return', label: 'Returned', color: 'danger', nextStatusCategoryOnConfirm: null, nextStatusOnConfirm: null, nextStatusCategoryOnCancel: null, nextStatusOnCancel: null}
]

export const ORDER_STATUS = [
  ...ORDER_CURRENT_STATUS,
  ...ORDER_COMPLETED_STATUS,
  ...ORDER_CANCELLED_STATUS,
  ...ORDER_RETURN_STATUS
]