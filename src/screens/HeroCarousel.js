import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import {
  getCarouselDataRequest,
  videoModalRequest,
  getVideoRequest,
  deleteCarouselDataRequest,
  setModalDataRequest
} from "../redux/actions";
import sampleVideo from "../assets/videos/mov_bbb.mp4";
import tempAvatar from "../assets/avatar.jpeg";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import HeroCarouselModal from "../Components/HeroCarouselModal";
import Loader from "../Components/Loader";
import Error from "../Components/Error";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 10,
  },
  titleWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  playlistTitle: {
    fontWeight: "bold",
    fontSize: "1.2rem",
  },
  itemWrapper: {
    marginBottom: 10,
    boxShadow:
      "0px 2px 1px -1px rgb(0 0 0 / 10%), 0px 1px 1px 0px rgb(0 0 0 / -1%), 0px 1px 0px 0px rgb(0 0 0 / 1%)",
    background: "#fff",
  },
  imgage: {
    width: 250,
    height: "auto",
  },
  wrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 20,
  },
  deleteIcon: {
    cursor: "pointer",
  },
  createIcon: {
    cursor: "pointer",
    marginLeft: 10,
  },
  iconsWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  textContentWrapper: {
    paddingRight: 20,
  },
  title: {
    fontSize: "1.2rem",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: "1.1rem",
    marginBottom: 5,
  },
  description: {
    fontSize: ".95rem",
    marginBottom: 5,
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

export default function HeroCarousel() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.course.videos);
  const heroCarousel = useSelector((state) => state.course.heroCarousel);
  const [itemToDelete, setItemToDelete] = useState("");
  const isLoading = useSelector((state) => state.config.isLoading);

  useEffect(() => {
    if (!videos.isSuccess) {
      dispatch(getVideoRequest());
    }
    dispatch(getCarouselDataRequest());
  }, []);

  const handleOpenModal = () => {
    dispatch(videoModalRequest(true));
  };

  const handelDeleteVideo = (id) => {
    dispatch(deleteCarouselDataRequest({ id }));
  };

  const handleEdit = (item) => {
    dispatch(setModalDataRequest(item))
    handleOpenModal()
}

  return (
    <div className={classes.root}>
      <div className={classes.titleWrapper}>
        <div className={classes.playlistTitle}>Hero Carousel</div>
      </div>
      <HeroCarouselModal />
      {heroCarousel.isLoading && <Loader variant="big" />}
      {heroCarousel.isError && <Error message={videos.message} />}
      {heroCarousel.isSuccess && heroCarousel.data.length > 0 && (
        <>
          {heroCarousel.data.map((item, index) => {
            return (
              <div key={index} className={classes.itemWrapper}>
                {item.type === "video" && (
                  <div className={classes.wrapper}>
                    <video width="250" controls>
                      <source src={item.videoLink} type="video/mp4" />
                    </video>
                    <div className={classes.iconsWrapper}>
                      {isLoading && itemToDelete === item._id ? (
                        <Loader variant="small" />
                      ) : (
                        <DeleteIcon
                          onClick={() => {
                            setItemToDelete(item._id);
                            handelDeleteVideo(item._id);
                          }}
                          className={classes.deleteIcon}
                        />
                      )}
                      {/* <CreateIcon
                        onClick={() => handleEdit(item) }
                        className={classes.createIcon}
                      /> */}
                    </div>
                  </div>
                )}
                {item.type === "image" && (
                  <div className={classes.wrapper}>
                    <div>
                      <img
                          className={classes.imgage}
                          src={item.image}
                          alt="image"
                      />
                      {item.caption && <div style={{ padding: 10 }} >{item.caption}</div>}
                    </div>
                    <div className={classes.iconsWrapper}>
                      {isLoading && itemToDelete === item._id ? (
                        <Loader variant="small" />
                      ) : (
                        <DeleteIcon
                          onClick={() => {
                            setItemToDelete(item._id);
                            handelDeleteVideo(item._id);
                          }}
                          className={classes.deleteIcon}
                        />
                      )}
                      {/* <CreateIcon
                        onClick={() => handleEdit(item) }
                        className={classes.createIcon}
                      /> */}
                    </div>

                  </div>
                )}
                {item.type === "text" && (
                  <div className={classes.wrapper} style={{ padding: 20 }}>
                    <div className={classes.textContentWrapper}>
                      <div className={classes.title}>{item.title}</div>
                      <div className={classes.subtitle}>{item.subTitle}</div>
                      {/* <div className={classes.description}>
                          {item.description}
                        </div> */}
                      <div className={classes.content}>{item.description}</div>
                    </div>
                    <div className={classes.iconsWrapper}>
                      {isLoading && itemToDelete === item._id ? (
                        <Loader variant="small" />
                      ) : (
                        <DeleteIcon
                          onClick={() => {
                            setItemToDelete(item._id);
                            handelDeleteVideo(item._id);
                          }}
                          className={classes.deleteIcon}
                        />
                      )}
                      <CreateIcon
                        onClick={() => handleEdit(item) }
                        className={classes.createIcon}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </>
      )}
      <Fab
        size="small"
        onClick={handleOpenModal}
        color="secondary"
        aria-label="add"
        className={classes.fab}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}
