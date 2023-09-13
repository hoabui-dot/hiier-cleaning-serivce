import React, { useEffect } from "react";
import { TaskApi } from '../../services/api/task';

const Notification = () => {

  useEffect(() => {
    const getNotification = () => {
      TaskApi.getNotification().then((response) => {
        console.log('result', response);
      }).catch(err => {
        console.log('error', err);
      })
    }
    getNotification();
  }, [])

  return (
    <></>
  )
}

export default Notification;