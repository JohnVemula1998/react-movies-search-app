import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../config/config";
import "./ContentModel.css";
import axios from "axios";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Carousel from "../Carousel/Carousel";

const style = {
  position: "absolute",
  top: "4%",
  left: "5%",
  width: "90%",
  height: "90%",
  bgcolor: "#39445a",
  boxShadow: 24,
  border: "1px solid #282c34",
  borderRadius: 10,
  color: "white",
  padding: "0",
};

const ContentModel = ({ children, media_type, id }) => {
  const Key = `--------------------------------`;
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${Key}`
    );

    setContent(data);
    // console.log(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${Key}`
    );

    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Button className="media" onClick={handleOpen}>
        {children}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            < >
              {content && (
                <div className="classes">
                  <div>
                    <img
                      className="ContentModal__portrait"
                      src={
                        content.poster_path
                          ? `${img_500}/${content.poster_path}`
                          : unavailable
                      }
                      alt={content.name || content.title}
                    />
                    <img
                      src={
                        content.backdrop_path
                          ? `${img_500}/${content.backdrop_path}`
                          : unavailableLandscape
                      }
                      alt={content.name || content.title}
                      className="ContentModal__landscape"
                    />
                  </div>

                  <div className="ContentModal_about">
                    <p>
                      <p className="ContentModal_title">
                        {content.name || content.title} (
                        {(
                          content.first_air_date ||
                          content.release_date ||
                          "---------"
                        ).substring(0, 4)}
                        )
                      </p>
                      <p>
                        {content.tagline && (
                          <i className="tagline">{content.tagline}</i>
                        )}
                      </p>
                      <p className="ContentModal_description">
                        {content.overview}
                      </p>
                      <div>
                        <Carousel media_type={media_type} id={id} />
                      </div>
                      <Button
                        variant="contained"
                        startIcon={<YouTubeIcon />}
                        color="secondary"
                        target="__blank"
                        href={`https://www.youtube.com/watch?v=${video}`}
                      >
                        Watch the Trailer
                      </Button>
                    </p>
                  </div>
                </div>
              )}
            </>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};
export default ContentModel;
