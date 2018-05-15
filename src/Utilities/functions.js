import swal from 'sweetalert'
import './sweetAlertStyle.css'
/*
* handleResponseErr - to get the error message when fetch the API
* Return: (String) - error message
*
* @err : (Object) - error object
*/
export function handleResponseErr(err){

  // check if there any response from the server
  const response = (typeof err.response != 'undefined') ? err.response : false

  // check if the server send any data
  const resData = response.hasOwnProperty('data') ? response.data : false

  // if the server not return any response put browser error
  const error = !resData ? err.message : false

  // the result error message
  const errMesg = (error) ? error : (resData.message) ? resData.message : resData.error

  switch (errMesg) {
    case 'Not Found':
      return 'Request wrong API'

    case 'Network Error':
      return "Can't send request to the server, please check your internet connection!"

    default :
      return errMesg

  }

}


export function deleteItem(id, dispatch, deleteAction, errMsg, obj = null, btnMsg = 'Yes, delete it!', title = 'Deleted'){
  swal({
    title: "Are you sure?",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: btnMsg,
    closeOnConfirm: false,
    showLoaderOnConfirm: true,
  },
  () => {

    dispatch(deleteAction(id)).then(() => {
      swal({
        title: title,
        type: 'success',
        timer: 2000,
        showConfirmButton: false
      })
      obj.forceUpdate()
    }).catch(() => {
      swal("Error", errMsg, "error");
    })
  })
}
