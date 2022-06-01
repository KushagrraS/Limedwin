import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {useDispatch, useSelector} from "react-redux";
import {videoModalRequest, setModalDataRequest} from "../redux/actions";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        height: '85vh',
        width: '100vh',
        borderRadius: 5,
        outline: 'none',
        [theme.breakpoints.down('sm')]: {
            width: '95%'
        },
    },

}))
export default  function CommonModal({children, onClose=()=>null, style={} }){
    const  classes = useStyles()
    const dispatch = useDispatch();
    const isModal = useSelector(state => state.config.videoModal.isVisible);

    const handleClose = () => {
        dispatch(videoModalRequest(false));
        dispatch(setModalDataRequest({}))
        onClose()
    };

    useEffect(() => {
        if(!isModal){
            handleClose()
        }
    }, [isModal])

    return(
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={isModal}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={isModal}>
                <div className={classes.paper} style={{...style}} >
                    {children}
                </div>
            </Fade>
        </Modal>
    )
}