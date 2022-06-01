import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GenericTable from "../Components/Table";
import {
  getUserListRequest,
  updateUserSubscriptionRequest,
} from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import defaultAvtar from "../assets/avatar.jpeg";
import Loader from "../Components/Loader";
import Error from "../Components/Error";
import MultipleSelect from "../Components/Select";
import moment from "moment";
import AlertDialog from "../Components/ActionDialog";
import fireAjax from "../services";
import {  toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  root: {
    "&:-webkit-scrollbar": {
      width: 0,
      background: "transparent",
    },
    padding: 10,
  },
  titleWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  playlistTitle: {
    fontWeight: "bold",
    fontSize: "1.2rem",
  },
  newPlaylistTitle: {
    color: "#065fd4",
    fontWeight: "500",
    cursor: "pointer",
  },
  avtar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(5),
    right: theme.spacing(5),
    background: "#3ea8ad",
    "&:hover": {
      background: "#3ea8ad",
    },
  },
}));

export default function Users() {
  const [open, setOpen] = useState(false);
  const [activeUserId, setActiveUserId] = useState(null);
  const[isMounted,setIsMounted]=useState(false)


  const classes = useStyles();
  const dispatch = useDispatch();
  const userlist = useSelector((state) => state.course.userlist);
  const usersSubscription = useSelector(
    (state) => state.auth.subscriptionStatus
  );

  useEffect(() => {
    dispatch(getUserListRequest());
  }, []);

  const makeTableData = (rows = []) => {
    if (!rows.length) {
      return [];
    }
    let data = [];
    rows.map((item, index) => {
      let a = {
        profile: (
          <img
            src={item.profilePicture || defaultAvtar}
            className={classes.avtar}
          />
        ),
        name: item.name,
        profilePicture: item.profilePicture,
        _id: item._id,
        email: item.email,
        subscription: editIconComponent(item),
        createdAt: moment(item.createdAt).format("DD/MM/YYYY, HH:MM A"),
        isBookDownloaded: `${item.isBookDownloaded ? "Yes" : "No"}`,
        serialNumber: index + 1,
      };
      data.push(a);
    });
    return data;
  };

  const handleChangeSubscription = (subscription, userId) => {
    const payload = { userId, subscription };
    dispatch(updateUserSubscriptionRequest(payload));
  };

  const handleDelete = (e) => {
    setActiveUserId(e)
    setOpen(true);
  };

  const editIconComponent = (data) => {
    const list = [
      { name: "Free", subscriptionType: "free" },
      { name: "Premium", subscriptionType: "premium" },
    ];
    const defaultSelectIndex = list.findIndex(
      (a) => a.subscriptionType === (data.subscription || "free")
    );
    return (
      <MultipleSelect
        name="subscription"
        onSelect={(value) => handleChangeSubscription(value, data._id)}
        nameKey={"name"}
        returnKey={"subscriptionType"}
        defaultSelect={true}
        defaultSelectIndex={defaultSelectIndex}
        multiple={false}
        invokeOnSelectOnInitialisation={false}
        list={list}
        disabled={usersSubscription.isLoading}
      />
    );
  };
  const onPrimaryBtnClick = () => {
    setOpen(false);
  };

  const onSecondaryBtnClick = () => {
    setIsMounted(true)
   fireAjax("DELETE",`users/${activeUserId}`).then(()=>{
    dispatch(getUserListRequest());
    setOpen(false);
    toast.success('User Deleted Successfully', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });  
   })
  };
  return (
    <div className={classes.root}>
      <AlertDialog
        header={"Are you sure you want to delete this user?"}
        primaryText={"No"}
        secondaryText={"Yes"}
        onPrimaryBtnClick={onPrimaryBtnClick}
        onSecondaryBtnClick={onSecondaryBtnClick}
        open={open}
        handleClose={onPrimaryBtnClick}
      />
      <div className={classes.titleWrapper}>
        <div className={classes.playlistTitle}>User List</div>
      </div>
      {userlist.isLoading && !isMounted && <Loader variant="big" />}
      {(userlist.isSuccess || isMounted) && (
        <GenericTable
          headers={[
            "S.No",
            "Profile",
            "Name",
            "Email",
            "Subscription",
            "Joined",
            "e-Book Downloaded",
          ]}
          cellData={makeTableData(userlist.data)}
          keys={[
            "serialNumber",
            "profile",
            "name",
            "email",
            "subscription",
            "createdAt",
            "isBookDownloaded",
          ]}
          deleteIcon={true}
          editIcon={false}
          handleDelete={handleDelete}
        />
      )}
      {userlist.isError && <Error message={userlist.message} />}
    </div>
  );
}
