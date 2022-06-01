import React, { useState, useRef } from 'react'
import { Document, Page, pdfjs } from 'react-pdf';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import fullScreenIcon from '../assets/full-screen.png'
import exitFullScreenIcon from '../assets/exit-full-screen.png'
import plusIcon from '../assets/plus.png'
import minusIcon from '../assets/minus.png'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const useStyles = makeStyles((theme) => ({
    pdfDocuement: {
    },
    documentWrapper: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 250,
        height: 200,
        overflow: 'hidden',
        "&:hover .pdf-conrols" : {
            display: 'flex'
        }
    },
    fullScreenIcon: {
        width: 20,
        height: 20,
        bottom: 20,
        right: 20,
        position: 'absolute',
        zIndex: 10,
        display: 'none'
    },
    pageControlIcon: {
        width: 30,
        height: 30
    },
    leftIcon: {
        left: 20,
        bottom: '50%',
        position: 'absolute',
        zIndex: 10,
        width: 40,
        height: 40,
        borderRadius: 20,
        background: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'none'
    },
    rightIcon: {
        right: 20,
        bottom: '50%',
        position: 'absolute',
        zIndex: 10,
        width: 40,
        height: 40,
        borderRadius: 20,
        background: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'none'
    },
    nonFullScreenIcon: {
        width: 20,
        height: 20
    },
    nonFullScreenIconView: {
        width: 30,
        height: 30
    },
}));

export default function PdfViewer({className, file}) {
    const classes = useStyles()
    const pdfRef = useRef()

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    function toggleFullscreen() {
        let elem = document.getElementById("document-container");

        if (!document.fullscreenElement) {
            elem.requestFullscreen().catch(err => {
                alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            document.exitFullscreen();
        }
    }

    return (
        <div className={clsx(classes.documentWrapper, className)} id="document-container">
            <div className={clsx(classes.rightIcon, !document.fullscreenElement && classes.nonFullScreenIconView, 'pdf-conrols')} onClick={() => pageNumber < numPages && setPageNumber(pageNumber + 1)} >
                <img className={clsx(classes.pageControlIcon, !document.fullscreenElement && classes.nonFullScreenIcon)} src={plusIcon} />
            </div>
            <div className={clsx(classes.leftIcon, !document.fullscreenElement && classes.nonFullScreenIconView, 'pdf-conrols')} onClick={() => (pageNumber > 1) && setPageNumber(pageNumber - 1)}>
                <img className={clsx(classes.pageControlIcon, !document.fullscreenElement && classes.nonFullScreenIcon)} src={minusIcon} />
            </div>
            <img className={clsx(classes.fullScreenIcon, 'pdf-conrols')} onClick={toggleFullscreen} src={document.fullscreenElement ? exitFullScreenIcon : fullScreenIcon} />
            <Document
                ref={pdfRef}
                file={file}
                className={classes.pdfDocuement}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page pageNumber={pageNumber} />
            </Document>
        </div>
    )
}
