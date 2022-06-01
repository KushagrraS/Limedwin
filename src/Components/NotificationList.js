import React, { useEffect, useState } from "react";
import GenericTable from "./Table";
import { useSelector, useDispatch } from "react-redux";
import { getNotificationRequest } from "../redux/actions";
import Loader from "./Loader";
import AlertDialog from "./ActionDialog";
import fireAjax from "../services";
import { toast } from "react-toastify";
const makeTableData = (rows = []) => {
  if (!rows.length) {
    return [];
  }
  let data = [];
  rows.map((item, index) => {
    let a = {
      description: item.body,
      title: item.title,
      serialNumber: index + 1,
      _id: item._id,
    };
    data.push(a);
  });
  return data;
};
export default function NotificationList() {
  const [open, setOpen] = useState(false);
  const [activeUserId, setActiveUserId] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useDispatch();
  const notificationList = useSelector((state) => state.auth.notificationList);

  useEffect(() => {
    dispatch(getNotificationRequest());
  }, []);

  console.log(notificationList, "sendNotificationsendNotification");
  if (notificationList.isLoading && !isMounted) return <Loader variant="big" />;

  const handleDelete = (e) => {
    setActiveUserId(e);
    setOpen(true);
  };

  const onPrimaryBtnClick = () => {
    setOpen(false);
  };

  const onSecondaryBtnClick = () => {
    setIsMounted(true);
    fireAjax("DELETE", `users/admin/removeNotifications/${activeUserId}`).then(
      () => {
        dispatch(getNotificationRequest());
        setOpen(false);
        toast.success("Notification Deleted Successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    );
  };

  return (
    <div>
      <AlertDialog
        header={"Are you sure you want to delete this notification?"}
        primaryText={"No"}
        secondaryText={"Yes"}
        onPrimaryBtnClick={onPrimaryBtnClick}
        onSecondaryBtnClick={onSecondaryBtnClick}
        open={open}
        handleClose={onPrimaryBtnClick}
      />
      <h3>Notification List</h3>
      <GenericTable
        headers={["S.No", "Title", "Description"]}
        cellData={makeTableData(notificationList.data.data)}
        keys={["serialNumber", "title", "description"]}
        deleteIcon={true}
        editIcon={false}
        handleDelete={handleDelete}
      />
    </div>
  );
}
